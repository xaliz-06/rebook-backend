import express from "express";
import { param } from "express-validator";
import storeController from "../controllers/storeController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city").isString().trim().notEmpty().withMessage("City is required"),
  storeController.searchStore
);

router.get(
  "/:storeId",
  param("storeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("storeId is required and must be a valid parameter"),
  storeController.getStore
);

export default router;
