let picturesDisplayArr;
let favoritesDiv;
let usersFavoritedPictures;

const initializeFavorites = (displayPicturesArrParam) =>{
    favoritesDiv = document.getElementById("favorite-pictures-page-gallery");
    updatePicturesFavorites(displayPicturesArrParam);
}

const updatePicturesFavorites = (picturesArrFromHomePage) => {
    picturesDisplayArr = picturesArrFromHomePage; 
    createFavoriteGallery();
}

const createCard = (id, url, alt, credit, price) => {
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
            <h5 class="card-title">${alt}</h5>
            <p class="card-text">
            Credits: <b>${credit}</b>
            </p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
                <span>Price: <b>${price}$</b></span>
            </li>
        </ul>
        </div>
    </div>
    `;
};

const createFavoriteGallery = () => {
    let userToken = localStorage.getItem("token");
    userToken = JSON.parse(userToken);
    let usersFavoritesIds = userToken.favorites.map(Number);
    
    usersFavoritedPictures = picturesDisplayArr.filter((displayPic) => {
        return usersFavoritesIds.indexOf(displayPic.id) !== -1 ;
    });

    let buffer = "";

    for (let picture of usersFavoritedPictures){
        buffer += createCard(picture.id,picture.url,picture.alt,picture.credit,picture.price);
    }

    favoritesDiv.innerHTML = buffer;
}


export {initializeFavorites, updatePicturesFavorites};