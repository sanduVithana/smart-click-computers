import express from "express";
import {
  getBusinessInfo,
  updateBusinessInfo,
} from "../controllers/businessController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getBusinessInfo)
  .put(protect, updateBusinessInfo);

export default router;
