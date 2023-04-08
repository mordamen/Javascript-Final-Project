import validateEmail from "../validation/validateEmail.js";
import validateName from "../validation/validateName.js";
import validateString from "../validation/validateString.js";
import checkIfInputIsValid from "../utils/checkIfInputIsValid.js"
import validateInputArr from "../validation/validateInputArr.js";

let contactNameInput;
let contactEmailInput;
let contactMessageInput;
let btnSubmitContactForm;
let formSubmitResult;
let inputOkArr = [false, false, false];
const inputIndexes = {
	name: 0,
	email: 1,
    msg: 2
}

window.addEventListener("load", () => {
    //when page is loaded
    initElems();
    firstLoadChecks();
    initEventListeners();
});

const checkInput = (contactInput, contactAlert, contactBooleanIndex, validateFunc, prefixLabel) => {
    if (checkIfInputIsValid (contactInput, contactAlert, validateFunc, prefixLabel)){
        inputOkArr[contactBooleanIndex] = true;
    }
    else{
        inputOkArr[contactBooleanIndex] = false;
    }
    checkIfCanEnableButton();
}

const initElems = ()=> {
    contactNameInput = document.getElementById("contact-input-name");
    contactEmailInput = document.getElementById("contact-input-email");
    contactMessageInput = document.getElementById("contact-input-message");
    btnSubmitContactForm = document.getElementById("contact-btn");
    formSubmitResult = document.getElementById("submitSuccessMessage");
}

const initEventListeners = () => {
    contactNameInput.addEventListener("input", () => {
        checkInput(contactNameInput, "contact-alert-name", inputIndexes.name, validateName, "");
    });

    contactEmailInput.addEventListener("input", () => {
        checkInput(contactEmailInput, "contact-alert-email", inputIndexes.email, validateEmail, "Email ");
    });

    contactMessageInput.addEventListener("input", () => {
        checkInput(contactMessageInput, "contact-alert-message", inputIndexes.msg, validateString, "Message ");
    });
    btnSubmitContactForm.addEventListener("click", () => {
        if(!(validateInputArr(inputOkArr)))
        {
                return;
        }
        formSubmitResult.innerHTML = "Form submission successful!";
        formSubmitResult.classList.remove("d-none");
        setTimeout( ()=>{formSubmitResult.innerHTML=""; formSubmitResult.classList.add("d-none");}, 3000);        
    })
}

const firstLoadChecks = ()=>{
    if (contactNameInput.value !== "") {
        checkInput(contactNameInput, "contact-alert-name", inputIndexes.name, validateName, "Name ");
    }
    if (contactEmailInput.value !== "") {
        checkInput(contactEmailInput, "contact-alert-email", inputIndexes.email, validateEmail, "Email ");
    }
    if (contactMessageInput.value !== "") {
        checkInput(contactMessageInput, "contact-alert-message", inputIndexes.msg, validateString, "Message ");
    }

}

const checkIfCanEnableButton = () => {
    if(!(validateInputArr(inputOkArr)))
    {
        btnSubmitContactForm.classList.add("disabled");
    }
    else{
        btnSubmitContactForm.classList.remove("disabled");
    }
}