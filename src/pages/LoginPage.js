import PAGES from "../models/pageModel.js"
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import checkIfInputIsValid from "../utils/checkIfInputIsValid.js";
import { initializeProfile } from "./ProfilePage.js"; 
import {showToast} from "../utils/toast.js";

let loginEmailInput;
let loginPasswordInput;
let loginRegisterIfNoAccountLink;
let btnLogin;

window.addEventListener("load", () => {
    //when page is loaded
    initElems();
    initEventListeners();
});

const initElems = ()=> {
    loginEmailInput = document.getElementById("login-input-email");
    loginPasswordInput = document.getElementById("login-input-password");
    loginRegisterIfNoAccountLink = document.getElementById("login-goto-register-page");
    btnLogin = document.getElementById("login-btn");
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
}

const initEventListeners = () => {
    loginEmailInput.addEventListener("input", () => {
        checkIfInputIsValid(loginEmailInput, "login-alert-email", validateEmail, "Email ");
    });

    loginPasswordInput.addEventListener("input", () => {
        checkIfInputIsValid(loginPasswordInput, "login-alert-password", validatePassword, "Password ");
    });

    btnLogin.addEventListener("click", () => {
        if (validateEmail(loginEmailInput.value).length) {
            return;
        }
        if (validatePassword(loginPasswordInput.value).length) {
            return;
        }
        let users = JSON.parse(localStorage.getItem("users"));
        if (!users) {
            //users === null
            return;
        }
        let user = users.find(
            (currUser) =>
            currUser.email === loginEmailInput.value &&
            currUser.password === loginPasswordInput.value);
            
        if (!user) {
            showToast("Error Occured", "Invalid Email and/or Password", false);
            return;
        }
        localStorage.setItem("token", JSON.stringify({id: user.id, first_name:user.first_name, 
            last_name: user.last_name, email:user.email, isAdmin: user.isAdmin, favorites: user.favorites}));
        initializeProfile(user);
        location.reload();
    });

    loginRegisterIfNoAccountLink.addEventListener("click", ()=>{
        handlePageChange(PAGES.REGISTER);
    })
}

