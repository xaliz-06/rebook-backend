import express from "express";
import { param } from "express-validator";
import storeController from "../controllers/storeController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city").isString().trim().notEmpty().withMessage("City is required"),
  storeController.searchStore
);

export default router;
