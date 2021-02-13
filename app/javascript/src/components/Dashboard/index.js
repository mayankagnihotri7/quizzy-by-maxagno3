import React, { useEffect, useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import quizzesApi from "apis/quizzes";
import TableData from "../Quiz/Table/index";

const Dashboard = () => {
  const [createQuiz, setCreatQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const fetchQuizDetails = async () => {
    const quizDetails = await quizzesApi.list();
    setQuizData(quizDetails.data.quiz);
  };

  const destroyQuiz = async id => {
    await quizzesApi.destroy(id);
    await fetchQuizDetails();
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <>
      {!createQuiz && (
        <div className="md:container md:mx-auto px-24 flex justify-end">
          <Button
            type="button"
            buttonText="Add new quiz"
            onClick={() => setCreatQuiz(true)}
          />
        </div>
      )}
      {quizData.length === 0 && (
        <div>
          <h1 className="text-xl leading-5 text-center">
            You have not created any quiz.
          </h1>
        </div>
      )}
      {createQuiz && <CreateQuiz />}
      {quizData.length > 0 && !createQuiz && (
        <div className="container mx-auto">
          <div className="flex flex-col mt-10 ">
            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
                  <TableData quizData={quizData} destroyQuiz={destroyQuiz} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CreateQuiz = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await quizzesApi.create({ quiz: { title } });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="md:container md:mx-auto justify-start">
        <h2 className="mt-4 font-bold text-blue-400 text-xl">Add new quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-1/4">
            <Input
              label="Quiz name"
              placeholder="e.g: Solar system quiz"
              onChange={e => setTitle(e.target.value)}
            />
            <div className="w-1/4">
              <Button type="submit" buttonText="Submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
