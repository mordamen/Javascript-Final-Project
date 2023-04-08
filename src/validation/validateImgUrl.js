import validate from "./validate.js";
const validateImgUrl= (value) => {
    const reg = new RegExp(
    "^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$",
    "ig");
    return validate(reg, value, 5, 255, "should be valid url with jpg|jpeg|png|webp|avif|gif|svg").map((err) => `Image Url ${err}`);
};

export default validateImgUrl;
