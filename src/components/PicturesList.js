import { clearEventListeners } from "../utils/clearEventListener.js";
import { createBtnEventListener } from "../utils/createBtnEventListener.js";
import getIdFromClick from "../utils/getIdFromClick.js";

let listPicturesUnorderedList;
let picturesDisplayArr;
let isAdmin;
let deletePicture;
let showPopup;
let showExtraDetailsPopup;

const initializePicturesList = (picturesArrFromHomePage, isAdminParam,deletePictureFromHomePage, showPopupFromHomePage, showExtraDetailsPopupFromHomePage) => {
    isAdmin = isAdminParam;   
    listPicturesUnorderedList = document.getElementById("home-page-pictures-list");
    deletePicture = deletePictureFromHomePage;
    updatePicturesList(picturesArrFromHomePage);
    showPopup = showPopupFromHomePage;
    showExtraDetailsPopup = showExtraDetailsPopupFromHomePage;
}

const updatePicturesList = (picturesArrFromHomePage) => {
    picturesDisplayArr = picturesArrFromHomePage;
    createList();
}

const handleDeleteBtnClick = (ev) => {
    deletePicture(+(getIdFromClick(ev)));
};

const handleEditBtnClick = (ev) => {
    showPopup(getIdFromClick(ev));
}

const handlePicClick = (ev) => {
    showExtraDetailsPopup(getIdFromClick(ev));
}

const createListItem = (id, url, alt, title, credit) => {
    const adminBtns = `<div class="col-md-1 desktopAdminBtns">
                            <button class="btn btn-warning" id="PictureListEditButton-${id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                        </div>
                        <div class="col-md-1 desktopAdminBtns">
                            <button class="btn btn-danger" id="PictureListDeleteButton-${id}">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                        <div class="col-md-2 mobileAdminBtns d-none">
                            <button class="btn btn-warning" id="PictureListEditButtonMobile-${id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-danger" id="PictureListDeleteButtonMobile-${id}">
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                        `;
    return `<li class="list-group-item ms-2">
                <div class="row">
                    <div class="col-md-1 picture-list-text">${id}</div>
                    <div class="col-md-1 picture-list-img">
                        <img src="${url}" alt="${alt}" class="img-fluid" id="PictureListThumbnail-${id}">
                    </div>
                    <div class="col-md-4 picture-list-text">
                        <div class="card-body">
                            <div class="card-text PicTextContent">
                                ${url}
                            </div>
                        </div>

                    </div>
                    <div class="col-md-2 picture-list-text">${title}</div>
                    <div class="col-md-2 picture-list-text">${credit}</div>
                    ${isAdmin ? adminBtns : ""}
                </div>
            </li>
    `;
}

const createList = () => {
    const ADMIN_HEADLINES_ACTIONS = `
        <div class="col-md-1">Edit</div>
        <div class="col-md-1">Delete</div>
    `;
    const LIST_HEADLINES = `
    <li class="list-group-item ms-2 picture-list-header">
        <div class="row">
            <div class="col-md-1">No.</div>
            <div class="col-md-1">
                Image
            </div>
            <div class="col-md-4">
                Pic
            </div>
            <div class="col-md-2">Title</div>
            <div class="col-md-2">Credit</div>
            ${isAdmin ? ADMIN_HEADLINES_ACTIONS : ""}
        </div>
    </li>`;

    clearEventListeners("PictureListDeleteButton", handleDeleteBtnClick);
    clearEventListeners("PictureListEditButton", handleEditBtnClick);
    clearEventListeners("PictureListThumbnail", handlePicClick);

    //mobile
    clearEventListeners("PictureListDeleteButtonMobile", handleDeleteBtnClick);
    clearEventListeners("PictureListEditButtonMobile", handleEditBtnClick);

    let buffer = "" + LIST_HEADLINES;

    for (let picture of picturesDisplayArr){
        buffer += createListItem(picture.id,picture.url,picture.alt,picture.additionalDetails.title,picture.credit);
    }

    listPicturesUnorderedList.innerHTML = buffer;

    createBtnEventListener("PictureListDeleteButton", handleDeleteBtnClick);
    createBtnEventListener("PictureListEditButton", handleEditBtnClick);
    createBtnEventListener("PictureListThumbnail", handlePicClick);
    //mobile
    createBtnEventListener("PictureListDeleteButtonMobile", handleDeleteBtnClick);
    createBtnEventListener("PictureListEditButtonMobile", handleEditBtnClick);

}

export {initializePicturesList, updatePicturesList};
