import { clearEventListeners } from "../utils/clearEventListener.js";
import { createBtnEventListener } from "../utils/createBtnEventListener.js";
import getIdFromClick from "../utils/getIdFromClick.js";

let galleryDiv;
let isAdmin;
let isConnected;
let picturesDisplayArr;
let deletePicture;
let showPopup;
let showExtraDetailsPopup;
let addNewFav;

const initializePicturesGallery = (
  picturesArrFromHomePage,
  isAdminParam,
  isConnectedParam,
  deletePictureFromHomePage,
  showPopupFromHomePage,
  showExtraDetailsPopupFromHomePage,
  addNewFavFromHomePage
) => {
  galleryDiv = document.getElementById("home-page-pictures-gallery");
  isAdmin = isAdminParam;
  isConnected = isConnectedParam;
  deletePicture = deletePictureFromHomePage;
  updatePicturesGallery(picturesArrFromHomePage);
  showPopup = showPopupFromHomePage;
  showExtraDetailsPopup = showExtraDetailsPopupFromHomePage;
  addNewFav = addNewFavFromHomePage;
};

const updatePicturesGallery = (picturesArrFromHomePage) => {
  picturesDisplayArr = picturesArrFromHomePage;
  createGallery();
};

const createCard = (id, url, alt, title, credit, price) => {
  const adminBtns = `<button type="button" class="btn btn-warning" id="PictureGalleryEditButton-${id}">
                                <i class="bi bi-pen-fill"></i> Edit
                            </button>
                            <button type="button" class="btn btn-danger" 
                            id="PictureGalleryDeleteButton-${id}">
                                <i class="bi bi-x-circle-fill"></i> Delete
                            </button>`;
  const purchaseBtn = `<button type="button" class="btn btn-success" 
                            id="PictureGalleryFavoriteButton-${id}">
                                <i class="fa-solid fa-star"></i>
                        </button>`;
  return `
    <div class="col">
        <div class="card">
        <img
            src="${url}"
            class="card-img-top"
            alt="${alt}"
            id="PictureGalleryThumbnail-${id}"
        />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
            Credits: <b>${credit}</b>
            </p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
                <span>Price: <b>${price}$</b></span>
            
                ${isConnected ? purchaseBtn : ""}
            </li>
        </ul>
        <div class="card-body d-flex justify-content-center">
            ${isAdmin ? adminBtns : ""}
        </div>
        </div>
    </div>
    `;
};

const handleFavBtnClick = (ev) => {
  addNewFav(getIdFromClick(ev));
};

const handleDeleteBtnClick = (ev) => {
  deletePicture(+getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const handlePicClick = (ev) => {
  showExtraDetailsPopup(getIdFromClick(ev));
};

const createGallery = () => {
  let buffer = "";

  clearEventListeners("PictureGalleryDeleteButton", handleDeleteBtnClick);
  clearEventListeners("PictureGalleryEditButton", handleEditBtnClick);
  clearEventListeners("PictureGalleryThumbnail", handlePicClick);
  clearEventListeners("PictureGalleryFavoriteButton", handleFavBtnClick);

  for (let picture of picturesDisplayArr) {
    buffer += createCard(
      picture.id,
      picture.url,
      picture.alt,
      picture.additionalDetails.title,
      picture.credit,
      picture.price
    );
  }

  galleryDiv.innerHTML = buffer;

  createBtnEventListener("PictureGalleryDeleteButton", handleDeleteBtnClick);
  createBtnEventListener("PictureGalleryEditButton", handleEditBtnClick);
  createBtnEventListener("PictureGalleryThumbnail", handlePicClick);
  createBtnEventListener("PictureGalleryFavoriteButton", handleFavBtnClick);
};

export { initializePicturesGallery, updatePicturesGallery };
