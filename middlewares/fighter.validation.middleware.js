import {
  emptyFieldsValidator,
  extraFieldsValidator,
  hasNoFieldsToUpdate,
  requiredFieldsValidator
} from "../helpers/fieldsValidator.js";
import { defenseValidator, healthValidator, powerValidator } from "../helpers/fighterValidator.js";
import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const body = req.body;
  const { health, defense, power } = body;
  const allowedFields = Object.keys(FIGHTER);

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "Id should not be provided"
    });
  };

  const extraFields = extraFieldsValidator(body, allowedFields)

  if (extraFields.length) {
    return res.status(400).json({
      error: true,
      message: "Extra fields is not allowed"
    });
  };

  const missingFields = requiredFieldsValidator(body, FIGHTER, ["id", "health"]);

  if (missingFields.length) {
    return res.status(400).json({
      error: true,
      message: "Fighter entity to create is not valid"
    });
  };

  if (!powerValidator(power)) {
    return res.status(400).json({
      error: true,
      message: "Power value is not valid"
    });
  };

  if (!defenseValidator(defense)) {
    return res.status(400).json({
      error: true,
      message: "Defense value is not valid"
    });
  };

  if (health && !healthValidator(health)) {
    return res.status(400).json({
      error: true,
      message: "Health value is not valid"
    });
  };

  next();
};

const updateFighterValid = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const { health, defense, power } = body;
  const allowedFields = Object.keys(FIGHTER);

  if (hasNoFieldsToUpdate(body)) {
    return res.status(400).json({
      error: true,
      message: "Fighter entity to update is not valid"
    });
  };

  if (emptyFieldsValidator(body)?.length) {
    return res.status(400).json({
      error: true,
      message: "Empty field is not allowed"
    });
  };

  if ("id" in body) {
    return res.status(400).json({
      error: true,
      message: "Id should not be provided"
    });
  };

  const extraFields = extraFieldsValidator(body, allowedFields)

  if (extraFields.length) {
    return res.status(400).json({
      error: true,
      message: "Extra fields is not allowed"
    });
  };

  if (defense && !defenseValidator(defense)) {
    return res.status(400).json({
      error: true,
      message: "Defense value is not valid"
    });
  };

  if (power && !powerValidator(power)) {
    return res.status(400).json({
      error: true,
      message: "Power value is not valid"
    });
  };

  if (health && !healthValidator(health)) {
    return res.status(400).json({
      error: true,
      message: "Health value is not valid"
    });
  };

  next();
};

export { createFighterValid, updateFighterValid };
