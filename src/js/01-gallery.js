// Add imports above this line
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryElements = document.querySelector('.gallery');

galleryElements.style.listStyle = 'none';

const createGalleryItem = (item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.original;

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = item.preview;
    image.alt = item.description;

    link.appendChild(image);
    listItem.appendChild(link);

    return listItem;
};

function renderGellery() {
    const renderGalleryHTML = galleryItems.map(item => createGalleryItem(item));
    galleryElements.append(...renderGalleryHTML);
};
renderGellery();
const lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionPosition: "bottom",
      captionDelay: 250,
    });
  