import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import uuid from "react-uuid";
import attemptsApi from "apis/attempts";
import { Radio, RadioGroup } from "react-radio-group";
import Loader from "../Common/Loader";

const Public = () => {
  const { slug } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);
  const [user, setUser] = useState();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizDetails = async () => {
    setLoading(true);
    const { data } = await axios.patch(`/public/${slug}`);
    setQuestions(data);
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await attemptsApi.create({
      slug,
      attempt: {
        first_name: firstName,
        last_name: lastName,
        email,
      },
    });
    setUser(user.data.user);
    setQuiz({ quizTitle: user.data.quiz_title, quizId: user.data.quiz_id });
    user.status === 200 && !user.data.submitted && setShowQuestions(true);
    user.data.submitted && alert("You have already attempted this quiz");
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!showQuestions && (
        <div className="container mx-auto">
          <h1 className="mt-4 text-xl font-semibold">Welcome to quiz</h1>
          <form onSubmit={handleSubmit}>
            <div className="w-1/4">
              <div className="flex items-baseline">
                <label className="mr-2">First name</label>
                <Input
                  name="first_name"
                  placeholder="Enter your first name"
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-baseline">
              <label className="mr-2">Last name</label>
              <Input
                name="last_name"
                placeholder="Enter your last name"
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="flex items-baseline">
              <label className="mr-2">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="e.g xyz@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div
              className="w-1/5 ml-10"
              style={{
                width: "10%",
                boxShadow: "7px 7px 5px 0px rgba(0,0,0,0.75)",
              }}
            >
              {firstName !== " " && lastName !== " " && email !== " " && (
                <Button type="submit" buttonText="Next" />
              )}
            </div>
          </form>
        </div>
      )}
      {showQuestions && (
        <ShowQuestion
          user={user}
          quiz={quiz}
          questions={questions}
          slug={slug}
        />
      )}
    </>
  );
};

const ShowQuestion = ({ user, quiz, questions, slug }) => {
  const [submitted, setSubmitted] = useState(false);
  const [correct_answer, setCorrectAnswer] = useState(0);
  const [incorrect_answer, setIncorrectAnswer] = useState(0);
  let answers = [];

  if (!quiz) {
    return (
      <div className="mx-auto text-center">
        <h1>No questions for this quiz to show</h1>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const attemptDetails = await attemptsApi.update({
      slug,
      payload: {
        user_id: user.id,
        quiz_id: quiz.quizId,
        is_submitted: true,
        attempt_answers_attributes: answers,
      },
    });
    setCorrectAnswer(attemptDetails.data.correct_answer);
    setIncorrectAnswer(attemptDetails.data.incorrect_answer);
    setSubmitted(true);
  };

  const handleChange = ({ question_id, option_id }) => {
    answers = answers.filter(answer => answer.question_id !== question_id);
    answers = [...answers, { question_id, option_id }];
  };

  return (
    <div className="container mx-auto">
      <h1 className="mt-4 mb-3 text-xl font-semibold">{`${quiz.quizTitle}`}</h1>
      {submitted && (
        <h2 className="font-bold break-words">{`Thank you for taking the quiz, here are your results. You have submitted ${correct_answer} correct and ${incorrect_answer} incorrect answers`}</h2>
      )}
      <h2>Question</h2>
      <form onSubmit={handleSubmit}>
        {questions?.map(({ title, options, id, answer }) => {
          return (
            <div key={uuid()}>
              <h2 className="mt-3">{title}</h2>
              <RadioGroup
                name={title + id}
                onChange={value => {
                  handleChange({ question_id: id, option_id: value });
                }}
                className="flex flex-col"
                style={{ flex: 0.4 }}
              >
                {options.map(option => {
                  return (
                    <div
                      className="flex items-baseline cursor-pointer mt-1 mb-1"
                      key={uuid()}
                    >
                      <label className="cursor-pointer">
                        <Radio
                          value={option.id}
                          disabled={submitted === true}
                          className="pr-4 mr-2 relative"
                        />
                        <span>{option.name}</span>
                      </label>
                      {submitted && answer === option.name && (
                        <span className="text-green-600 font-bold text-sm items-baseline mt-1 ml-4">
                          &#10003; Correct answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          );
        })}
        {!submitted && (
          <div
            className="w-1/5 ml-10"
            style={{
              width: "10%",
              boxShadow: "7px 7px 5px 0px rgba(0,0,0,0.75)",
            }}
          >
            <Button type="submit" buttonText="Submit" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Public;
