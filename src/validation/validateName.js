import validate from "./validate.js";
const validateName = (value, prefixLabel) => {
    const reg = new RegExp("^[A-Z][a-z]{2,255}$", "ig");
    return validate(reg, value, 2, 10, "Must be one word, only letters").map((err) => `${prefixLabel} Name ${err}`);

};

export default validateName;