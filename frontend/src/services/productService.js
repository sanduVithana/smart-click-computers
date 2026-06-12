import axios from "axios";

const API =
  "http://localhost:5000/api/products";

export const getProducts =
  async () => {
    const response =
      await axios.get(API);

    return response.data;
  };

export const deleteProduct =
  async (id, token) => {
    const response =
      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };