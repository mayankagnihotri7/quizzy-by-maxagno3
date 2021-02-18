import React from "react";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

const QuestionList = ({ questions, quizID, handleDestroy }) => {
  const history = useHistory();

  const handleEdit = question_id => {
    history.push(`/quizzes/${quizID}/questions/${question_id}/edit`);
  };

  return (
    <div>
      {questions?.map((question, i) => {
        return (
          <section key={uuid()}>
            <div className="mt-6 mb-5">
              <span className="text-bb-gray-600">Question {i + 1}</span>
              <div className="flex">
                <h2 className="text-bb-gray-600">{question.title}</h2>
                <div className="ml-5">
                  <button
                    className="text-xl text-center
                    transition duration-300 ease-in-out
                    ri-delete-bin-5-line hover:text-bb-yellow text-indigo-700 mr-3"
                    onClick={() => handleEdit(question.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xl text-center
                    transition duration-300 ease-in-out
                    ri-delete-bin-5-line hover:text-bb-red text-indigo-700"
                    onClick={() => handleDestroy(question.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {question.options.map((option, i) => {
                return (
                  <div className="flex border-black" key={uuid()}>
                    <span className="text-bb-gray-600">Option {i + 1}</span>
                    <div className="flex">
                      <h2 className="ml-5 mr-4">{option.name}</h2>
                      {question.answer === option.name && (
                        <span className="text-green-600 font-bold text-sm items-baseline mt-1">
                          &#10003; Correct answer
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default QuestionList;
