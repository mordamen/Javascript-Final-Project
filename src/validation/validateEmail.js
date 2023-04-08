import validate from "./validate.js";
const validateEmail = (value, prefixLabel = "Email") => {
    const reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", "ig");

    return validate(reg, value, 5, 255, "format must be a@b.com").map((err) => `${prefixLabel} ${err}`);

};

export default validateEmail;