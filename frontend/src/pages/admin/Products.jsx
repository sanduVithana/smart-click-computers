import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

import { useAuth } from "../../context/AuthContext";

function Products() {
  const [products,
    setProducts] =
    useState([]);

  const { user } =
    useAuth();

  const fetchProducts =
    async () => {
      const data =
        await getProducts();

      setProducts(data);
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete product?"
        );

      if (
        !confirmDelete
      )
        return;

      await deleteProduct(
        id,
        user.token
      );

      fetchProducts();
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-5">
        Products
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={
                    product._id
                  }
                >
                  <td>
                    {
                      product.productId
                    }
                  </td>

                  <td>
                    {product
                      .images
                      ?.length >
                      0 && (
                      <img
                        src={
                          product
                            .images[0]
                            .url
                        }
                        alt=""
                        width="60"
                      />
                    )}
                  </td>

                  <td>
                    {
                      product.name
                    }
                  </td>

                  <td>
                    {
                      product
                        .category
                        ?.name
                    }
                  </td>

                  <td>
                    Rs.
                    {
                      product.price
                    }
                  </td>

                  <td>
                    {
                      product.stockQuantity
                    }
                  </td>

                  <td>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;