import React, { useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import quizzesApi from "apis/quizzes";

const index = () => {
  const [createQuiz, setCreatQuiz] = useState(false);

  return (
    <>
      {!createQuiz && (
        <>
          <div className="md:container md:mx-auto px-24 flex justify-end">
            <Button
              type="button"
              buttonText="Add new quiz"
              onClick={() => setCreatQuiz(true)}
            />
          </div>
          <div>
            <h1 className="text-xl leading-5 text-center">
              You have not created any quiz.
            </h1>
          </div>
        </>
      )}
      {createQuiz && <CreateQuiz />}
    </>
  );
};

const CreateQuiz = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await quizzesApi.create({ quiz: { title } });
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

export default index;
