import checkIfAdmin from "../utils/checkIfAdmin.js";
import checkIfConnected from "../utils/checkIfConnected.js";

let isAdmin;
let showPopup;
let isConnected;

let navAddNewPictureLink;

const navBeforeLogin = document.getElementById("navBeforeLogin");
const navAfterLogin = document.getElementById("navAfterLogin");
const navSeeFavoriteItemsLink = document.getElementById("nav-favorite-pictures-link")

//initialize navbar on the basis if user is connected/admin
const initializeNavbar = (showPopupFromApp) => {
    isAdmin = checkIfAdmin();
    isConnected = checkIfConnected();

    if (isConnected) {
        navBeforeLogin.classList.add("d-none");
        navAfterLogin.classList.remove("d-none");
        navSeeFavoriteItemsLink.classList.remove("d-none");
    }
    showPopup = showPopupFromApp;
    /* nav */
    navAddNewPictureLink = document.getElementById("nav-add-new-picture-link");
    
    if (!isAdmin) {
        navAddNewPictureLink.classList.add("d-none");
    }
    navAddNewPictureLink.addEventListener("click", () => {
        showPopup();
    });
    navSeeFavoriteItemsLink.addEventListener("click", ()=>{

    });
};

export default initializeNavbar;