import React, { useEffect, useState } from "react";
import Input from "components/Input";
import Button from "components/Button";
import quizzesApi from "apis/quizzes";
import { useHistory, useParams } from "react-router-dom";

const EditQuiz = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await quizzesApi.update({
      id,
      payload: { quiz: { title, user_id: userId } },
    });
    setLoading(false);
    history.push("/");
  };

  const fetchQuizDetails = async () => {
    setLoading(true);
    const quizDetails = await quizzesApi.show(id);
    setTitle(quizDetails.data.quiz.title);
    setUserId(quizDetails.data.quiz.user_id);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Quiz Revamp"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button type="submit" buttonText="Update" loading={loading} />
    </form>
  );
};

export default EditQuiz;
