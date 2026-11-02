const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [];
let currentIndex = 0;

// Category filters
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach((item) => {
            if (category === "all" || item.dataset.category === category) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });

        updateVisibleItems();
    });
});

// Get currently visible gallery images
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter((item) => {
        return !item.classList.contains("hidden");
    });
}

// Open lightbox
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        showImage(currentIndex);
        lightbox.classList.add("show");
    });
});

// Display image in lightbox
function showImage(index) {
    const item = visibleItems[index];
    const image = item.querySelector("img");
    const title = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = title.textContent;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

closeBtn.addEventListener("click", closeLightbox);

// Previous image
prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage(currentIndex);
});

// Next image
nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);
});

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }
});

// Initialize gallery
updateVisibleItems();