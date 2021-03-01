import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import Select from "react-select";

const QuizForm = ({
  handleSubmit,
  handleChange,
  setTitle,
  options_attributes,
  handleAddOption,
  handleRemoveOption,
  setCorrectAnswer,
  correctAnswer,
  title,
  type = "create",
}) => {
  const options = options_attributes.map(option => ({
    value: option?.name,
    label: option?.name,
  }));

  const defaultValue = {
    value: options_attributes[0]?.name,
    label: options_attributes[0]?.name,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-1/4">
        <Input
          label="Title"
          value={title}
          placeholder="Enter the title"
          onChange={e => setTitle(e.target.value)}
        />
        {options_attributes.map((option, i) => {
          return (
            <div key={i} className="mb-6 flex items-center content-center">
              <Input
                label={`Option ${i + 1}`}
                value={option.name}
                placeholder="Enter the option name"
                onChange={e => handleChange(i, e)}
              />
              {i > 1 && (
                <div
                  className="cursor-pointer p-2"
                  onClick={e => handleRemoveOption(option.id, i)}
                >
                  <i className="ri-close-fill"></i>
                </div>
              )}
            </div>
          );
        })}
        {options_attributes.length < 4 && (
          <button
            className="mt-3 text-sm hover:underline hover:font-bold"
            onClick={handleAddOption}
          >
            + Add option
          </button>
        )}
        <div className="w-6/12">
          <Select
            options={options}
            onChange={e => setCorrectAnswer(e.value)}
            defaultValue={correctAnswer}
            className="cursor-pointer"
          />
        </div>
        <div className="w-1/4">
          <Button
            type="submit"
            buttonText={type === "create" ? "Create" : "Update"}
          />
        </div>
      </div>
    </form>
  );
};

export default QuizForm;
