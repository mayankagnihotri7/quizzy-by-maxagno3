import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import quizzesApi from "apis/quizzes";
import questionsApi from "apis/questions";
import Button from "components/Button";
import Input from "components/Input";
import Select from "react-select";

const SingleQuiz = () => {
  const [title, setTitle] = useState("");
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

  const { id } = useParams();

  const fetchQuizDetails = async () => {
    setLoading(true);
    const quizDetails = await quizzesApi.show(id);
    setTitle(quizDetails.data.quiz.title);
    setLoading(false);
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

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <div>
      {!isAddQuestion && (
        <div className="container mx-auto">
          <div className="flex justify-between items-baseline">
            <h1 className="font-bold text-xl pt-5">{title}</h1>
            <Button
              buttonText="Add questions"
              loading={loading}
              onClick={() => setIsAddQuestion(true)}
            />
          </div>
          <div className="text-center p-16">
            <h2>There are no questions in this quiz.</h2>
          </div>
        </div>
      )}
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
