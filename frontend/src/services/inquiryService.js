import axios from "axios";

const API = "http://localhost:5000/api/inquiries";

export const submitInquiry = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const getInquiries = async (token) => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateInquiryStatus = async (id, status, token) => {
  const response = await axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteInquiry = async (id, token) => {
  const response = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
