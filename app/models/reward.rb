class Reward < Transaction
  belongs_to :parent, class_name: 'Bill'
end
