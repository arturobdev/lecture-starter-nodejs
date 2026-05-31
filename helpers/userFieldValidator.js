const emailValidator = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email)
}

const phoneValidator = (phone) => {
    const phoneRegex = /^\+380\d{9}$/;
    return phoneRegex.test(phone)
}

const passwordValidator = (password) => {
    return typeof password === "string" && password.length >= 3;
};

export { emailValidator, phoneValidator, passwordValidator }