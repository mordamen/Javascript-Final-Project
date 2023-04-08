let picturesDisplayArr;
let carouselDiv;
let carouselNextBtn;

const initializePicturesCarousel = (picturesArrFromHomePage) => {
    carouselDiv = document.getElementById("gallery-carousel-inner");
    updatePicturesCarousel(picturesArrFromHomePage);
    initBtns();
}

const updatePicturesCarousel = (picturesArrFromHomePage) => {
    picturesDisplayArr = picturesArrFromHomePage; 
    createCarousel();
}

const createCarouselItem = (id, src, alt, credit) => {
    return `<div class="carousel-item" id="carousel-item-${id}">
                <img src="${src}" class="d-block carousel-center-img" alt="${alt}">
                <span class="d-flex justify-content-center">Photographed by: ${credit}
                </span>
            </div>
    `
}

const createCarousel = () => {
    let buffer = "";
    for (let picture of picturesDisplayArr){
        buffer += createCarouselItem(picture.id, picture.url, picture.alt, picture.credit);
    }
    carouselDiv.innerHTML = buffer;
    document.querySelector(`.carousel-item`).classList.add("active");
}

const initBtns = () => {
    carouselNextBtn = document.getElementById("next-carousel-btn");
    setInterval(() => {carouselNextBtn.click();}, 3000);
}


export {initializePicturesCarousel, updatePicturesCarousel};