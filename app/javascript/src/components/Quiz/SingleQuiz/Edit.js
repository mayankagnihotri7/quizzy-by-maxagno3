import React, { useEffect, useState } from "react";
import Button from "components/Button";
import Input from "components/Input";
import Select from "react-select";
import { useParams } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import questionsApi from "apis/questions";

const Edit = () => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options_attributes, setOptionsAttributes] = useState([]);
  const [title, setTitle] = useState("");
  const { quiz_id, id } = useParams();

  const fetchQuestionDetails = async () => {
    const questionDetails = await axios.get(
      `/quizzes/${quiz_id}/questions/${id}`
    );
    setTitle(questionDetails.data.question.title);
    setCorrectAnswer(questionDetails.data.question.answer);
    const newData = questionDetails.data.options.map(data => {
      return { id: data.id, name: data.name };
    });
    setOptionsAttributes(newData);
  };

  const handleChange = (index, e) => {
    const newArr = options_attributes.map(option => {
      if (option.id === index) {
        return { ...option, name: e.target.value };
      } else {
        return option;
      }
    });
    setOptionsAttributes(newArr);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await questionsApi.update({
      quiz_id,
      id,
      payload: { title, options_attributes, answer: correctAnswer },
    });
    window.location.href = `/quizzes/${quiz_id}/show`;
  };

  const dup_options = [...options_attributes];
  const options = dup_options.map((option, i) => {
    return { value: option?.name, label: `Option ${i + 1}` };
  });

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="w-1/4">
          <Input
            label="Question title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {options_attributes?.map((option, i) => {
            return (
              <div key={`${options_attributes.length * 13 + 9}`}>
                <div className="flex items-baseline">
                  <Input
                    label={`Option ${i + 1}`}
                    value={option?.name}
                    onChange={e => handleChange(option.id, e)}
                  />
                  {options_attributes.length === 3 &&
                    options_attributes[2].id === option.id && (
                    <>
                      <button
                        className="text-sm text-center text-bb-red
                          transition duration-300 ease-in-out
                          ri-delete-bin-5-line hover:text-bb-red"
                        onClick={e => {
                          options_attributes[2]._destroy = true;
                        }}
                      >
                          Delete
                      </button>
                    </>
                  )}
                  {options_attributes.length === 4 &&
                    options_attributes[3].id === option.id && (
                    <>
                      <button
                        onClick={e => {
                          options_attributes[2]._destroy = true;
                        }}
                        className="text-sm text-center text-bb-red
                          transition duration-300 ease-in-out
                          ri-delete-bin-5-line hover:text-bb-red"
                      >
                          Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {options_attributes.length === 2 && (
            <>
              <div className="flex items-baseline">
                <label className="mr-2">Option 3:</label>
                <Input
                  placeholder="Enter option 3 here (optional)"
                  required={false}
                  key={"mayank"}
                  onChange={e => {
                    setOptionsAttributes([
                      ...options_attributes,
                      {
                        name: e.target.value,
                      },
                    ]);
                  }}
                />
              </div>
              <div className="flex items-baseline">
                <label className="mr-2">Option 4:</label>
                <Input
                  placeholder="Enter option 4 here (optional)"
                  required={false}
                  key="max"
                  onChange={e => {
                    setOptionsAttributes([
                      ...options_attributes,
                      {
                        name: e.target.value,
                      },
                    ]);
                  }}
                />
              </div>
            </>
          )}
          {options_attributes.length === 3 && (
            <div className="flex items-baseline" key={uuid()}>
              <label className="mr-2">Option 4:</label>
              <Input
                placeholder="Enter option 4 here(optional)"
                required={false}
                onChange={e => {
                  setOptionsAttributes([
                    ...options_attributes,
                    {
                      name: e.target.value,
                    },
                  ]);
                }}
              />
            </div>
          )}
          <div className="w-6/12">
            <Select
              value={correctAnswer}
              options={options}
              onChange={e => setCorrectAnswer(e.value)}
              placeholder={correctAnswer}
              className="cursor-pointer"
            />
          </div>
          {(correctAnswer !== "" || correctAnswer !== " ") &&
            options_attributes[0]?.name !== "" &&
            options_attributes[1]?.name !== "" && (
            <div className="w-1/4">
              <Button type="submit" buttonText="Submit" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Edit;
