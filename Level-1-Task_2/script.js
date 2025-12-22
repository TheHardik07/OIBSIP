const reveals = document.querySelectorAll(".reveal");
const section = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

function handleScrollEffects() {
  const windowHeight = window.innerHeight;
  const revealPoint = 120;
  let currentSection = "";

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });

  section.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("load", handleScrollEffects);
