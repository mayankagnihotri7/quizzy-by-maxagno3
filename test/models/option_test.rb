require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.create!( email: "mayankagnihotri7@gmail.com", first_name: "Mayank", last_name: "Agnihotri",
                        password: "foobar", password_confirmation: "foobar", role: 0)
    @quiz = @user.quizzes.create(title: "Lorem ipsum")
    @question = @quiz.questions.create(title: "Lorem ipsum dimsum?", options_attributes: 
                [{name: "lorem"}, {name: "ipsum"}], answer: "lorem")
    @option = @question.options
  end

  def test_options_must_be_valid
    @option.map do |option|
      assert option.valid?
    end
  end

  def test_options_must_have_minimum_two
    question = @quiz.questions.create(title: "Lorem ipsum dimsum?", options_attributes: 
                [{name: "lorem"}], answer: "lorem")
    question.save
    assert_not question.valid?
    assert_equal ["Options is too short (minimum is 2 characters)"], question.errors.full_messages
  end

  def test_options_must_have_maximum_four
    question = @quiz.questions.create(title: "Lorem ipsum dimsum?", options_attributes: 
                [{name: "lorem"}, {name: "ipsum"}, {name: "dimsum"}, {name: "dopsum"},{name: "dopsum"}], answer: "lorem")
    question.save
    assert_not question.valid?
    assert_equal ["Options is too long (maximum is 4 characters)"], question.errors.full_messages
  end

  def test_options_can_have_two_options
    question = @quiz.questions.create(title: "Lorem ipsum dimsum?", options_attributes: 
                [{name: "lorem"}, {name: "lorem"}], answer: "lorem")
    question.save
    assert question.valid?
  end

  def test_options_can_have_four_options
    question = @quiz.questions.create(title: "Lorem ipsum dimsum?", options_attributes: 
                [{name: "lorem"}, {name: "ipsum"}, {name: "simsum"}, {name: "dimsum"}], answer: "lorem")
    question.save
    assert question.valid?
  end

  def test_option_name_must_be_present
    option = Option.new(name: "", question_id: 1)
    option.save
    assert_not option.valid?
    assert_equal ["Name can't be blank"], option.errors.full_messages
  end

  def test_question_id_must_be_present
    option = Option.new(name: "lorem")
    option.save
    assert_not option.valid?
    assert_equal ["Question must exist"], option.errors.full_messages
  end
end
