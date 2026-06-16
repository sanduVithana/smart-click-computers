import axios from "axios";

const API = "http://localhost:5000/api/business";

export const getBusinessInfo = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const updateBusinessInfo = async (data, token) => {
  const response = await axios.put(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
