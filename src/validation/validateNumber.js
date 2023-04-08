import validate from "./validate.js";
const validateNumber = (value, prefixLabel) => {
    const reg = new RegExp("^[0-9]+$", "ig");

    return validate(reg, value, 1, 15, "Must be a Number").map((err) => `${prefixLabel} ${err}`);

};

export default validateNumber;