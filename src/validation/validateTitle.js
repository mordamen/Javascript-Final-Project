import validate from "./validate.js";
const validateTitle = (value, prefixLabel) => {
    const reg = new RegExp("(?!^$)([^\s])", "ig");
    return validate(reg, value, 2, 30, "Must Be none empty").map((err) => `${prefixLabel} ${err}`);
};

export default validateTitle;