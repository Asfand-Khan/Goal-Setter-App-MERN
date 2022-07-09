import axios from "axios";

const API_URL = "http://localhost:4500";

const create = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/api/goals", goal, config);
  return response.data;
};

const get = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/api/goals", config);
  return response.data;
};

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "/api/goals/" + goalId, config);

  return response.data;
};

const goalServices = {
  create,
  get,
  deleteGoal,
};

export default goalServices;
