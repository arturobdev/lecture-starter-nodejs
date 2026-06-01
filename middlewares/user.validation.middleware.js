import {
  emptyFieldsValidator,
  extraFieldsValidator,
  hasNoFieldsToUpdate,
  requiredFieldsValidator
} from "../helpers/fieldsValidator.js";
import { emailValidator, passwordValidator, phoneValidator } from "../helpers/userFieldValidator.js";
import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const body = req.body;
  const { email, phone, password } = body
  const allowedFields = Object.keys(USER);

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "Id should not be provided"
    });
  }

  const extraFields = extraFieldsValidator(body, allowedFields)

  if (extraFields.length) {
    return res.status(400).json({
      error: true,
      message: "Extra fields is not allowed"
    });
  }

  const missingFields = requiredFieldsValidator(body, USER, ["id"]);

  if (missingFields.length) {
    return res.status(400).json({
      error: true,
      message: "User entity to create is not valid"
    });
  }

  if (!emailValidator(email)) {
    return res.status(400).json({
      error: true,
      message: "Email domain not allowed"
    });
  }

  if (!phoneValidator(phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone is not allowed"
    });
  }

  if (!passwordValidator(password)) {
    return res.status(400).json({
      error: true,
      message: "Password must be an string and at least 3 characters"
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const id = req.params.id
  const body = req.body
  const { email, phone, password } = body
  const allowedFields = Object.keys(USER);

  if (hasNoFieldsToUpdate(body)) {
    return res.status(400).json({
      error: true,
      message: "User entity to update is not valid"
    });
  }

  if (emptyFieldsValidator(body)?.length) {
    return res.status(400).json({
      error: true,
      message: "Empty field is not allowed"
    });
  }

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "Id should not be provided"
    });
  }

  const extraFields = extraFieldsValidator(body, allowedFields)

  if (extraFields.length) {
    return res.status(400).json({
      error: true,
      message: "Extra fields is not allowed"
    });
  }

  if (email && !emailValidator(email)) {
    return res.status(400).json({
      error: true,
      message: "Email domain not allowed"
    });
  }

  if (phone && !phoneValidator(phone)) {
    return res.status(400).json({
      error: true,
      message: "Phone is not allowed"
    });
  }

  if (password && !passwordValidator(password)) {
    return res.status(400).json({
      error: true,
      message: "Password must be an string and at least 3 characters"
    });
  }

  next();
};

export { createUserValid, updateUserValid };
