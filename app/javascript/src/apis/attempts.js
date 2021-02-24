import axios from "axios";

const create = payload => axios.post("/attempts", payload);

const update = ({ slug, payload }) => axios.put(`/attempts/${slug}`, payload);

const attemptsApi = {
  create,
  update,
};

export default attemptsApi;
