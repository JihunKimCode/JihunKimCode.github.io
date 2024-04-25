/****************
 *  Index.html  *
 ****************/
document.addEventListener('DOMContentLoaded', function() {
    var animatedElement = document.querySelector('.category');

    if(animatedElement){
        // Add a class to trigger the animation
        animatedElement.classList.add('animate');
        setTimeout(function() {
            document.getElementById('redirect').style.display = 'block';
        }, 1500);
    }
});

/*****************
 *  Menu Button  *
 *****************/
// Toggle the menu button
document.getElementById("menuBtn").addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("menu-visible");
    if (menuBtn.innerHTML === "☰") {
        menuBtn.innerHTML = "✕";
        handleHeaderColorChange();
    } else {
        menuBtn.innerHTML = "☰";
        handleHeaderColorChange();
    }
});

// Close the menu when clicking outside of it
document.body.addEventListener("click", (event) => {
    const nav = document.querySelector("nav");
    const menuBtn = document.getElementById("menuBtn");

    if (nav.classList.contains("menu-visible") && !menuBtn.contains(event.target) && !nav.contains(event.target)) {
        nav.classList.remove("menu-visible");
        if (menuBtn.innerHTML === "☰") {
            menuBtn.innerHTML = "✕";
            handleHeaderColorChange();
        } else {
            menuBtn.innerHTML = "☰";
            handleHeaderColorChange();
        }
    }
});

/************************
 *  Head Color Changer  *
 ************************/
function handleHeaderColorChange() {
    const header = document.querySelector("header");
    const menuBtn = document.querySelector("#menuBtn");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Define the scroll threshold at which the color change occurs
    const scrollThreshold = 30;

    // Define colors for light mode and dark mode
    const lightModeColors = {
        bright: "#f9ecdb",
        dark: "#846d62",
        name: "#af9b8e"
    };

    const darkModeColors = {
        bright: "#2f261a",
        dark: "#221d16",
        name: "#af9b8e"
    };

    // Check if the body element has the "dark-mode" class
    const isDarkModeEnabled = document.body.classList.contains("dark-mode");

    // Calculate target colors based on scroll position and dark mode state
    const targetHeaderColor = (scrollTop > scrollThreshold || menuBtn.innerHTML === "✕")
        ? (isDarkModeEnabled ? darkModeColors.bright : lightModeColors.dark)
        : (isDarkModeEnabled ? darkModeColors.dark : lightModeColors.bright);

    const targetBtnBgColor = (scrollTop > scrollThreshold || menuBtn.innerHTML === "✕")
        ? (isDarkModeEnabled ? darkModeColors.bright : lightModeColors.dark)
        : (isDarkModeEnabled ? darkModeColors.dark : lightModeColors.bright);

    const targetBtnTextColor = (scrollTop > scrollThreshold || menuBtn.innerHTML === "✕")
        ? (isDarkModeEnabled ? darkModeColors.name : lightModeColors.bright)
        : (isDarkModeEnabled ? darkModeColors.name : lightModeColors.dark);

    const targetLinkColor = (scrollTop > scrollThreshold || menuBtn.innerHTML === "✕")
        ? (isDarkModeEnabled ? darkModeColors.name : lightModeColors.bright)
        : (isDarkModeEnabled ? darkModeColors.name : lightModeColors.dark);

    // Apply transitions and colors to elements
    header.style.transition = "background-color 0.3s ease, box-shadow 0.3s ease"; // Add box-shadow transition
    menuBtn.style.transition = "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease"; // Add box-shadow transition
    document.querySelectorAll("name a").forEach(link => {
        link.style.transition = "color 0.3s ease";
    });

    header.style.backgroundColor = targetHeaderColor;
    menuBtn.style.backgroundColor = targetBtnBgColor;
    menuBtn.style.color = targetBtnTextColor;

    document.querySelectorAll("name a").forEach(link => {
        link.style.color = targetLinkColor;
    });

    // Add shadow to the header when scrolling down
    if (scrollTop > scrollThreshold) {
        header.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
        header.style.boxShadow = "none"; // Remove the shadow when at the top
    }
}

// Call the function initially and add a scroll event listener
handleHeaderColorChange();
window.addEventListener("scroll", handleHeaderColorChange);

/***************
 *  Scroll up  *
 ***************/
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

const backToTopButton = document.getElementById("backToTopBtn");

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/***************
 *  Dark Mode  *
 ***************/
function darkmode() {
    // Toggle the dark mode class on the body
    document.body.classList.toggle("dark-mode");

    // Check if dark mode is enabled and store the state in localStorage
    var isDarkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkModeEnabled);

    // Call header color change function after toggling dark mode
    handleHeaderColorChange();
} 

// Function to set the initial dark mode state based on localStorage
function setInitialDarkMode() {
    var isDarkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (isDarkModeEnabled) {
        document.body.classList.add("dark-mode");
        handleHeaderColorChange();
    }
}

// Call setInitialDarkMode on page load to set the initial dark mode state
setInitialDarkMode(); 

/*************************
 *  Collapsible Content  *
 *************************/
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}

/**************************
 *  Arrange img and desc  *
 **************************/
document.addEventListener("DOMContentLoaded", function () {
    var imgDescElements = document.querySelectorAll('.imgdesc');

    for (var i = 0; i < imgDescElements.length; i++) {
        // Switch img and desc for every odd-numbered
        if (i % 2 === 1) {
            var imgElement = imgDescElements[i].querySelector('.img');
            var descElement = imgDescElements[i].querySelector('.desc');

            // Switch CSS for animated-section
            imgElement.classList.add('temp-img');
            descElement.classList.add('temp-desc');

            imgDescElements[i].insertBefore(descElement, imgElement);
        }
    }
});

/********************
 *  Copyright Year  *
 ********************/
// Copyright year setting
var currentYear = new Date().getFullYear();
document.getElementById("year").innerHTML = currentYear;


/***************************
 *  Interaction Animation  *
 ***************************/
// Function to handle the intersection observer callback
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the section is in view, add the "visible" class to both img and desc
            entry.target.querySelector('.img').classList.add('visible');
            entry.target.querySelector('.desc').classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

// Determine the threshold based on the device width
const isSmallScreen = window.innerWidth < 1024;

// Create an intersection observer
const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: isSmallScreen ? 0.3 : 0.5 // Threshold based on screen size
});

// Target all sections with the 'animated-section' class
const animatedSections = document.querySelectorAll('.animated-section');

// Start observing each section
animatedSections.forEach(section => {
    observer.observe(section);
});

/*****************
 *  Image Popup  *
 *****************/
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".imgdesc");
    const imgPopup = document.createElement("div");
    imgPopup.classList.add("img-popup");
    document.body.appendChild(imgPopup);

    sections.forEach((section) => {
        const images = section.querySelectorAll(".img img");
        images.forEach((image) => {
            image.addEventListener("click", (event) => {
                showImage(image.src, event.clientX, event.clientY);
            });
        });
    });

    imgPopup.addEventListener("click", (event) => {
        if (event.target === imgPopup) {
            hideImage();
        }
    });

    function showImage(src, clickX, clickY) {
        const imgElement = document.createElement("img");
        imgElement.src = src;

        const closeBtn = document.createElement("span");
        closeBtn.classList.add("close-btn");
        closeBtn.innerHTML = "&times;"; // X mark
        closeBtn.addEventListener("click", hideImage);

        imgPopup.innerHTML = "";
        imgPopup.appendChild(imgElement);
        imgPopup.appendChild(closeBtn);
        imgPopup.style.display = "flex";

        // Add a class to the header for darkened background
        document.querySelector("header").classList.add("header-dark-background");

        // Disable scroll on the main page
        document.body.style.overflow = "hidden";

        // Calculate the position of the click relative to the image
        const relativeX = clickX - imgElement.getBoundingClientRect().left;
        const relativeY = clickY - imgElement.getBoundingClientRect().top;

        // Adjust the transform origin based on the click position
        const transformOriginX = (relativeX / imgElement.width) * 100 + '%';
        const transformOriginY = (relativeY / imgElement.height) * 100 + '%';
        imgElement.style.transformOrigin = transformOriginX + ' ' + transformOriginY;
    }

    function hideImage() {
        imgPopup.style.display = "none";

        // Remove the darkened background class from the header
        document.querySelector("header").classList.remove("header-dark-background");

        // Enable scroll on the main page
        document.body.style.overflow = "auto";
    }
});

/******************
 *  Contact Info  *
 ******************/
const contact = document.getElementById('contact');
const contactButton = document.getElementById('contactButton');
const contactCloseButton = document.getElementById('contactCloseButton');

if (contactButton) {
    contactButton.addEventListener('click', () => {
        const currentDisplay = getComputedStyle(contact).getPropertyValue('display');
        contact.style.display = (currentDisplay === 'none') ? 'block' : 'none';
        if (currentDisplay === 'none') {
            contactButton.innerHTML = '<i class="fa-solid fa-address-book"></i> Hide Contact Infos';
        } else {
            contactButton.innerHTML = '<i class="fa-solid fa-address-book"></i> Show Contact Infos';
        }
    });
}

if (contactCloseButton) {
    contactCloseButton.addEventListener('click', () => {
        contact.style.display = 'none';
    });
}

/**********************
 *  Smooth Hyperlink  *
 **********************/
function scrollToSection(link) {
    event.preventDefault();
    var sectionId = link.getAttribute('href').substring(1); // Remove the '#' from the href
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}
