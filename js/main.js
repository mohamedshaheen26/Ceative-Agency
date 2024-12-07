// Check If There Is In Local Storage Color Option
if (localStorage.getItem("color-option")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active class To Element
    if (element.dataset.color === localStorage.getItem("color-option")) {
      element.classList.add("active");
    }
  });
}

// Close Settings Box By Clicking Outside
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("fa-gear") &&
    !e.target.classList.contains("settings-box")
  ) {
    document.querySelector(".settings-box").classList.remove("open");
    document.querySelector(".fa-gear").classList.remove("fa-spin");
  }
});

// Stop Propagation On Settings Box
document.querySelector(".settings-box").onclick = function (e) {
  e.stopPropagation();
};

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors Option
const colors = document.querySelectorAll(".colors-list li");

colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color In Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

// Sticky Nav when Scroll
window.onscroll = function () {
  scroll();
};

function scroll() {
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    document.querySelector("header").classList.add("sticky");
  } else {
    document.querySelector("header").classList.remove("sticky");
  }
}

// Random Background Option
let option_bg = true;
let bg_interval;

// Check If there Is In Local Storage Random Option
if (localStorage.getItem("random-option")) {
  // Remove Class From All Spans
  document.querySelectorAll(".random-bg span").forEach((span) => {
    span.classList.remove("active");
  });

  if (localStorage.getItem("random-option") === "true") {
    option_bg = true;
    document.querySelector(".random-bg .yes").classList.add("active");
  } else {
    option_bg = false;
    document.querySelector(".random-bg .no").classList.add("active");
  }
}

// Switch Random Background Option
let randomBg = document.querySelectorAll(".random-bg span");

randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    // Check the Selected Value
    if (e.target.dataset.bg === "yes") {
      option_bg = true;

      // Call Randomize Function To Random Background
      randomizeBg();

      localStorage.setItem("random-option", true);
    } else {
      option_bg = false;

      clearInterval(bg_interval);

      localStorage.setItem("random-option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Add All imgs In Arr
let imgsArr = ["1.avif", "2.avif", "3.avif", "4.avif", "5.avif"];

function randomizeBg() {
  if (option_bg === true) {
    bg_interval = setInterval(() => {
      // Get Random Number
      let randomNum = Math.floor(Math.random() * imgsArr.length);

      // Change Background Image Url
      landingPage.style.backgroundImage = `url(imgs/${imgsArr[randomNum]})`;
    }, 5000);
  }
}

randomizeBg();

// Fill Progress Bar on scroll
window.addEventListener("scroll", function () {
  const skillsSection = document.querySelector(".our-skills");
  const spans = document.querySelectorAll(".our-skills .progress span");
  const sectionPosition = skillsSection.getBoundingClientRect().top;
  const screenPosition = this.innerHeight / 4;

  if (sectionPosition < screenPosition) {
    spans.forEach((span) => {
      span.style.opacity = 1;
      span.style.width = `${span.dataset.width}%`;
    });
  } else {
    spans.forEach((span) => {
      span.style.opacity = 0;
      span.style.width = "0";
    });
  }
});

// Creare Popup With Image
let ourGallery = document.querySelectorAll(".our-gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "overlay-popup";

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let heading = document.createElement("h3");

      heading.textContent = img.alt;

      popupBox.appendChild(heading);
    }

    let imgSrc = document.createElement("img");
    imgSrc.src = img.src;

    popupBox.appendChild(imgSrc);

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";

    popupBox.appendChild(closeBtn);

    overlay.appendChild(popupBox);

    document.body.appendChild(overlay);

    document.body.classList.add("stop-scrolling");
  });
});

// Close Popup With button
document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    document.querySelector(".overlay-popup").remove();
    document.body.classList.remove("stop-scrolling");
  }
});

// Close Popup When Clicking Outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay-popup")) {
    document.querySelector(".overlay-popup").remove();
    document.body.classList.remove("stop-scrolling");
  }
});

// Create A Function To Make Scrolling Smooth To Go To The Section
function scrollToSection(elements) {
  // Add click event to each element for smooth scrolling
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all elements before adding to the clicked one
      elements.forEach((el) => {
        el.classList.remove("active__link");
        el.classList.remove("active__div");
      });

      // Add specific active class based on the element type
      if (e.target.tagName === "DIV") {
        e.target.classList.add("active__div");
      } else if (e.target.tagName === "A") {
        e.target.classList.add("active__link");
      }

      // Smooth scroll to the target section
      const targetSection = document.querySelector(e.target.dataset.section);
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Check if the section is in the viewport and update active class
  function checkActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight;

    // Remove active class from all elements when at the top of the page
    if (window.scrollY === 0) {
      elements.forEach((el) => {
        el.classList.remove("active__link");
        el.classList.remove("active__div");
      });
      return;
    }

    // Loop through each element and check if its target section is in view
    elements.forEach((el) => {
      const targetSection = document.querySelector(el.dataset.section);
      if (targetSection) {
        const sectionTop = targetSection.offsetTop;
        const sectionBottom = sectionTop + targetSection.offsetHeight;

        if (
          scrollPosition >= sectionTop + targetSection.offsetHeight * 0.6 &&
          scrollPosition <= sectionBottom
        ) {
          elements.forEach((el) => {
            el.classList.remove("active__link");
            el.classList.remove("active__div");
          });

          if (el.tagName === "DIV") {
            el.classList.add("active__div");
          } else if (el.tagName === "A") {
            el.classList.add("active__link");
          }
        }
      }
    });
  }

  // Listen for scroll events
  window.addEventListener("scroll", checkActiveSection);

  // Call the function on page load to set the active state initially
  checkActiveSection();
}

// Select All Links And Call Function (scrollToSection)
const allLinks = document.querySelectorAll(".links a");

scrollToSection(allLinks);

// Select All Bullets And Call Function (scrollToSection)
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

scrollToSection(allBullets);

// Switch Random Bullets Option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

if (localStorage.getItem("bullets-option")) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (localStorage.getItem("bullets-option") === "yes") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "yes");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "no");
    }
    handleActive(e);
  });
});

// Handle Active state
function handleActive(event) {
  // Remove Active Class From All Childrens
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class To Current Element
  event.target.classList.add("active");
}

// reset Options
document.querySelector(".settings-box .reset").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});

// Stop Propagation On Settings Menu Links
links.onclick = (e) => {
  e.stopPropagation();
};
