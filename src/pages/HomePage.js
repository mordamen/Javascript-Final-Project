import {initializePicturesGallery, updatePicturesGallery} from "../components/PicturesGallery.js";
import { initializePicturesList, updatePicturesList } from "../components/PicturesList.js";
import { initializePicturesCarousel, updatePicturesCarousel } from "../components/PicturesCarousel.js";
import {initPopup} from "../components/Popup.js";
import {showToast} from "../utils/toast.js";

import checkIfAdmin from "../utils/checkIfAdmin.js";
import checkIfConnected from "../utils/checkIfConnected.js";
import { initializeFavorites, updatePicturesFavorites } from "./FavoritePage.js";

let displayPicturesArr, storedPicturesArr;
let currentDisplayMode;
let isAdmin;
let isConnected;

let galleryBtn;
let listBtn;
let carouselBtn;

let galleryOfItems;
let listOfItems;
let carouselOfItems;

let homeDisplaySortAsc;
let homeDisplaySortDesc;
let homeSearchLine;

window.addEventListener("load", ()=>{
    displayPicturesArr = localStorage.getItem("pics")
    if(!displayPicturesArr){
        return;
    }
    displayPicturesArr = JSON.parse(displayPicturesArr);
    storedPicturesArr = [...displayPicturesArr];
    isAdmin = checkIfAdmin();
    isConnected = checkIfConnected();
    initializePicturesGallery(displayPicturesArr, isAdmin, isConnected, deletePicture, showPopup, showExtraDetailsPopup, addNewFav);
    initializePicturesList(displayPicturesArr, isAdmin, deletePicture, showPopup, showExtraDetailsPopup);
    initializePicturesCarousel(displayPicturesArr);
    initElements();
    initBtns();
    if(isConnected){
        initializeFavorites(displayPicturesArr);
    }
})

const initElements = () =>{
    galleryBtn = document.getElementById("home-gallery-btn");
    listBtn = document.getElementById("home-list-btn");
    carouselBtn = document.getElementById("home-carousel-btn");
    galleryOfItems = document.getElementById("pictures-gallery");
    listOfItems = document.getElementById("pictures-list");
    carouselOfItems = document.getElementById("pictures-carousel");

    homeDisplaySortAsc = document.getElementById("homeDisplaySortASC");
    homeDisplaySortDesc = document.getElementById("homeDisplaySortDESC");

    homeSearchLine = document.getElementById("homeDisplaySearch");
    currentDisplayMode = listOfItems; // choose who we want to display
    switchToAnotherDisplayMode(currentDisplayMode);
}

const initBtns = () => {
    
    galleryBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.style.marginLeft  = "0rem";
        switchToAnotherDisplayMode(galleryOfItems);
    });

    listBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.style.marginLeft  = "0.55rem";
        switchToAnotherDisplayMode(listOfItems);
    });

    carouselBtn.addEventListener("click", ()=>{
        homeSearchLine.classList.remove("d-none");
        homeSearchLine.classList.add("d-none");
        switchToAnotherDisplayMode(carouselOfItems);
    });

    homeDisplaySortAsc.addEventListener("click", () => {
        sortPictures();
    });

    homeDisplaySortDesc.addEventListener("click", () => {
        sortPictures(false);
    });

    homeSearchLine.addEventListener("input", (ev) => {
        let regex = new RegExp("^" + ev.target.value, "i");
        displayPicturesArr = storedPicturesArr.filter((pic) => {
            return regex.test(pic.alt);
        });
        updateDisplays();
    });

}

const sortPictures = (asc = true) => {
    if(asc){
        //sort from a to z
        displayPicturesArr.sort((a,b) => (a.additionalDetails.title).localeCompare(b.additionalDetails.title));
    }
    else{
        //sort from z to a
        displayPicturesArr.sort((a,b) => (b.additionalDetails.title).localeCompare(a.additionalDetails.title));
    }
    updateDisplays();
}

const switchToAnotherDisplayMode = (DisplayToSwitchTo) => {
    // hide what we are currently showing
    currentDisplayMode.classList.remove("d-block");
    currentDisplayMode.classList.add("d-none");
    // show what we want to display now
    DisplayToSwitchTo.classList.remove("d-none");
    DisplayToSwitchTo.classList.add("d-block");
    //this is what we are displaying now
    currentDisplayMode = DisplayToSwitchTo;
};

const updateDisplays = () => {
    updatePicturesGallery(displayPicturesArr);
    updatePicturesList(displayPicturesArr);
    updatePicturesCarousel(displayPicturesArr);
    updatePicturesFavorites(displayPicturesArr);
}

const saveToLocalStorage = (arrToSave) => {
    localStorage.setItem("pics", JSON.stringify(arrToSave));
}

const deletePicture = (id) => {
    storedPicturesArr = storedPicturesArr.filter((item) => item.id !== id);
    saveToLocalStorage(storedPicturesArr);

    displayPicturesArr = displayPicturesArr.filter((item) => item.id !== id);
    deleteFavPicIdFromUsers(id);
    updateDisplays();
}

const deleteFavPicIdFromUsers = (formerFavPicId) => {

    let users = localStorage.getItem("users");
    let token = localStorage.getItem("token");
    if (users && token) {
        users = JSON.parse(users);
        token = JSON.parse(token);
        //Iterate over all users
        for (let userIdx = 0; userIdx < users.length; userIdx++){
            //go over each users favorites and filter out the deleted pic
            users[userIdx].favorites = users[userIdx].favorites.filter((picId) => {
                return (+(picId) !== formerFavPicId)});
            //If the current user is the one logged on, update his token accordingly.
            if (users[userIdx].id === token.id){
                localStorage.setItem("token", JSON.stringify({id: users[userIdx].id, first_name:users[userIdx].first_name, 
                last_name: users[userIdx].last_name, email:users[userIdx].email, isAdmin: users[userIdx].isAdmin, favorites: users[userIdx].favorites}));
            }
        }
        //Update the users in local storage.
        localStorage.setItem("users", JSON.stringify(users));
    }
}

const showPopup = (id) => {
    let selectedPicture = displayPicturesArr.find((picture) => picture.id === (+id));
    if(!selectedPicture){
        return;
    }
    initPopup(selectedPicture, editPicture);
}

const showNewPopup = () => {
    initPopup(undefined, addNewPicture);
};

const showExtraDetailsPopup = (id) => {
    let clickedPicture = displayPicturesArr.find((picture) => picture.id === (+id));
    if(!clickedPicture){
        return;
    }
    initPopup(clickedPicture, undefined);
}

const addNewPicture = (newPicture) => {
    storedPicturesArr = [...storedPicturesArr, newPicture];
    
    localStorage.setItem("next_pic_id", (+newPicture.id + 1) + "");
    displayPicturesArr = [...storedPicturesArr];
    editPicture();
};

const editPicture = () => {
    saveToLocalStorage(storedPicturesArr);
    updateDisplays();
};

const addNewFav = (id) => {
    let userToken = localStorage.getItem("token");
    let users = localStorage.getItem("users");
    if (users && userToken) {
        userToken = JSON.parse(userToken);
        users = JSON.parse(users);
        //find the user on the basis of the token
        let currUser = users.find((user) => {
            return user.id === userToken.id
        });
        for (let currFavoriteIndex = 0; currFavoriteIndex < currUser.favorites.length; currFavoriteIndex++){
            if (currUser.favorites[currFavoriteIndex] == id){
                showToast("Cannot Favorite this", "Picture is already favorited", false);
                return;
            }
        }
        let updatedFavs = [...currUser.favorites, id];
        currUser.favorites = [...updatedFavs];
        let updatedUsers = users.map((user) => user.id === currUser.id ? currUser : user);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("token", JSON.stringify({id: currUser.id, first_name:currUser.first_name, 
            last_name: currUser.last_name, email:currUser.email, isAdmin: currUser.isAdmin, favorites: updatedFavs}));
        updatePicturesFavorites(displayPicturesArr);
        showToast("Success", "Picture is now favorited", true);
    }

}

export {showNewPopup};