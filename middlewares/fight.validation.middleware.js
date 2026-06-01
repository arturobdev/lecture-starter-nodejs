import { extraFieldsValidator, requiredFieldsValidator } from "../helpers/fieldsValidator.js";
import { FIGHT } from "../models/fight.js";

const createFightValid = (req, res, next) => {
    const body = req.body;
    const { email, phone, password } = body
    const allowedFields = Object.keys(FIGHT);

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

    const missingFields = requiredFieldsValidator(body, FIGHT, ["id", "log"]);

    if (missingFields.length) {
        return res.status(400).json({
            error: true,
            message: "Fight entity to create is not valid"
        });
    }

    next();
};

export { createFightValid };