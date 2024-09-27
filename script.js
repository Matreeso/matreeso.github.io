// Gallery 1 Images
const gallery1Images = [
    { src: '/assets/ezgif-4-3acfab0be7.gif', width: '400px', height: '300px' },
    { src: '/assets/IMG_7998.JPG', width: '600px', height: '400px' },
    { src: '/assets/IMG_8007.JPG', width: '500px', height: '350px' }
];

// Gallery 2 Images
const gallery2Images = [
    { src: '/assets/flyCarGalleryImage.png', width: '600px', height: '400px' },
    { src: '/assets/f1Screenshot.png', width: '600px', height: '400px' },
    { src: '/assets/milestoneHome.png', width: '600px', height: '400px' }
];

let currentGalleryIndex = 0; // 0 for Gallery 1, 1 for Gallery 2
let currentImageIndex = 0;
const galleryImage = document.getElementById('gallery-image');
const galleryContainer = document.getElementById('gallery-container');
const galleryImage2 = document.getElementById('gallery-image-2');
const galleryContainer2 = document.getElementById('gallery-container-2');

// Function to change the image in the current gallery
function changeImage(direction, galleryNumber) {
    const images = galleryNumber === 1 ? gallery1Images : gallery2Images;
    const currentImage = galleryNumber === 1 ? galleryImage : galleryImage2;
    const currentContainer = galleryNumber === 1 ? galleryContainer : galleryContainer2;

    currentImage.classList.add('hidden');

    setTimeout(function() {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        currentImage.src = images[currentImageIndex].src;
        currentContainer.style.width = images[currentImageIndex].width;
        currentContainer.style.height = images[currentImageIndex].height;

        currentImage.classList.remove('hidden');
    }, 500);
}

// Assuming the section class is the same for all sections
const sections = document.querySelectorAll('.section');

// Show or hide the arrow based on scroll position
function toggleArrowVisibility() {
    const currentSectionIndex = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom > 0; // Check if section is in view
    });

    // Hide the arrow if on the last section
    if (currentSectionIndex === sections.length - 1) {
        document.querySelector('.scroll-arrow').style.display = 'none';
    } else {
        document.querySelector('.scroll-arrow').style.display = 'block';
    }
}

function scrollToNextSection() {
    const currentSectionIndex = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom > 0; // Check if section is in view
    });

    // Scroll to the next section if there is one
    if (currentSectionIndex < sections.length - 1) {
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
}

// Attach scroll event listener
window.addEventListener('scroll', toggleArrowVisibility);

// Set initial visibility of scroll arrow
toggleArrowVisibility();

// Function to initialize gallery size
function initializeGallerySize() {
    // Set initial container size to match the first image of Gallery 1
    galleryContainer.style.width = gallery1Images[0].width;
    galleryContainer.style.height = gallery1Images[0].height;

    // Set initial container size to match the first image of Gallery 2
    galleryContainer2.style.width = gallery2Images[0].width;
    galleryContainer2.style.height = gallery2Images[0].height;
}

// Call initializeGallerySize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGallerySize);

// Add click event for the arrows for the first gallery
document.querySelectorAll('.next, .prev').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const isGallery1 = button.parentElement.querySelector('#gallery-image') !== null;
        changeImage(button.classList.contains('next') ? 1 : -1, isGallery1 ? 1 : 2);
    });
});

// Add click event for the scroll arrow
document.querySelector('.scroll-arrow').addEventListener('click', scrollToNextSection);

// Call this function when you want to switch to Gallery 2
// Example: You can create a button to switch between galleries or handle it through some logic in the app
