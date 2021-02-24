import axios from "axios";

const create = payload => axios.post(`/public`, payload);

const publicApi = {
  create,
};

export default publicApi;
