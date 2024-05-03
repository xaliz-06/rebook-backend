import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyStoreRequest = [
  body("sellerName").notEmpty().withMessage("Seller name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat()
    .withMessage("Delivery price must be a positive number"),
  body("interestedGenres")
    .isArray()
    .withMessage("Interested genres must be an array"),
  body("availableBooks")
    .isArray()
    .withMessage("Available books must be an array"),
  body("availableBooks.*.name").notEmpty().withMessage("Book name is required"),
  body("availableBooks.*.author")
    .notEmpty()
    .withMessage("Author name is required"),
  body("availableBooks.*.releaseYear")
    .notEmpty()
    .withMessage("Release year is required"),
  body("availableBooks.*.genre")
    .isArray()
    .withMessage("Genres must be an array"),
  body("availableBooks.*.condition")
    .notEmpty()
    .withMessage("Condition is required"),
  body("availableBooks.*.price")
    .isFloat()
    .withMessage("Price must be a positive number"),
  handleValidationErrors,
];
