import axios from "axios";

const create = ({ id, payload }) =>
  axios.post(`/quizzes/${id}/questions`, payload);

const questionsApi = {
  create,
};

export default questionsApi;
