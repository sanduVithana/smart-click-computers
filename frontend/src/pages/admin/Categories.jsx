import {
  useEffect,
  useState,
} from "react";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/categoryService";

import { useAuth } from "../../context/AuthContext";

function Categories() {
  const [categories,
    setCategories] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const { user } =
    useAuth();

  const fetchCategories =
    async () => {
      const data =
        await getCategories();

      setCategories(data);
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await createCategory(
        {
          name,
        },
        user.token
      );

      setName("");

      fetchCategories();
    };

  const handleDelete =
    async (id) => {
      await deleteCategory(
        id,
        user.token
      );

      fetchCategories();
    };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">
        Categories
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-5"
      >
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Category Name"
          className="border p-2"
        />

        <button className="bg-blue-600 text-white px-4">
          Add
        </button>
      </form>

      {categories.map(
        (category) => (
          <div
            key={
              category._id
            }
            className="border p-3 flex justify-between mb-2"
          >
            <span>
              {
                category.name
              }
            </span>

            <button
              onClick={() =>
                handleDelete(
                  category._id
                )
              }
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Categories;