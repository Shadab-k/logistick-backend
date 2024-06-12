const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/contact");

const router = express.Router();

// Endpoint to handle form submission

router.post(
  "/contact",
  [
    body("name")
      .notEmpty().withMessage("Name is required")
      .isAlpha('en-US', { ignore: ' ' }).withMessage("Name must contain only letters"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid"),
    body("phone")
      .notEmpty().withMessage("Phone is required")
      .isLength({ min: 10, max: 10 }).withMessage("Phone must be exactly 10 digits")
      .isNumeric().withMessage("Phone must contain only numeric values")
      .custom(value => {
        if (value.startsWith("+")) {
          throw new Error("Phone must not start with + sign");
        }
        return true;
      }),
    body("company")
      .notEmpty().withMessage("Company is required"),
    body("message")
      .notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company , message} = req.body;

    try {
      const newContact = await Contact.create({ name, email, phone, company, message });
      res.status(201).json({ message: "Contact saved", data: newContact });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ message: "Error saving contact" });
    }
  }
);


module.exports = router;