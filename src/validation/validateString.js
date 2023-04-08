import validate from "./validate.js";
const validateString = (value, prefixLabel) => {
    const reg = new RegExp("^[a-zA-Z ]*$", "ig");
    return validate(reg, value, 2, 20, "Must Be only characters").map((err) => `${prefixLabel} ${err}`);
};

export default validateString;