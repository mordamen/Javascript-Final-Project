import validate from "./validate.js";
const validatePassword = (value, prefixLabel = "Password") => {
    const reg = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,255}$",
    "ig");
    return validate(reg, value, 5, 255, "minimum one small letter, one big letter, one number, exclamation mark and more than 5 chars").map((err) => `${prefixLabel} ${err}`);
};

export default validatePassword;
