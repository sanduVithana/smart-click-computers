import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

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
  .delete(
    protect,
    deleteProduct
  );

export default router;