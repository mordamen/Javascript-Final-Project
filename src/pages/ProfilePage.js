import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import checkIfConnected from "../utils/checkIfConnected.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateString from "../validation/validateString.js";
import validateNumber from "../validation/validateNumber.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";
import { showToast } from "../utils/toast.js";
import checkIfInputIsValid from "../utils/checkIfInputIsValid.js";
import validateInputArr from "../validation/validateInputArr.js";
import validatePhoneNumber from "../validation/validatePhoneNumber.js";


let profileInputFirstName;
let profileInputLastName;
let profileInputCountry;
let profileInputState;
let profileInputCity;
let profileInputStreet;
let profileInputHouseNumber;
let profileInputZipCode;
let profileInputEmail;
let profileInputPhone;
let profileInputPassword;
let profileInputReenterPassword;
let profileIsAdminChkbox;
let btnProfileSubmit;
let btnProfileCancel;
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
let currUser;

const initializeProfile = (userFromLogin) => {
    currUser = userFromLogin;
    fillInputsWithCurrUserData();
}

const fillInputsWithCurrUserData = () => {
    profileInputFirstName.value = currUser.first_name;
    profileInputLastName.value = currUser.last_name;

    profileInputCountry.value = currUser.address.country;
    profileInputState.value = currUser.address.state;
    profileInputCity.value = currUser.address.city;
    profileInputStreet.value = currUser.address.street;
    profileInputHouseNumber.value = currUser.address.house_num;
    profileInputZipCode.value = currUser.address.zip_code;

    profileInputEmail.value = currUser.email;
    profileInputPhone.value = currUser.phone;
    profileInputPassword.value = currUser.password;
    profileInputReenterPassword.value = currUser.password;
    profileIsAdminChkbox.checked = currUser.isAdmin;
    if(checkIfAdmin())
    {
        profileIsAdminChkbox.disabled = false;
    }
    else
    {
        profileIsAdminChkbox.disabled = true;
    }
}

window.addEventListener("load", () => {
    initElems();
    initInputEventListeners();
    initBtns();
    initScreenDetails();
    initDetailChecks();
});

const initScreenDetails = () => {
    if (checkIfConnected()) {
        let users = JSON.parse(localStorage.getItem("users"));
        let userToken = JSON.parse(localStorage.getItem("token"));
        initializeProfile(users.find(
        (user) =>
        user.id === userToken.id));
    }
}

const checkInput = (profileInput, profileAlert, profileBooleanIndex, validateFunc, prefixLabel) => {
    if (checkIfInputIsValid (profileInput, profileAlert, validateFunc, prefixLabel)){
        inputOkArr[profileBooleanIndex] = true;
    }
    else{
        inputOkArr[profileBooleanIndex] = false;
    }
    checkIfCanEnableButton();
}

const checkPasswordToReEnterMatch = () => {
    reEnterPasswordOk = (profileInputPassword.value == profileInputReenterPassword.value);
    if(reEnterPasswordOk){
        profileInputReenterPassword.classList.remove("is-invalid");
        document.getElementById("profile-alert-re_enter-password").classList.add("d-none");
    }
    else{
        profileInputReenterPassword.classList.add("is-invalid");
        document.getElementById("profile-alert-re_enter-password").classList.remove("d-none");
        document.getElementById("profile-alert-re_enter-password").innerHTML = "Re-entered password doesn't match actual given password";
    }
    checkIfCanEnableButton();
}

const initElems = () => {
    profileInputFirstName = document.getElementById("profile-input-first-name");
    profileInputLastName = document.getElementById("profile-input-last-name");
    profileInputCountry = document.getElementById("profile-input-country");
    profileInputState = document.getElementById("profile-input-state");
    profileInputCity = document.getElementById("profile-input-city");
    profileInputStreet = document.getElementById("profile-input-street");
    profileInputHouseNumber = document.getElementById("profile-input-house-number");
    profileInputZipCode = document.getElementById("profile-input-zip-code");
    profileInputEmail = document.getElementById("profile-input-email");
    profileInputPhone = document.getElementById("profile-input-phone");
    profileInputPassword = document.getElementById("profile-input-password");
    profileInputReenterPassword = document.getElementById("profile-input-re_enter-password");
    profileIsAdminChkbox = document.getElementById("profileIsAdminCheckbox");
    btnProfileSubmit = document.getElementById("profile-submit-btn");
    btnProfileCancel = document.getElementById("profile-cancel-btn");
}

const initInputEventListeners = ()=> {
    profileInputFirstName.addEventListener("input", () => {
        checkInput(profileInputFirstName, "profile-alert-first-name", inputIndexes.firstName, validateName, "First ");
    });

    profileInputLastName.addEventListener("input", () => {
        checkInput(profileInputLastName, "profile-alert-last-name", inputIndexes.lastName, validateName, 
        "Last ");
    });

    profileInputCountry.addEventListener("input", ()=> {
        checkInput(profileInputCountry, "profile-alert-country", inputIndexes.country, validateString, "Country " );
    })

    profileInputState.addEventListener("input", ()=>{
        checkInput(profileInputState, "profile-alert-state", inputIndexes.state, validateString, "State ");
    })

    profileInputCity.addEventListener("input", ()=>{
        checkInput(profileInputCity, "profile-alert-city", inputIndexes.city, validateString, "City ");
    })

    profileInputStreet.addEventListener("input", ()=>{ 
        checkInput(profileInputStreet, "profile-alert-street", inputIndexes.street, validateString, "Street ");   
    })

    profileInputHouseNumber.addEventListener("input", ()=> {
        checkInput(profileInputHouseNumber, "profile-alert-house-number", inputIndexes.house_number, validateNumber, "House Number " );
    })

    profileInputZipCode.addEventListener("input", ()=> {
        checkInput(profileInputZipCode, "profile-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
    })


    profileInputEmail.addEventListener("input", () => {
        checkInput(profileInputEmail, "profile-alert-email", inputIndexes.email, validateEmail, "Email ");
    });

    profileInputPhone.addEventListener("input", ()=> {
        checkInput(profileInputPhone, "profile-alert-phone", inputIndexes.phone, validatePhoneNumber, "Phone " );
    })

    profileInputPassword.addEventListener("input", () => {
        checkInput(profileInputPassword, "profile-alert-password", inputIndexes.password, validatePassword, "Password ");
        checkPasswordToReEnterMatch();
    });

    profileInputReenterPassword.addEventListener("input", () => {
        checkPasswordToReEnterMatch();
    });
}

const initBtns = () => {
    btnProfileSubmit.addEventListener("click", () => {
    if(!(validateInputArr(inputOkArr)
        && reEnterPasswordOk))
    {
            return;
    }

    currUser.first_name = profileInputFirstName.value;
    currUser.last_name = profileInputLastName.value;

    currUser.address.country = profileInputCountry.value;
    currUser.address.state = profileInputState.value;
    currUser.address.city = profileInputCity.value;
    currUser.address.street = profileInputStreet.value;
    currUser.address.house_num = profileInputHouseNumber.value;
    currUser.address.zip_code = profileInputZipCode.value;

    currUser.email = profileInputEmail.value;
    currUser.phone = profileInputPhone.value;
    currUser.password = profileInputPassword.value;
    currUser.password = profileInputReenterPassword.value;
    currUser.isAdmin = profileIsAdminChkbox.checked;

    let users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (users && token) {
        //we have users
        users = JSON.parse(users); // convert from string to array of objects
        token = JSON.parse(token); // convert from string to array of objects
        //check if the given email matches an email from an already existing user
        let userEmail = users.find((item) => item.email === profileInputEmail.value);
        //find the user on the basis of the token
        let user = users.find((item) => {
            return item.id === token.id
        });
        //If an email was found matching the input and the ids of the users differ
        if (userEmail && user.id != userEmail.id) {
            //the email is already token
            showToast("Error Occured", "Email already taken", false);
            return;
        }
    }
    
    let updatedUsers = users.map((user) => user.id === currUser.id ? currUser : user);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("token", JSON.stringify({id: currUser.id, first_name: currUser.first_name, last_name: currUser.last_name, email: currUser.email, isAdmin: currUser.isAdmin, favorites: currUser.favorites}));
    location.reload();
})

    btnProfileCancel.addEventListener("click", ()=> {
        handlePageChange(PAGES.HOME);
    })

}

const initDetailChecks = () => {
    if (profileInputFirstName.value !== "") {
        checkInput(profileInputFirstName, "profile-alert-first-name", inputIndexes.firstName, validateName, "First ");
    }
    if (profileInputLastName.value !== "") {
        checkInput(profileInputLastName, "profile-alert-last-name", inputIndexes.lastName, validateName, 
        "Last ");
    }
    if (profileInputCountry.value !== "") {
        checkInput(profileInputCountry, "profile-alert-country", inputIndexes.country, validateString, "Country " );
    }
    if (profileInputState.value !== "") {
        checkInput(profileInputState, "profile-alert-state", inputIndexes.state, validateString, "State ");
    }
    if (profileInputCity.value !== "") {
        checkInput(profileInputCity, "profile-alert-city", inputIndexes.city, validateString, "City ");
    }
    if (profileInputStreet.value !== "") {
        checkInput(profileInputStreet, "profile-alert-street", inputIndexes.street, validateString, "Street ");   
    }
    if (profileInputHouseNumber.value !== "") {
        checkInput(profileInputHouseNumber, "profile-alert-house-number", inputIndexes.house_number, validateNumber, "House Number " );
    }
    if (profileInputZipCode.value !== "") {
        checkInput(profileInputZipCode, "profile-alert-zip-code", inputIndexes.zip_code, validateNumber, "Zip-Code " );
    }
    if (profileInputEmail.value !== "") {
        checkInput(profileInputEmail, "profile-alert-email", inputIndexes.email, validateEmail, "Email ");
    }
    if (profileInputPhone.value !== "") {
        checkInput(profileInputPhone, "profile-alert-phone", inputIndexes.phone, validatePhoneNumber, "Phone " );
    }
    if (profileInputPassword.value !== "") {
        checkInput(profileInputPassword, "profile-alert-password", inputIndexes.password, validatePassword, "Password ");
    }
    if (profileInputReenterPassword.value !== "") {
        checkPasswordToReEnterMatch();
    }
}

const checkIfCanEnableButton = () => {
    (btnProfileSubmit.disabled = !(
        validateInputArr(inputOkArr) 
        && reEnterPasswordOk));  
}

export {initializeProfile};