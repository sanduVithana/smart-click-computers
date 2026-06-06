import axios from "axios";

const API =
  "http://localhost:5000/api/categories";

export const getCategories =
  async () => {
    const response =
      await axios.get(API);

    return response.data;
  };

export const createCategory =
  async (
    categoryData,
    token
  ) => {
    const response =
      await axios.post(
        API,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const deleteCategory =
  async (id, token) => {
    const response =
      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };