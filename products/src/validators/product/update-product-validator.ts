import { body } from "express-validator";

export const updateProductValidator = [
  body("price.mrp")
    .not()
    .isEmpty()
    .withMessage("Price is required !")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("price.retail")
    .not()
    .isEmpty()
    .withMessage("Price is required !")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("stock")
    .not()
    .isEmpty()
    .withMessage("Price is required !")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
];
