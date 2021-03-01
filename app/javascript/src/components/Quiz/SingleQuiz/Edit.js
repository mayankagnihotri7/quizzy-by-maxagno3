import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import questionsApi from "apis/questions";
import Loader from "../../Common/Loader";
import QuizForm from "./QuizForm";

const Edit = () => {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options_attributes, setOptionsAttributes] = useState([]);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const { quiz_id, id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchQuestionDetails = async () => {
    setLoading(true);
    const questionDetails = await axios.get(
      `/quizzes/${quiz_id}/questions/${id}`
    );
    setTitle(questionDetails.data.question.title);
    setCorrectAnswer(questionDetails.data.question?.answer);
    const newData = questionDetails.data.options.map(data => {
      return { id: data.id, name: data.name };
    });
    setOptions(newData);
    setOptionsAttributes(newData);
    setLoading(false);
  };

  const handleChange = (index, e) => {
    let newArr = [...options_attributes];
    newArr[index].name = e.target.value;
    setOptions(newArr);
    setOptionsAttributes(newArr);
  };

  const handleRemoveOption = (optionId, index) => {
    const newArr = [...options_attributes];
    const newOptions = options_attributes.filter((_option, i) => i !== index);
    const updateOption = newArr.map((option, i) => {
      if (option.id === optionId || index === i) {
        return { ...option, _destroy: true };
      } else {
        return option;
      }
    });
    setOptions(newOptions);
    setOptionsAttributes(updateOption);
  };

  const handleAddOption = () => {
    const newArr = [...options_attributes, { name: "" }];
    setOptions(newArr);
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

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto">
      <QuizForm
        title={title}
        setTitle={setTitle}
        setCorrectAnswer={setCorrectAnswer}
        options_attributes={options}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleRemoveOption={handleRemoveOption}
        handleAddOption={handleAddOption}
        type="Update"
      />
    </div>
  );
};

export default Edit;
