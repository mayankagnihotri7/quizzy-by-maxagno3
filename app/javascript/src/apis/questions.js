import axios from "axios";

const create = ({ id, payload }) =>
  axios.post(`/quizzes/${id}/questions`, payload);

const list = id => {
  axios.get(`/quizzes/${id}/questions`);
};

const show = ({ quiz_id, id }) => {
  axios.get(`/quizzes/${quiz_id}/questions/${id}`);
};

const update = ({ quiz_id, id, payload }) => {
  axios.put(`/quizzes/${quiz_id}/questions/${id}`, payload);
};

const destroy = ({ quiz_id, id }) => {
  axios.delete(`/quizzes/${quiz_id}/questions/${id}`);
};

const questionsApi = {
  create,
  list,
  show,
  update,
  destroy,
};

export default questionsApi;
