let isAnimating = false;
// ==========================
// |                        |
// |        Section         |
// |                        |
// ==========================
// Function to hide all sections except the one with the given ID
function hideSectionsExcept(sectionId) {
    if (isAnimating) return; // Exit if an animation is already in progress
    isAnimating = true;

    const sections = document.querySelectorAll(".content-section");

    // Wait for all fade-out animations to complete before showing the target section
    Promise.all(
        Array.from(sections).map((section) => {
            if (section.id === sectionId) {
                return fadeIn(section);
            } else if (section.style.display !== "none") {
                return fadeOut(section);
            }
        })
    ).then(() => {
        sections.forEach((section) => {
            if (section.id !== sectionId) {
                section.style.display = "none";
            }
        });
        const targetSection = document.getElementById(sectionId);
        targetSection.style.display = "block";
        isAnimating = false;
    });
}

// Function to show the selected section with fade-in and fade-out animations
function showSection(sectionId) {
    window.scrollTo(0, 0);
    hideSectionsExcept(sectionId);
}

function showCurrentSectionFromHash() {
    const currentHash = window.location.hash;
    const sectionId = currentHash ? currentHash.substring(1) : "home";

    // Remove the 'active' class from all menu links
    document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add the 'active' class to the menu link corresponding to the current section
    const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }

    showSection(sectionId);
}

// Function to handle menu link clicks
function handleMenuLinkClick(event) {
    event.preventDefault();
    const sectionId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(sectionId);
    targetSection.scrollIntoView({ behavior: "smooth" });

    // Update the URL without reloading the page
    window.history.pushState(null, null, "#" + sectionId);

    // Show the corresponding section with animation
    showSection(sectionId);

    // Add the 'active' class to the clicked menu link
    document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active");
    });
    this.classList.add("active");
}

// Close the menu when a menu item is clicked (for better user experience)
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
        const nav = document.querySelector("nav");
        nav.classList.remove("menu-visible");
    });
});

// Show the current section from the URL hash on initial load
showCurrentSectionFromHash();

// Update the content when the URL hash changes (e.g., when switching to another tab)
window.addEventListener("hashchange", showCurrentSectionFromHash);

// ==========================
// |                        |
// |      Fade In/Out       |
// |                        |
// ==========================
// Helper function for fade-in animation
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

// Helper function for fade-out animation
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

// ==========================
// |                        |
// |      Menu Button       |
// |                        |
// ==========================
// Toggle the menu button
document.getElementById("menuBtn").addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("show");
});


// Toggle the menu button
document.getElementById("menuBtn").addEventListener("click", () => {
    const nav = document.querySelector("nav");
    const overlay = document.querySelector(".overlay");

    nav.classList.toggle("menu-visible");
    overlay.classList.toggle("overlay-visible");
});

// ==========================
// |                        |
// |   Head Color Changer   |
// |                        |
// ==========================
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
        bright: "#5c4c41",
        dark: "#2f261a",
        name: "#af9b8e"
    };

    // Assume you're using the matchMedia approach
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDarkModeEnabled = darkModeMediaQuery.matches;

    if (scrollTop > scrollThreshold) {
        header.style.backgroundColor = isDarkModeEnabled
            ? darkModeColors.bright
            : lightModeColors.dark;
        menuBtn.style.backgroundColor = isDarkModeEnabled
            ? darkModeColors.bright
            : lightModeColors.dark;
        menuBtn.style.color = isDarkModeEnabled
            ? darkModeColors.name
            : lightModeColors.bright;

        document.querySelectorAll("name a").forEach((link) => {
            link.style.color = isDarkModeEnabled
                ? darkModeColors.name
                : lightModeColors.bright;
        });
    } else {
        header.style.backgroundColor = isDarkModeEnabled
            ? darkModeColors.dark
            : lightModeColors.bright;
        menuBtn.style.backgroundColor = isDarkModeEnabled
            ? darkModeColors.dark
            : lightModeColors.bright;
        menuBtn.style.color = isDarkModeEnabled
            ? darkModeColors.name
            : lightModeColors.dark;

        document.querySelectorAll("name a").forEach((link) => {
            link.style.color = isDarkModeEnabled
                ? darkModeColors.name
                : lightModeColors.dark;
        });
    }
}

// Call the function initially and add a scroll event listener
handleHeaderColorChange();
window.addEventListener("scroll", handleHeaderColorChange);

// ==========================
// |                        |
// |   Scroll up methods    |
// |                        |
// ==========================


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
