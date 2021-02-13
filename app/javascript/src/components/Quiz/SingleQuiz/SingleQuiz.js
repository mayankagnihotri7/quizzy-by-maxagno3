import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import quizzesApi from "apis/quizzes";
import Button from "components/Button";

const SingleQuiz = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchQuizDetails = async () => {
    setLoading(true);
    const quizDetails = await quizzesApi.show(id);
    setTitle(quizDetails.data.quiz.title);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center items-baseline">
        <h1 className="font-bold text-xl pt-5">{title}</h1>
        <Button buttonText="Add questions" loading={loading} />
      </div>
      <div className="text-center p-16">
        <h2>There are no questions in this quiz.</h2>
      </div>
    </div>
  );
};

export default SingleQuiz;
