// import Product from "../models/Product.js";
// import Counter from "../models/Counter.js";
// import cloudinary from "../config/cloudinary.js";

// export const createProduct = async (
//   req,
//   res
// ) => {
//   try {
//     const {
//       name,
//       description,
//       category,
//       brand,
//       price,
//       stockQuantity,
//       featured,
//       specifications,
//     } = req.body;

//     const imageUrls = [];

//     if (
//       req.files &&
//       req.files.length > 0
//     ) {
//       for (const file of req.files) {
//         const uploaded =
//           await new Promise(
//             (resolve, reject) => {
//               cloudinary.uploader
//                 .upload_stream(
//                   {
//                     folder:
//                       "smart-click-products",
//                   },
//                   (
//                     error,
//                     result
//                   ) => {
//                     if (
//                       error
//                     )
//                       reject(
//                         error
//                       );
//                     else
//                       resolve(
//                         result
//                       );
//                   }
//                 )
//                 .end(
//                   file.buffer
//                 );
//             }
//           );

//         imageUrls.push(
//           uploaded.secure_url
//         );
//       }
//     }

//     const counter =
//       await Counter.findOneAndUpdate(
//         {
//           name:
//             "productId",
//         },
//         {
//           $inc: {
//             sequence: 1,
//           },
//         },
//         {
//           new: true,
//           upsert: true,
//         }
//       );

//     const product =
//       await Product.create({
//         productId:
//           counter.sequence,

//         name,
//         description,
//         category,
//         brand,
//         price,
//         stockQuantity,

//         featured:
//           featured ===
//           "true",

//         specifications:
//           specifications
//             ? JSON.parse(
//                 specifications
//               )
//             : [],

//         images:
//           imageUrls,
//       });

//     res.status(201).json(
//       product
//     );
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.message,
//     });
//   }
// };

// export const getProducts =
//   async (req, res) => {
//     try {
//       const products =
//         await Product.find()
//           .populate(
//             "category"
//           )
//           .sort({
//             createdAt:
//               -1,
//           });

//       res.json(products);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   };

//   export const getProductById =
//   async (req, res) => {
//     try {
//       const product =
//         await Product.findById(
//           req.params.id
//         ).populate(
//           "category"
//         );

//       if (!product) {
//         return res
//           .status(404)
//           .json({
//             message:
//               "Product not found",
//           });
//       }

//       res.json(product);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   };

//   export const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(
//       req.params.id
//     );

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     let imageUrls = [...product.images];

//     if (req.files && req.files.length > 0) {
//       imageUrls = [];

//       for (const file of req.files) {
//         const uploaded = await new Promise(
//           (resolve, reject) => {
//             cloudinary.uploader
//               .upload_stream(
//                 {
//                   folder: "smart-click-products",
//                 },
//                 (error, result) => {
//                   if (error) reject(error);
//                   else resolve(result);
//                 }
//               )
//               .end(file.buffer);
//           }
//         );

//         imageUrls.push(uploaded.secure_url);
//       }
//     }

//     product.name = req.body.name || product.name;
//     product.description =
//       req.body.description ||
//       product.description;

//     product.category =
//       req.body.category ||
//       product.category;

//     product.brand =
//       req.body.brand ||
//       product.brand;

//     product.price =
//       req.body.price ||
//       product.price;

//     product.stockQuantity =
//       req.body.stockQuantity ||
//       product.stockQuantity;

//     product.featured =
//       req.body.featured === "true";

//     product.images = imageUrls;

//     await product.save();

//     res.json(product);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const deleteProduct = async (
//   req,
//   res
// ) => {
//   try {
//     const product =
//       await Product.findById(
//         req.params.id
//       );

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     await Product.findByIdAndDelete(
//       req.params.id
//     );

//     res.json({
//       message:
//         "Product deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         error.message,
//     });
//   }
// };

// export const getFeaturedProducts =
//   async (req, res) => {
//     try {
//       const products =
//         await Product.find({
//           featured: true,
//         })
//           .populate(
//             "category"
//           )
//           .limit(8);

//       res.json(products);
//     } catch (error) {
//       res.status(500).json({
//         message:
//           error.message,
//       });
//     }
//   };

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
                    if (error)
                      reject(error);
                    else
                      resolve(result);
                  }
                )
                .end(file.buffer);
            }
          );

        imageUrls.push({
          url: uploaded.secure_url,
          publicId:
            uploaded.public_id,
        });
      }
    }

    const counter =
      await Counter.findOneAndUpdate(
        {
          name: "productId",
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
            createdAt: -1,
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

  export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res
        .status(404)
        .json({
          message:
            "Product not found",
        });
    }

    let imageUrls =
      product.images;

    if (
      req.files &&
      req.files.length > 0
    ) {
      for (const image of product.images) {
        await cloudinary.uploader.destroy(
          image.publicId
        );
      }

      imageUrls = [];

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
                    if (error)
                      reject(error);
                    else
                      resolve(result);
                  }
                )
                .end(file.buffer);
            }
          );

        imageUrls.push({
          url:
            uploaded.secure_url,
          publicId:
            uploaded.public_id,
        });
      }
    }

    product.name =
      req.body.name ||
      product.name;

    product.description =
      req.body.description ||
      product.description;

    product.category =
      req.body.category ||
      product.category;

    product.brand =
      req.body.brand ||
      product.brand;

    product.price =
      req.body.price ||
      product.price;

    product.stockQuantity =
      req.body.stockQuantity ||
      product.stockQuantity;

    product.featured =
      req.body.featured ===
      "true";

    product.images =
      imageUrls;

    if (
      req.body.specifications
    ) {
      product.specifications =
        JSON.parse(
          req.body
            .specifications
        );
    }

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res
        .status(404)
        .json({
          message:
            "Product not found",
        });
    }

    for (const image of product.images) {
      await cloudinary.uploader.destroy(
        image.publicId
      );
    }

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const getFeaturedProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          featured: true,
        })
          .populate(
            "category"
          )
          .limit(8);

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const getLatestProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find()
          .sort({
            createdAt: -1,
          })
          .limit(8);

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };
  