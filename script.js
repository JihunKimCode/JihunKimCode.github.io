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
 *  Fade In/Out  *
 *****************/
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";
    let opacity = 0;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        opacity = Math.min(1, elapsedTime / 500); // 500ms animation duration
        element.style.opacity = opacity;

        if (opacity < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function fadeOut(element) {
    element.style.opacity = 1;
    let opacity = 1;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        opacity = Math.max(0, 1 - elapsedTime / 500); // 500ms animation duration
        element.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = "none";
        }
    }

    requestAnimationFrame(animate);
}

/*****************
 *  Menu Button  *
 *****************/
// Toggle the menu button
document.getElementById("menuBtn").addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("menu-visible");
});

const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", function() {
    if (menuBtn.innerHTML === "☰") {
        menuBtn.innerHTML = "✕";
    } else {
        menuBtn.innerHTML = "☰";
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
    const targetHeaderColor = scrollTop > scrollThreshold
        ? (isDarkModeEnabled ? darkModeColors.bright : lightModeColors.dark)
        : (isDarkModeEnabled ? darkModeColors.dark : lightModeColors.bright);

    const targetBtnBgColor = scrollTop > scrollThreshold
        ? (isDarkModeEnabled ? darkModeColors.bright : lightModeColors.dark)
        : (isDarkModeEnabled ? darkModeColors.dark : lightModeColors.bright);

    const targetBtnTextColor = scrollTop > scrollThreshold
        ? (isDarkModeEnabled ? darkModeColors.name : lightModeColors.bright)
        : (isDarkModeEnabled ? darkModeColors.name : lightModeColors.dark);

    const targetLinkColor = scrollTop > scrollThreshold
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

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
