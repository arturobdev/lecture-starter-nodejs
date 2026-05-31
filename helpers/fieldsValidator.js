const extraFieldsValidator = (body, allowedFields) => {
    return Object.keys(body).filter(field => !allowedFields.includes(field));
}

const requiredFieldsValidator = (body, model, excludedFields = []) => {
    const requiredFields = Object.keys(model).filter(field => !excludedFields.includes(field));

    return requiredFields.filter(field => {
        const value = body[field]

        return ((!field in body)) || value === null || value === undefined || (typeof value === "string" && value.trim() === "")
    });
};

const emptyFieldsValidator = (body) => {
    return Object.entries(body).filter(
        ([_, value]) =>
            typeof value === "string" &&
            value.trim() === ""
    );
};

const hasNoFieldsToUpdate = (body) => {
    return Object.keys(body).length === 0;
};

export { extraFieldsValidator, requiredFieldsValidator, emptyFieldsValidator, hasNoFieldsToUpdate }