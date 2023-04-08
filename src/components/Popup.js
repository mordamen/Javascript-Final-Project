import getNextPictureId from "../utils/getNextPictureId.js";
import Picture from "../models/Picture.js"
import AdditionalDetails from "../models/AdditionalDetails.js";
import validateImgUrl from "../validation/validateImgUrl.js";
import validateDate from "../validation/validateDate.js";
import validateTitle from "../validation/validateTitle.js";
import validateInputArr from "../validation/validateInputArr.js"

let editPicturesHeader;
let editPicturesPopupImgDisplay;
let editPicturesPopupUrl;
let editPicturesPopupAlt;
let editPicturesPopupCredit;
let editPicturesPopupPrice;
let editPicturesPopupCreatedAt;
let editPicturesPopupDescription;
let editPicturesPopupTitle;
let editPicturesPopupSubtitle;
let editPicturesPopup;
let editPicturesPrimaryDetailsCard;
let editPicturesCancelBtn;
let editPicturesSaveBtn;
let editPicturesSaveBtnDiv;
let selectedPicture, editPicture;
let editPicturesPopupCreatedAtLabel;
let editPicturesPopupTitleLabel;
let inputOkArr = [false, false, false];
const inputIndexes = {
	url: 0,
    createdAt: 1,
    title: 2
}

const EMPTY_URL_PIC_PATH = "../../public/assets/images/empty_image_preview.png"
const EDIT_PICTURE_FORM_HEADER = `EDIT PICTURE FORM
                                <button type="button" class="btn btn-danger" id="editPicturesPopupCancelBtn">
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>`;
const CREATE_PICTURE_FORM_HEADER = `CREATE PICTURE FORM
                                    <button type="button" class="btn btn-danger" id="editPicturesPopupCancelBtn">
                                        <i class="bi bi-x-circle-fill"></i>
                                    </button>`;

const VIEW_PICTURE_FORM_HEADER = `
                                Picture Extra Details
                                <button type="button" class="btn btn-danger" id="editPicturesPopupCancelBtn">
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>
                                `;

const initPopup = (selectedPictureFromHomePage, editPictureFromHomePage) => {
    resetOkArr();
    //Just viewing the picture
    if(!editPictureFromHomePage){
        editPicturesHeader.innerHTML = VIEW_PICTURE_FORM_HEADER;
        selectedPicture = selectedPictureFromHomePage;
    }
    //If editing existing picture
    else if(selectedPictureFromHomePage){
        editPicturesHeader.innerHTML = EDIT_PICTURE_FORM_HEADER;
        selectedPicture = selectedPictureFromHomePage;
    }
    //Otherwise we're creating a new picture
    else{
        editPicturesHeader.innerHTML = CREATE_PICTURE_FORM_HEADER;
        selectedPicture = new Picture(getNextPictureId(),EMPTY_URL_PIC_PATH, "", "", "", new AdditionalDetails("", "", "", ""));
    }
    initHeader();
    
    editPicture = editPictureFromHomePage;
    //If editing an existing picture, present url 
    if(selectedPicture.url != EMPTY_URL_PIC_PATH){
        editPicturesPopupUrl.value = selectedPicture.url;
    }
    //otherwise, show it as empty
    else{
        editPicturesPopupUrl.value = "";
    }
    editPicturesPopupAlt.value = selectedPicture.alt;
    editPicturesPopupCredit.value = selectedPicture.credit;
    editPicturesPopupPrice.value = selectedPicture.price;
    //Additional details added
    editPicturesPopupCreatedAt.value = selectedPicture.additionalDetails.createdAt;
    editPicturesPopupDescription.value = selectedPicture.additionalDetails.description;
    editPicturesPopupTitle.value = selectedPicture.additionalDetails.title;
    editPicturesPopupSubtitle.value = selectedPicture.additionalDetails.subtitle;
    //
    editPicturesPopupImgDisplay.src = selectedPicture.url;
    showPopup();
    //If we're not editing an existing picture or creating a new one
    if(!editPictureFromHomePage){
        hidePrimaryDetailsAndSaveButton();
        setSecondaryDetailsReadOnlyAttribute();
    }
    else{
        showPrimaryDetailsAndSaveButton();
        setSecondaryDetailsReadOnlyAttribute(false);
    }
    //this line was added because viewing an existing pic
    //then trying to add a new picture resulted in 
    //an empty form with clickable save button. This fixes it.
    editPicturesSaveBtn.disabled = true;
    
    firstLoadChecks(); 
};

const initElems = () => {
    editPicturesHeader = document.getElementById("popupHeader");
    editPicturesPopupImgDisplay = document.getElementById("editPicturesPopupImgDisplay");
    editPicturesPopupUrl = document.getElementById("editPicturesPopupUrl");
    editPicturesPopupAlt = document.getElementById("editPicturesPopupAlt");
    editPicturesPopupCredit = document.getElementById("editPicturesPopupCredit");
    editPicturesPopupPrice = document.getElementById("editPicturesPopupPrice");
    //AdditionalDetails Added
    editPicturesPopupCreatedAt = document.getElementById("editPicturesPopupCreatedAt");
    editPicturesPopupDescription = document.getElementById("editPicturesPopupDescription");
    editPicturesPopupTitle = document.getElementById("editPicturesPopupTitle");
    editPicturesPopupSubtitle = document.getElementById("editPicturesPopupSubtitle");
    //Getting the actual popup
    editPicturesPopup = document.getElementById("editPicturesPopup");
    //Getting the primary details NOT to be shown on view mode
    editPicturesPrimaryDetailsCard = document.getElementById("primaryPictureDetailsCard");
    editPicturesSaveBtnDiv = document.getElementById("editPicturesSaveBtnDiv");

    //CreatedAtLabel
    editPicturesPopupCreatedAtLabel = document.getElementById("editPicturesPopupCreatedAtLabel");

    editPicturesPopupTitleLabel = document.getElementById("editPicturesPopupTitleLabel");

    editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
    editPicturesSaveBtn = document.getElementById("editPicturesPopupSaveBtn"); 
}

const showPopup = () => {
    editPicturesPopup.classList.remove("d-none");
}

const hidePopup = () => {
    editPicturesPopup.classList.add("d-none");
}

const hidePrimaryDetailsAndSaveButton = () => {
    editPicturesPrimaryDetailsCard.classList.add("d-none");
    editPicturesSaveBtnDiv.classList.add("d-none");
}

const setSecondaryDetailsReadOnlyAttribute = (ReadOnly = true) => {
    editPicturesPopupCreatedAt.readOnly = ReadOnly;
    editPicturesPopupDescription.readOnly = ReadOnly;
    editPicturesPopupTitle.readOnly = ReadOnly;
    editPicturesPopupSubtitle.readOnly = ReadOnly;
}

const showPrimaryDetailsAndSaveButton = () => {
    editPicturesPrimaryDetailsCard.classList.remove("d-none");
    editPicturesSaveBtnDiv.classList.remove("d-none");
}

const isImage = (src) => {
    // Create new offscreen image to test
    let imageNew = new Image();
    
    imageNew.src = src;

    // Check if its a real image 
    if ((imageNew.width > 0) && (imageNew.height > 0) ){
        return true;
    } else {
        return false;
    }
}

window.addEventListener("load", () => {
    initElems();
    initBtns();
    initEventListeners();
    firstLoadChecks();    
})

const initBtns = () => {
    editPicturesSaveBtn.addEventListener("click", () => {
        selectedPicture.url = editPicturesPopupUrl.value;
        selectedPicture.alt = editPicturesPopupAlt.value;
        selectedPicture.credit = editPicturesPopupCredit.value;
        selectedPicture.price = editPicturesPopupPrice.value;
        //additional details added
        selectedPicture.additionalDetails.createdAt = editPicturesPopupCreatedAt.value;
        selectedPicture.additionalDetails.description = editPicturesPopupDescription.value;
        selectedPicture.additionalDetails.title = editPicturesPopupTitle.value;
        selectedPicture.additionalDetails.subtitle = editPicturesPopupSubtitle.value;
        //
        editPicture(selectedPicture);
        hidePopup();
    });

    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
}

const initEventListeners = () => {
    editPicturesPopupUrl.addEventListener("input", () => {
        urlValidationLogic();
    });

    editPicturesPopupCreatedAt.addEventListener("input", () => {
        createdAtValidationLogic();
    })
    editPicturesPopupTitle.addEventListener("input", () => {
        titleValidationLogic();
    })
}

const titleValidationLogic = () => {
    let validityCheck = validateTitle(editPicturesPopupTitle.value);
    if(validityCheck.length == 0)
    {
        editPicturesPopupTitle.classList.remove("is-invalid");
        editPicturesPopupTitleLabel.innerText = "title";
        inputOkArr[inputIndexes.title] = true;
    }
    else{
        editPicturesPopupTitle.classList.add("is-invalid");
        editPicturesPopupTitleLabel.innerText = "must be string";
        inputOkArr[inputIndexes.title] = false;
    }
    checkIfCanEnableButton();
}

const urlValidationLogic = () =>{
    let URLRegexValidityCheck = validateImgUrl(editPicturesPopupUrl.value);
    let URLImageValidityCheck = isImage(editPicturesPopupUrl.value);
    if(URLRegexValidityCheck.length == 0 && URLImageValidityCheck){
        editPicturesPopupImgDisplay.src = editPicturesPopupUrl.value;
        editPicturesPopupUrl.classList.remove("is-invalid");
        inputOkArr[inputIndexes.url] = true;
    }
    else{
        editPicturesPopupImgDisplay.src = "../../public/assets/images/invalid_url.png";
        editPicturesPopupUrl.classList.add("is-invalid");
        inputOkArr[inputIndexes.url] = false;
    }
    checkIfCanEnableButton();
}

const createdAtValidationLogic = () =>{
    let validityCheck = validateDate(editPicturesPopupCreatedAt.value);
    if(validityCheck.length == 0)
    {
        editPicturesPopupCreatedAt.classList.remove("is-invalid");
        editPicturesPopupCreatedAtLabel.innerText = "created at";
        inputOkArr[inputIndexes.createdAt] = true;
    }
    else{
        editPicturesPopupCreatedAt.classList.add("is-invalid");
        editPicturesPopupCreatedAtLabel.innerText = "must be dd/mm/yyyy";
        inputOkArr[inputIndexes.createdAt] = false;
    }
    checkIfCanEnableButton();
}

const checkIfCanEnableButton = () => {
    (editPicturesSaveBtn.disabled = !(validateInputArr(inputOkArr)));
}
const initHeader = () => {
    editPicturesCancelBtn = document.getElementById("editPicturesPopupCancelBtn");
    editPicturesCancelBtn.addEventListener("click", () => {
        hidePopup();
    })
}

const firstLoadChecks = ()=>{
    if (editPicturesPopupUrl.value !== "") {
        urlValidationLogic();
    }
    if (editPicturesPopupCreatedAt.value !== "") {
        createdAtValidationLogic();
    }
    if (editPicturesPopupTitle.value !== "") {
        titleValidationLogic();
    }
}

const resetOkArr = () =>{
    inputOkArr[inputIndexes.url] = false;
    inputOkArr[inputIndexes.createdAt] = false;
    inputOkArr[inputIndexes.title] = false;
}

export {initPopup};