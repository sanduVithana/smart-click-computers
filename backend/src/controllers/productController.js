import Product from "../models/Product.js";
import Counter from "../models/Counter.js";
import cloudinary from "../config/cloudinary.js";

export const createProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      stockQuantity,
      featured,
      specifications,
    } = req.body;

    const imageUrls = [];

    if (
      req.files &&
      req.files.length > 0
    ) {
      for (const file of req.files) {
        const uploaded =
          await new Promise(
            (resolve, reject) => {
              cloudinary.uploader
                .upload_stream(
                  {
                    folder:
                      "smart-click-products",
                  },
                  (
                    error,
                    result
                  ) => {
                    if (
                      error
                    )
                      reject(
                        error
                      );
                    else
                      resolve(
                        result
                      );
                  }
                )
                .end(
                  file.buffer
                );
            }
          );

        imageUrls.push(
          uploaded.secure_url
        );
      }
    }

    const counter =
      await Counter.findOneAndUpdate(
        {
          name:
            "productId",
        },
        {
          $inc: {
            sequence: 1,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );

    const product =
      await Product.create({
        productId:
          counter.sequence,

        name,
        description,
        category,
        brand,
        price,
        stockQuantity,

        featured:
          featured ===
          "true",

        specifications:
          specifications
            ? JSON.parse(
                specifications
              )
            : [],

        images:
          imageUrls,
      });

    res.status(201).json(
      product
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find()
          .populate(
            "category"
          )
          .sort({
            createdAt:
              -1,
          });

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const getProductById =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        ).populate(
          "category"
        );

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found",
          });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const deleteProduct =
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };