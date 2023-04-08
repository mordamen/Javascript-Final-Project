import PAGES from "../models/pageModel.js";

/* Out Pages */
const HOMEPAGELINK = document.getElementById(PAGES.HOME);
const ABOUTUSPAGELINK = document.getElementById(PAGES.ABOUT);
const CONTACTUSPAGELINK = document.getElementById(PAGES.CONTACT);
const SHOPPAGELINK = document.getElementById(PAGES.SHOP);
const LOGINTUSPAGELINK = document.getElementById(PAGES.LOGIN);
const REGISTERUSPAGELINK = document.getElementById(PAGES.REGISTER);
const PROFILEPAGELINK = document.getElementById(PAGES.PROFILE);
const PAGE404PAGELINK = document.getElementById(PAGES.PAGE404);
const FAVORITEPAGELINK = document.getElementById(PAGES.FAVORITES);

function handlePageChange(pageToDisplay) {
  /*Hide all pages */
  HOMEPAGELINK.classList.remove("d-flex");
  ABOUTUSPAGELINK.classList.remove("d-flex");
  CONTACTUSPAGELINK.classList.remove("d-flex");
  LOGINTUSPAGELINK.classList.remove("d-flex");
  REGISTERUSPAGELINK.classList.remove("d-flex");
  PROFILEPAGELINK.classList.remove("d-flex");
  PAGE404PAGELINK.classList.remove("d-flex");
  FAVORITEPAGELINK.classList.remove("d-flex");
  SHOPPAGELINK.classList.remove("d-flex");

  HOMEPAGELINK.classList.add("d-none");
  ABOUTUSPAGELINK.classList.add("d-none");
  CONTACTUSPAGELINK.classList.add("d-none");
  LOGINTUSPAGELINK.classList.add("d-none");
  REGISTERUSPAGELINK.classList.add("d-none");
  PROFILEPAGELINK.classList.add("d-none");
  PAGE404PAGELINK.classList.add("d-none");
  FAVORITEPAGELINK.classList.add("d-none");
  SHOPPAGELINK.classList.add("d-none");

  switch (pageToDisplay) {
    case PAGES.HOME:
      HOMEPAGELINK.classList.remove("d-none");
      HOMEPAGELINK.classList.add("d-flex");
      break;
    case PAGES.ABOUT:
      ABOUTUSPAGELINK.classList.remove("d-none");
      ABOUTUSPAGELINK.classList.add("d-flex");
      break;
    case PAGES.CONTACT:
      CONTACTUSPAGELINK.classList.remove("d-none");
      CONTACTUSPAGELINK.classList.add("d-flex");
      break;
    case PAGES.SHOP:
      SHOPPAGELINK.classList.remove("d-none");
      SHOPPAGELINK.classList.add("d-flex");
      break;
    case PAGES.LOGIN:
      LOGINTUSPAGELINK.classList.remove("d-none");
      LOGINTUSPAGELINK.classList.add("d-flex");
      break;
    case PAGES.REGISTER:
      REGISTERUSPAGELINK.classList.remove("d-none");
      REGISTERUSPAGELINK.classList.add("d-flex");
      break;
    case PAGES.PROFILE:
      PROFILEPAGELINK.classList.remove("d-none");
      PROFILEPAGELINK.classList.add("d-flex");
      break;
    case PAGES.FAVORITES:
      FAVORITEPAGELINK.classList.remove("d-none");
      FAVORITEPAGELINK.classList.add("d-flex");
      break;
    default:
      PAGE404PAGELINK.classList.remove("d-none");
      PAGE404PAGELINK.classList.add("d-flex");
      break;
  }
}

export { handlePageChange };
