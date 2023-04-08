import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateString from "../validation/validateString.js";
import validateNumber from "../validation/validateNumber.js";
import checkIfInputIsValid from "../utils/checkIfInputIsValid.js";
import User from "../models/User.js";
import Address from "../models/Address.js"
import { showToast } from "../utils/toast.js";
import validateInputArr from "../validation/validateInputArr.js";
import validatePhoneNumber from "../validation/validatePhoneNumber.js";


let registerInputFirstName;
let registerInputLastName;
let registerInputCountry;
let registerInputState;
let registerInputCity;
let registerInputStreet;
let registerInputHouseNumber;
let registerInputZipCode;
let registerInputEmail;
let registerInputPhone;
let registerInputPassword;
let registerInputReenterPassword;
let registerIsAdminChkbox;
let btnRegisterSubmit;
let btnRegisterCancel;
//Bool array to keep track of which inputs are valid for generic checkInput Func, 
//order: 0:firstName, 1:lastName, 2:country, 3:state, 4:city 5: street
//       6: house_number 7: zip_code 8: email 9: phone, password: 10
let inputOkArr = [false, false, false, false, false, false, false, false, false, false, false];
const inputIndexes = {
	firstName: 0,
	lastName: 1,
    country: 2,
    state: 3,
    city: 4,
    street: 5,
    house_number: 6,
    zip_code: 7,
    email: 8,
    phone: 9,
    password: 10
}
let reEnterPasswordOk = false;
let next_user_id = 1;

const checkInput = (registerInput, registerAlert, registerBooleanIndex, validateFunc, prefixLabel) => {
    if (checkIfInputIsValid (registerInput, registerAlert, validateFunc, prefixLabel)){
        inputOkArr[registerBooleanIndex] = true;
    }
    else{
        inputOkArr[registerBooleanIndex] = false;
    }
    checkIfCanEnableButton();
}

const checkPasswordToReEnterMatch = () => {
    reEnterPasswordOk = (registerInputPassword.value == registerInputReenterPassword.value);
    if(reEnterPasswordOk){
        registerInputReenterPassword.classList.remove("is-invalid");
        document.getElementById("register-alert-re_enter-password").classList.add("d-none");
    }
    else{
        registerInputReenterPassword.classList.add("is-invalid");
        document.getElementById("register-alert-re_enter-password").classList.remove("d-none");
        document.getElementById("register-alert-re_enter-password").innerHTML = "Re-entered password doesn't match actual given password";
    }
    checkIfCanEnableButton();
}

const firstLoadChecks = ()=>{
    if (registerInputFirstName.value !== "") {
        checkInput(registerInputFirstName, "register-alert-first-name", inputIndexes.firstName, validateName, "First ");
    }
    if (registerInputLastName.value !== "") {
        checkInput(registerInputLastName, "register-alert-last-name", inputIndexes.lastName, validateName, "Last ");
    }
    if (registerInputCountry.value !== "") {
        checkInput(registerInputCountry, "register-alert-country", inputIndexes.country, validateString, "Country ");
    }
    if (registerInputState.value !== "") {
        checkInput(registerInputState, "register-alert-state", inputIndexes.state, validateString, "State ");
    }
    if (registerInputCity.value !== "") {
        checkInput(registerInputCity, "register-alert-city", inputIndexes.city, validateString, "City ");
    }
    if (registerInputStreet.value !== "") {
        checkInput(registerInputStreet, "register-alert-street", inputIndexes.street, validateString, "Street ");
    }
    if (registerInputHouseNumber.value !== "") {
        checkInput(registerInputHouseNumber, "register-alert-house-number", inputIndexes.house_number, validateNumber, "House Number ");
    }
    if (registerInputZipCode.value !== "") {
        checkInput(registerInputZipCode, "register-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
    }
    if (registerInputEmail.value !== "") {
        checkInput(registerInputEmail, "register-alert-email", inputIndexes.email, validateEmail, "Email ");
    }
    if (registerInputPhone.value !== "") {
        checkInput(registerInputPhone, "register-alert-phone", inputIndexes.phone, validatePhoneNumber,
        "Phone " );
    }
    if (registerInputPassword.value !== "") {
        checkInput(registerInputPassword, "register-alert-password", inputIndexes.password, validatePassword, "Password ");
    }
    if (registerInputReenterPassword.value !== "") {
        checkPasswordToReEnterMatch();
    }
}

const initElems = ()=> {
    registerInputFirstName = document.getElementById("register-input-first-name");
    registerInputLastName = document.getElementById("register-input-last-name");
    registerInputCountry = document.getElementById("register-input-country");
    registerInputState = document.getElementById("register-input-state");
    registerInputCity = document.getElementById("register-input-city");
    registerInputStreet = document.getElementById("register-input-street");
    registerInputHouseNumber = document.getElementById("register-input-house-number");
    registerInputZipCode = document.getElementById("register-input-zip-code");
    registerInputEmail = document.getElementById("register-input-email");
    registerInputPhone = document.getElementById("register-input-phone");
    registerInputPassword = document.getElementById("register-input-password");
    registerInputReenterPassword = document.getElementById("register-input-re_enter-password");
    registerIsAdminChkbox = document.getElementById("isAdminCheckbox");
    btnRegisterSubmit = document.getElementById("register-submit-btn");
    btnRegisterCancel = document.getElementById("register-cancel-btn");
}

const initEventListeners = ()=> {
    registerInputFirstName.addEventListener("input", () => {
        checkInput(registerInputFirstName, "register-alert-first-name", inputIndexes.firstName, validateName, "First ");
    });

    registerInputLastName.addEventListener("input", () => {
        checkInput(registerInputLastName, "register-alert-last-name", inputIndexes.lastName, validateName, 
        "Last ");
    });

    registerInputCountry.addEventListener("input", ()=> {
        checkInput(registerInputCountry, "register-alert-country", inputIndexes.country, validateString, "Country " );
    })

    registerInputState.addEventListener("input", ()=>{
        checkInput(registerInputState, "register-alert-state", inputIndexes.state, validateString, "State ");
    })

    registerInputCity.addEventListener("input", ()=>{
        checkInput(registerInputCity, "register-alert-city", inputIndexes.city, validateString, "City ");
    })

    registerInputStreet.addEventListener("input", ()=>{ 
        checkInput(registerInputStreet, "register-alert-street", inputIndexes.street, validateString, "Street ");   
    })

    registerInputHouseNumber.addEventListener("input", ()=> {
        checkInput(registerInputHouseNumber, "register-alert-house-number", inputIndexes.house_number, validateNumber, "House Number " );
    })

    registerInputZipCode.addEventListener("input", ()=> {
        checkInput(registerInputZipCode, "register-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
    })


    registerInputEmail.addEventListener("input", () => {
        checkInput(registerInputEmail, "register-alert-email", inputIndexes.email, validateEmail, "Email ");
    });

    registerInputPhone.addEventListener("input", ()=> {
        checkInput(registerInputPhone, "register-alert-phone", inputIndexes.phone, validatePhoneNumber, "Phone " );
    })

    registerInputPassword.addEventListener("input", () => {
        checkInput(registerInputPassword, "register-alert-password", inputIndexes.password, validatePassword, "Password ");
    });

    registerInputReenterPassword.addEventListener("input", () => {
        checkPasswordToReEnterMatch();
    });

    btnRegisterSubmit.addEventListener("click", () => {
    if(!(validateInputArr(inputOkArr) 
        && reEnterPasswordOk))
    {
            return;
    }

    let users = localStorage.getItem("users");
    if(!users){
        users = [new User(next_user_id++,registerInputFirstName.value, registerInputLastName.value, new Address(registerInputCountry.value, registerInputState.value, registerInputCity.value, registerInputStreet.value, registerInputHouseNumber.value, registerInputZipCode.value), registerInputEmail.value, registerInputPhone.value, registerInputPassword.value,registerIsAdminChkbox.checked)];
        // save the array above into local storage,
        // users being key, and the value being the 
        // JSON string we get by converting users.
        localStorage.setItem("users", JSON.stringify(users));
        //update next_user_id in local storage
        localStorage.setItem("next_user_id", next_user_id + "");
    }
    else {
        users = JSON.parse(users);
        for(let user of users){
            if(user.email === registerInputEmail.value){
                //display msg - email already taken
                showToast("Error Occured", "Email Already Exists", false);
                return;
            }
        }
        next_user_id = (parseInt(JSON.parse(localStorage.getItem("next_user_id"))));
        users = [...users, new User(next_user_id++,registerInputFirstName.value, registerInputLastName.value, new Address(registerInputCountry.value, registerInputState.value, registerInputCity.value, registerInputStreet.value, registerInputHouseNumber.value, registerInputZipCode.value), registerInputEmail.value, registerInputPhone.value, registerInputPassword.value,registerIsAdminChkbox.checked)];
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("next_user_id", next_user_id + "");
    }
    handlePageChange(PAGES.LOGIN);
})

    btnRegisterCancel.addEventListener("click", ()=> {
        handlePageChange(PAGES.HOME);
    })

}


window.addEventListener("load", () => {
    //when page is loaded
    initElems();
    firstLoadChecks();
    initEventListeners();
});

const checkIfCanEnableButton = () => {
    (btnRegisterSubmit.disabled = !(
        validateInputArr(inputOkArr) 
        && reEnterPasswordOk));  
}