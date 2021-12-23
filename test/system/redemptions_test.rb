require "application_system_test_case"

class RedemptionsTest < ApplicationSystemTestCase
  setup do
    @redemption = redemptions(:one)
  end

  test "visiting the index" do
    visit redemptions_url
    assert_selector "h1", text: "Redemptions"
  end

  test "creating a Redemption" do
    visit redemptions_url
    click_on "New Redemption"

    click_on "Create Redemption"

    assert_text "Redemption was successfully created"
    click_on "Back"
  end

  test "updating a Redemption" do
    visit redemptions_url
    click_on "Edit", match: :first

    click_on "Update Redemption"

    assert_text "Redemption was successfully updated"
    click_on "Back"
  end

  test "destroying a Redemption" do
    visit redemptions_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Redemption was successfully destroyed"
  end
end
