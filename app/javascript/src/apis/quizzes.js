import axios from "axios";

const create = payload => axios.post("/quizzes", payload);

const list = () => axios.get("/quizzes");

const update = ({ id, payload }) => axios.put(`/quizzes/${id}`, payload);

const destroy = id => axios.delete(`/quizzes/${id}`);

const show = id => axios.get(`/quizzes/${id}`);

const quizzesApi = {
  create,
  list,
  destroy,
  show,
  update,
};

export default quizzesApi;
