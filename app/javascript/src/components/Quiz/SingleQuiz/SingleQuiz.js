import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import quizzesApi from "apis/quizzes";
import questionsApi from "apis/questions";
import Button from "components/Button";
import Input from "components/Input";
import Select from "react-select";
import QuestionList from "./QuestionList";
import axios from "axios";

const SingleQuiz = () => {
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [isAddOption, setIsAddOption] = useState(false);
  const [addOptionCount, setAddOptionCount] = useState(0);
  const [option, setOption] = useState({
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
  });
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  const { id } = useParams();

  const fetchQuizDetails = async () => {
    setLoading(true);
    const quizDetails = await quizzesApi.show(id);
    setQuiz(quizDetails.data.quiz);
    setLoading(false);
  };

  const fetchQuestionDetails = async () => {
    const questionDetails = await axios.get(`/quizzes/${id}/questions`);
    setQuestions(questionDetails.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { optionOne, optionTwo, optionThree, optionFour } = option;
    await questionsApi.create({
      id,
      payload: {
        question: {
          title: name,
          options_attributes: [
            { name: optionOne },
            { name: optionTwo },
            { name: optionThree },
            { name: optionFour },
          ].filter(option => option.name !== ""),
          answer: correctAnswer,
        },
      },
    });
    window.location.href = `/quizzes/${id}/show`;
  };

  const defaultValue = {
    value: option?.optionOne,
    label: "Option 1",
  };

  const options = [
    { value: option?.optionOne, label: "Option 1" },
    { value: option?.optionTwo, label: "Option 2" },
    { value: option?.optionThree, label: "Option 3" },
    { value: option?.optionFour, label: "Option 4" },
  ].filter(option => option.value !== "");

  const handleDestroy = async question_id => {
    await axios.delete(`/quizzes/${id}/questions/${question_id}`);
    fetchQuestionDetails();
  };

  const generatePublicURL = async () => {
    const public_url = window.location.origin + `/public/${quiz.slug}`;
    await axios.put(`/quizzes/${id}`, { id, quiz: { public_url } });
    fetchQuizDetails();
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestionDetails();
  }, []);

  return (
    <div>
      <>
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline">
            <h1 className="font-bold text-xl pt-5">{quiz.title}</h1>
            <div className="flex justify-evenly">
              <Button
                buttonText="Add questions"
                loading={loading}
                onClick={() => setIsAddQuestion(true)}
              />
              {!isAddQuestion &&
                questions.length >= 1 &&
                quiz.public_url === null && (
                <Button
                  buttonText="Publish"
                  loading={loading}
                  onClick={generatePublicURL}
                />
              )}
            </div>
          </div>
          {quiz.public_url && (
            <h2>
              &#10003; Published, your public link is -
              <Link to={quiz.public_url} className="text-bb-purple ml-1">
                {quiz.public_url}
              </Link>
            </h2>
          )}
          {!isAddQuestion && questions.length === 0 && (
            <div className="text-center p-16">
              <h2>There are no questions in this quiz.</h2>
            </div>
          )}
          {!isAddQuestion && questions && (
            <QuestionList
              questions={questions}
              quizID={id}
              handleDestroy={handleDestroy}
            />
          )}
        </div>
      </>
      {isAddQuestion && (
        <div className="md:container md:mx-auto justify-start">
          <h2 className="mt-4 font-bold text-blue-400 text-xl">
            Add new question
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-1/4">
              <Input
                label="Question title"
                placeholder="e.g: Which planet is closest to sun?"
                onChange={e => setName(e.target.value)}
              />
              <div className="flex items-baseline">
                <label className="mr-2">Option 1:</label>
                <Input
                  placeholder="e.g: Neptune"
                  onChange={e =>
                    setOption({ ...option, optionOne: e.target.value })
                  }
                />
              </div>
              <div className="flex items-baseline">
                <label className="mr-2">Option 2:</label>
                <Input
                  placeholder="e.g: Neptune"
                  onChange={e =>
                    setOption({ ...option, optionTwo: e.target.value })
                  }
                />
              </div>
              {isAddOption && addOptionCount <= 2 && (
                <div className="flex items-baseline">
                  <label className="mr-2">Option 3:</label>
                  <Input
                    placeholder="e.g: Neptune"
                    onChange={e =>
                      setOption({ ...option, optionThree: e.target.value })
                    }
                  />
                </div>
              )}
              {isAddOption && addOptionCount === 2 && (
                <div className="flex items-baseline">
                  <label className="mr-2">Option 4:</label>
                  <Input
                    placeholder="e.g: Neptune"
                    onChange={e =>
                      setOption({ ...option, optionFour: e.target.value })
                    }
                  />
                </div>
              )}
              {addOptionCount < 2 && (
                <button
                  className="mt-3 text-sm hover:underline hover:font-bold"
                  onClick={() => {
                    setIsAddOption(true);
                    setAddOptionCount(addOptionCount + 1);
                  }}
                >
                  + Add option
                </button>
              )}
              <div className="w-6/12">
                <Select
                  value={correctAnswer}
                  options={options}
                  onChange={e => setCorrectAnswer(e.value)}
                  placeholder={correctAnswer}
                  defaultValue={defaultValue}
                />
              </div>
              {(correctAnswer !== "" || correctAnswer !== " ") &&
              option.optionOne &&
              option.optionTwo ? (
                  <div className="w-1/4">
                    <Button type="submit" buttonText="Submit" />
                  </div>
                ) : (
                  <small>Select the option first</small>
                )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleQuiz;
