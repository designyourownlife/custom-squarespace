const animateSlides = (slideshowSelector) => {
  const slideshow = document.querySelector(slideshowSelector);
  slideshow.dispatchEvent(new Event("click"));
}

const gallery_reel_autoplay = (slideshowSelector, duration) => {
  const intervalID = setInterval(() => {
    animateSlides(slideshowSelector)
  }, duration); // change this value to change the speed
}

function animateHomepageGalleries() {
  gallery_reel_autoplay('.gallery-reel-control [aria-label="Next Slide"]',6500);
  gallery_reel_autoplay('.summary-carousel-pager.sqs-gallery-controls [aria-label="Next"]',5000);
}

document.addEventListener(
  'DOMContentLoaded', 
  animateHomepageGalleries()
);

