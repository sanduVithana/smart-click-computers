import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getLatestProducts,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

router.get(
  "/featured",
  getFeaturedProducts
);

router.get(
  "/latest",
  getLatestProducts
);  

router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    upload.array(
      "images",
      10
    ),
    createProduct
  );

router
  .route("/:id")
  .get(getProductById)
  .put(
    protect,
    upload.array(
      "images",
      10
    ),
    updateProduct
  )
  .delete(
    protect,
    deleteProduct
  );


export default router;