// ==========================================
// 1. EFFET MACHINE À ÉCRIRE (TYPING EFFECT)
// ==========================================
const textElement = document.getElementById("typing-text");
const phrase = "Étudiante en Informatique – Administration Système & Réseau";
let index = 0;

function typeWriter() {
  if (index < phrase.length) {
    textElement.textContent += phrase.charAt(index);
    index++;
    setTimeout(typeWriter, 50); // Vitesse de frappe en millisecondes
  }
}

// Lancement de l'effet au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  if (textElement) {
    setTimeout(typeWriter, 400); // Petit délai avant de démarrer
  }
});


// ==========================================
// 2. APPARITION DES SECTIONS AU DÉFILEMENT (SCROLL REVEAL)
// ==========================================
window.addEventListener("scroll", revealSections);

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    const elementVisible = 100; // Distance à partir de laquelle l'animation se déclenche

    if (elementTop < windowHeight - elementVisible) {
      section.classList.add("active");
    }
  });
}

// Déclenchement immédiat au cas où des sections sont déjà visibles à l'ouverture
revealSections();


// ==========================================
// 3. SURBRILLANCE ACTIVE DU MENU LATÉRAL AU SCROLL
// ==========================================
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }

      // en bas de page, on force le dernier lien
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
    current = "contact";
  }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});