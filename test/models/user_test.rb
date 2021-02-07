require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(email: "mayankagnihotri7@gmail.com", first_name: "Mayank", last_name: "Agnihotri")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_not_be_valid_without_email
    @user.email = ""
    assert_not @user.valid?
  end

  def test_user_should_not_be_valid_without_first_name
    @user.first_name = ""
    assert_not @user.valid?
  end

  def test_first_name_should_have_valid_length
    @user.first_name = "a" * 51
    assert_not @user.valid?
  end

  def test_user_should_not_be_valid_without_last_name
    @user.last_name = ""
    assert_not @user.valid?
  end

  def test_last_name_should_have_valid_length
    @user.last_name = "a" * 51
    assert_not @user.valid?
  end

  def test_user_should_not_have_same_email
    test_user = @user.dup
    assert_not test_user.valid?
  end

  def test_email_should_be_saved_in_lowercase
    email = "user@example.com"
    duplicate_user = @user.dup
    duplicate_user.email = "UsEr@ExaMple.CoM"
    duplicate_user.save!
    assert_equal duplicate_user.email.downcase, email
  end

  def test_email_should_have_valid_email_address
    valid_email_addresses = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in]
    valid_email_addresses.each do |valid_email|
      @user.email = valid_email
      assert @user.valid?
    end
  end

  def test_email_should_not_have_invalid_email_address
    invalid_email_addresses = %w[user@example,com user_at_example.org user.name@example. @sam-sam.com sam@sam+exam.com fishy+#.com]
    invalid_email_addresses.each do |invalid_email|
      @user.email = invalid_email
      assert_not @user.valid?
    end
  end
end
