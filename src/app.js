import PAGES from "./models/pageModel.js";
import { handlePageChange } from "./routes/router.js";
import "./initialData/initialData.js";
import "./pages/RegisterPage.js";
import "./pages/LoginPage.js";
import "./pages/HomePage.js";
import "./pages/ContactPage.js";
import { showNewPopup } from "./pages/HomePage.js";
import initializeNavbar from "./components/Navbar.js";
import checkIfConnected from "./utils/checkIfConnected.js";

const navHomeLink = document.getElementById("nav-home-link");
const navAboutUsLink = document.getElementById("nav-aboutus-link");
const navShopLink = document.getElementById("nav-shop-link");
const navContactUsLink = document.getElementById("nav-contactus-link");
const navLoginUsLink = document.getElementById("nav-login-link");
const navRegisterUsLink = document.getElementById("nav-register-link");
const navEditProfilePage = document.getElementById("nav-edit-profile-page");
const navLogout = document.getElementById("nav-logout");
const navFavorites = document.getElementById("nav-favorite-pictures-link");

window.addEventListener("load", () => {
  initializeNavbar(showNewPopup);
  if (checkIfConnected()) {
    let user = localStorage.getItem("token");
    user = JSON.parse(user);
    navEditProfilePage.innerText = user.first_name + " " + user.last_name;
  }
});

navHomeLink.addEventListener("click", function () {
  handlePageChange(PAGES.HOME);
});
navAboutUsLink.addEventListener("click", function () {
  handlePageChange(PAGES.ABOUT);
});
navShopLink.addEventListener("click", function () {
  handlePageChange(PAGES.SHOP);
});
navContactUsLink.addEventListener("click", function () {
  handlePageChange(PAGES.CONTACT);
});
navLoginUsLink.addEventListener("click", function () {
  handlePageChange(PAGES.LOGIN);
});
navRegisterUsLink.addEventListener("click", function () {
  handlePageChange(PAGES.REGISTER);
});

navEditProfilePage.addEventListener("click", () => {
  handlePageChange(PAGES.PROFILE);
});

navLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});

navFavorites.addEventListener("click", () => {
  handlePageChange(PAGES.FAVORITES);
});
