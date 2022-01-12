class Stats
  attr_reader :store

  def initialize(store)
    @store = store
  end

  def top_10_spenders
    Bill.select(:phone_number, 'sum(amount) as total_spend', 'count(*) as total_frequents')
        .where(store: store)
        .where('created_at >= ?', 30.days.ago)
        .group(:phone_number)
        .having('count(*) > 1')
        .order('sum(amount) desc')
        .limit(10)
        .each_with_object([]) do |(k, _), memo|
          phone_number = k[:phone_number]
          spend = k[:total_spend]
          frequents = k[:total_frequents]
          memo << { phone_number: phone_number, spend: spend, frequents: frequents }
        end
  end

  def frequents_in_last_(range = 30.days.ago)
    bills_with_date_range = Bill.where(store: store).select('count(*) as total_count')
                            .where('created_at >= ?', range)
    frequents_count_in(bills_with_date_range)
  end

  def redemptions_in_last_(range = 30.days.ago)
    Redemption.where(store: store).where('created_at >= ?', range).count
  end

  def spends_in_last_(range = 30.days.ago)
    bills_with_date_range = Bill.where(store: store).select('sum(amount) as total_amount')
                                .where('created_at >= ?', range)
    spends_in(bills_with_date_range)
  end

  def frequents_on(date)
    bills_with_date_range = Bill.where(store: store).select('count(*) as total_count').between_dates(date,date)
    frequents_count_in(bills_with_date_range)
  end

  def redemptions_on(date)
    Redemption.where(store: store).between_dates(date,date).count
  end

  def spends_on(date)
    bills_with_date_range = Bill.where(store: store).select('sum(amount) as total_amount').between_dates(date,date)
    spends_in(bills_with_date_range)
  end


  def frequents_difference_compared_to(current_frequents_count)
    bills_with_date_range = Bill.where(store: store).select('count(*) as total_count')
                                .where('created_at BETWEEN ? AND ?', 60.days.ago, 30.days.ago)
    older_frequents_count = frequents_count_in(bills_with_date_range)

    if older_frequents_count == 0
      return 'N/A'
    end

    (current_frequents_count-older_frequents_count)*100/older_frequents_count
  end


  def redemptions_difference_compared_to(current_redemptions_count)
    older_redemptions_count = Redemption
                                .where(store: store)
                                .where('created_at BETWEEN ? AND ?', 60.days.ago, 30.days.ago)
                                .count
    if older_redemptions_count == 0
      return 'N/A'
    end

    (current_redemptions_count-older_redemptions_count)*100/older_redemptions_count
  end


  def spends_difference_compared_to(current_spends)
    bills_with_date_range = Bill.where(store: store).select('sum(amount) as total_amount')
                                .where('created_at BETWEEN ? AND ?', 60.days.ago, 30.days.ago)
    older_spends = spends_in(bills_with_date_range)

    if older_spends == 0
      return 'N/A'
    end

    (current_spends-older_spends)*100/older_spends
  end

  private

  def frequents_count_in(bills_with_date_range)
    all_transactions_grouped = bills_with_date_range
                                   .group(:phone_number)
                                   .having('count(*) > 1')
    Bill.unscope(:where)
        .from(all_transactions_grouped)
        .count
  end

  def spends_in(bills_with_date_range)
    all_transactions_grouped = bills_with_date_range
                                 .group(:phone_number)
                                 .having('count(*) > 1')
    Bill.unscope(:where)
        .from(all_transactions_grouped)
        .sum('total_amount')
  end
end