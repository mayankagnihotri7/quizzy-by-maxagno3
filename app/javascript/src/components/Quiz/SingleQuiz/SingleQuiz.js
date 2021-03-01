import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import quizzesApi from "apis/quizzes";
import questionsApi from "apis/questions";
import Button from "components/Button";
import QuestionList from "./QuestionList";
import axios from "axios";
import Loader from "../../Common/Loader";
import QuizForm from "./QuizForm";

const SingleQuiz = () => {
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [options_attributes, setOptionsAttributes] = useState([
    { name: "" },
    { name: "" },
  ]);
  const [title, setTitle] = useState("");
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
    setLoading(true);
    const questionDetails = await axios.get(`/quizzes/${id}/questions`);
    setQuestions(questionDetails.data);
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await questionsApi.create({
      id,
      payload: {
        question: {
          title,
          options_attributes: options_attributes.filter(
            option => option.name !== ""
          ),
          answer: correctAnswer,
        },
      },
    });
    window.location.href = `/quizzes/${id}/show`;
  };

  const handleDestroy = async question_id => {
    await axios.delete(`/quizzes/${id}/questions/${question_id}`);
    fetchQuestionDetails();
  };

  const generatePublicURL = async () => {
    await axios.patch(`/quizzes/${id}/publish`, { id });
    fetchQuizDetails();
  };

  const handleChange = (index, e) => {
    let newArr = [...options_attributes];
    newArr[index].name = e.target.value;
    setOptionsAttributes(newArr);
  };

  const handleAddOption = () => {
    const newArr = [...options_attributes, { name: "" }];
    setOptionsAttributes(newArr);
  };

  const handleRemoveOption = (optionId, index) => {
    const newArr = [...options_attributes];
    if (index !== -1) {
      newArr.splice(index, 1);
      setOptionsAttributes(newArr);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuestionDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const public_url = window.location.origin + `/public/${quiz.slug}`;

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
              {!isAddQuestion && questions.length >= 1 && !quiz.slug && (
                <Button
                  buttonText="Publish"
                  loading={loading}
                  onClick={generatePublicURL}
                />
              )}
            </div>
          </div>
          {quiz.slug && (
            <h2>
              &#10003; Published, your public link is -
              <Link to={`/public/${quiz.slug}`} className="text-bb-purple ml-1">
                {public_url}
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
          <QuizForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            options_attributes={options_attributes}
            handleAddOption={handleAddOption}
            handleRemoveOption={handleRemoveOption}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            setTitle={setTitle}
            title={title}
          />
        </div>
      )}
    </div>
  );
};

export default SingleQuiz;
