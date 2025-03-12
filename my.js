// Form
(function () {
"use strict";
/*
* Form Validation
*/
// Fetch all the forms we want to apply custom validation styles to
const forms = document.querySelectorAll(".needs-validation");
const result = document.getElementById("result");
// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
form.addEventListener(
"submit",
function (event) {
if (!form.checkValidity()) {
event.preventDefault();
event.stopPropagation();
form.querySelectorAll(":invalid")[0].focus();
} else {
/*
* Form Submission using fetch()
*/
const formData = new FormData(form);
event.preventDefault();
event.stopPropagation();
const object = {};
formData.forEach((value, key) => {
object[key] = value;
});
const json = JSON.stringify(object);
result.innerHTML = "Please wait...";
fetch("https://api.web3forms.com/submit", {
method: "POST",
headers: {
"Content-Type": "application/json",
Accept: "application/json"
},
body: json
})
.then(async (response) => {
let json = await response.json();
if (response.status == 200) {
result.innerHTML = json.message;
result.classList.remove("text-gray-500");
result.classList.add("text-green-500");
} else {
console.log(response);
result.innerHTML = json.message;
result.classList.remove("text-gray-500");
result.classList.add("text-red-500");
}
})
.catch((error) => {
console.log(error);
result.innerHTML = "Something went wrong!";
})
.then(function () {
form.reset();
form.classList.remove("was-validated");
setTimeout(() => {
result.style.display = "none";
}, 5000);
});
}
form.classList.add("was-validated");
},
false
);
});
})();
// Gallery Initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize each gallery
            initGallery('main-gallery');
            initGallery('downstairs-gallery');
            initGallery('outdoor-gallery');

            // Function to initialize a gallery by ID
            function initGallery(galleryId) {
                const galleryContainer = document.getElementById(galleryId);
                
                // Only proceed if the gallery exists
                if (!galleryContainer) return;
                
                const modal = galleryContainer.querySelector('.modal');
                const modalImg = modal.querySelector('.modal-content');
                const close = modal.querySelector('.close');
                const prev = modal.querySelector('.prev');
                const next = modal.querySelector('.next');
                const dotsContainer = modal.querySelector('.dots-container');
                const galleryItems = galleryContainer.querySelectorAll('.gallery-item img');
                const navFeedbackLeft = modal.querySelector('.nav-feedback.left');
                const navFeedbackRight = modal.querySelector('.nav-feedback.right');
                let currentImageIndex = 0;
                
                // Create navigation dots
                dotsContainer.innerHTML = ''; // Clear existing dots
                galleryItems.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    dot.onclick = () => showImage(index);
                    dotsContainer.appendChild(dot);
                });
                
                const dots = dotsContainer.querySelectorAll('.dot');
                
                function showImage(index) {
                    currentImageIndex = index;
                    modalImg.src = galleryItems[index].src;
                    // Update dots
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                }
                
                function showNavFeedback(direction) {
                    const feedback = direction === 'left' ? navFeedbackLeft : navFeedbackRight;
                    feedback.classList.add('show');
                    setTimeout(() => feedback.classList.remove('show'), 200);
                }
                
                // Create click event for each gallery item
                galleryItems.forEach((img, index) => {
                    img.onclick = function() {
                        // Close any other open modals
                        document.querySelectorAll('.modal').forEach(m => {
                            m.style.display = "none";
                        });
                        
                        modal.style.display = "block";
                        showImage(index);
                    }
                });
                
                // Navigation event handlers
                prev.onclick = function() {
                    showNavFeedback('left');
                    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                    showImage(currentImageIndex);
                }
                
                next.onclick = function() {
                    showNavFeedback('right');
                    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                    showImage(currentImageIndex);
                }
                
                close.onclick = function() {
                    modal.style.display = "none";
                }
                
                // Close when clicking outside the image
                modal.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                });
            }
            
            // Keyboard navigation - only works for the currently visible modal
            document.addEventListener('keydown', function(e) {
                const visibleModal = document.querySelector('.modal[style*="display: block"]');
                if (visibleModal) {
                    const gallerySection = visibleModal.closest('.gallery-section');
                    const prev = visibleModal.querySelector('.prev');
                    const next = visibleModal.querySelector('.next');
                    const close = visibleModal.querySelector('.close');
                    
                    if (e.key === "ArrowLeft" && prev) prev.click();
                    if (e.key === "ArrowRight" && next) next.click();
                    if (e.key === "Escape" && close) close.click();
                }
            });
        });
//Testimonial
const testCarousel = document.querySelector('.test-carousel');
const testSlides = document.querySelectorAll('.test-slide');
const testPrevButton = document.querySelector('.test-prev');
const testNextButton = document.querySelector('.test-next');
const testDotsContainer = document.querySelector('.test-dots-container');
let testCurrentSlide = 0;
const testTotalSlides = testSlides.length;
testSlides.forEach((_, index) => {
const testDot = document.createElement('div');
testDot.classList.add('test-dot');
if (index === 0) testDot.classList.add('test-active');
testDot.addEventListener('click', () => {
testCurrentSlide = index;
updateTestCarousel();
resetTestTimer();
});
testDotsContainer.appendChild(testDot);
});
const testDots = document.querySelectorAll('.test-dot');
function updateTestCarousel() {
testCarousel.style.transform = `translateX(-${testCurrentSlide * 100}%)`;
testSlides.forEach((testSlide, index) => {
testSlide.classList.toggle('test-active', index === testCurrentSlide);
});
testDots.forEach((testDot, index) => {
testDot.classList.toggle('test-active', index === testCurrentSlide);
});
}
function nextTestSlide() {
testCurrentSlide = (testCurrentSlide + 1) % testTotalSlides;
updateTestCarousel();
}
function prevTestSlide() {
testCurrentSlide = (testCurrentSlide - 1 + testTotalSlides) % testTotalSlides;
updateTestCarousel();
}
let isTestTransitioning = false;
function handleTestNavigation(direction) {
if (isTestTransitioning) return;
isTestTransitioning = true;
direction === 'next' ? nextTestSlide() : prevTestSlide();
resetTestTimer();
setTimeout(() => {
isTestTransitioning = false;
}, 1200);
}
testNextButton.addEventListener('click', () => handleTestNavigation('next'));
testPrevButton.addEventListener('click', () => handleTestNavigation('prev'));
let testSlideTimer = setInterval(nextTestSlide, 10000);
function resetTestTimer() {
clearInterval(testSlideTimer);
testSlideTimer = setInterval(nextTestSlide, 10000);
}
let testTouchStartX = 0;
let testTouchEndX = 0;
testCarousel.addEventListener('touchstart', e => {
testTouchStartX = e.changedTouches[0].screenX;
});
testCarousel.addEventListener('touchend', e => {
testTouchEndX = e.changedTouches[0].screenX;
if (testTouchStartX - testTouchEndX > 50) {
handleTestNavigation('next');
} else if (testTouchEndX - testTouchStartX > 50) {
handleTestNavigation('prev');
}
});
//show more show less
function myFunction() {
var dots = document.getElementById("dots");
var moreText = document.getElementById("more");
var btnText = document.getElementById("myBtn");
if (dots.style.display === "none") {
dots.style.display = "inline";
btnText.innerHTML = "Show more";
moreText.style.display = "none";
} else {
dots.style.display = "none";
btnText.innerHTML = "Show less";
moreText.style.display = "inline";
}
}
function myFunction2() {
var dots = document.getElementById("dots2");
var moreText = document.getElementById("more2");
var btnText = document.getElementById("myBtn2");
if (dots.style.display === "none") {
dots.style.display = "inline";
btnText.innerHTML = "Show more";
moreText.style.display = "none";
} else {
dots.style.display = "none";
btnText.innerHTML = "Show less";
moreText.style.display = "inline";
}
}
function myFunction3() {
var dots = document.getElementById("dots3");
var moreText = document.getElementById("more3");
var btnText = document.getElementById("myBtn3");
if (dots.style.display === "none") {
dots.style.display = "inline";
btnText.innerHTML = "Show more";
moreText.style.display = "none";
} else {
dots.style.display = "none";
btnText.innerHTML = "Show less";
moreText.style.display = "inline";
}
}
function myFunction4() {
var dots = document.getElementById("dots4");
var moreText = document.getElementById("more4");
var btnText = document.getElementById("myBtn4");
if (dots.style.display === "none") {
dots.style.display = "inline";
btnText.innerHTML = "Show more activities";
moreText.style.display = "none";
} else {
dots.style.display = "none";
btnText.innerHTML = "Show less activities";
moreText.style.display = "inline";
}
}
function myFunction5() {
var dots = document.getElementById("dots5");
var moreText = document.getElementById("more5");
var btnText = document.getElementById("myBtn5");
if (dots.style.display === "none") {
dots.style.display = "inline";
btnText.innerHTML = "Show more activities";
moreText.style.display = "none";
} else {
dots.style.display = "none";
btnText.innerHTML = "Show less activities";
moreText.style.display = "inline";
}
}
//smooth scrolling
$(document).ready(function(){
$('a[href^="#"]').on('click',function (e) {
e.preventDefault();
var target = this.hash;
var $target = $(target);
$('html, body').stop().animate({
'scrollTop': $target.offset().top
}, 900, 'swing', function () {
window.location.hash = target;
});
});
});
// arrow apear after scrolling
$(function() {
$('#atestbox').hide();
$(window).scroll(function() {
var scroll = $(window).scrollTop();
if (scroll >=900) {

$('#atestbox').fadeIn();
} else {

$('#atestbox').fadeOut();
}
});
})

//mobile menu icon
$(document).ready(function() {
  $('#nav-icon3').click(function() {
    $(this).toggleClass('open');
    $('#demo').slideToggle('slow');
  });
});