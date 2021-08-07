const imageContainer = document.getElementById("image-container");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 30;
const apiKey = "zBJn1Dh5LTq0YTsppbKyS_ZdL9yzeeohuospYKhY9s8";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if all images loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// display Photos to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
        // console.log(photoArray)
    } catch (error) {
        // Catch Error Here
    }
}

// Check if scrolling near bottom of page
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false
        getPhotos()
    }
})

getPhotos();
