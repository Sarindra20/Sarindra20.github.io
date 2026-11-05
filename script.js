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

// ==========================================
// 4. PHOTO AGRANDIE
// ==========================================
const photoBtn = document.getElementById("photo-profil");
const photoModal = document.getElementById("photo-modal");
const photoClose = document.querySelector(".photo-close");

if (photoBtn && photoModal && photoClose) {
  photoBtn.addEventListener("click", () => photoModal.showModal());
  photoClose.addEventListener("click", () => photoModal.close());

  // un clic sur le fond sombre ferme aussi la fenêtre
  photoModal.addEventListener("click", (e) => {
    if (e.target === photoModal) photoModal.close();
  });
}
// ==========================================
// 5. BOUTONS PROJET / ALTERNANCE / STAGE
// ==========================================
const EMAIL = "kanto3heriniaina@gmail.com";

const CHOIX = {
  projet: {
    couleur: "#58a6ff",
    titre: "Un projet à me confier ?",
    intro: "Décrivez votre besoin en quelques lignes.",
    sujet: "Proposition de projet",
    champs: [
      { id: "nom", label: "Votre nom", type: "text", requis: true },
      { id: "projet", label: "Nom ou thème du projet", type: "text", requis: true },
      { id: "desc", label: "Description du besoin", type: "textarea", requis: true },
      { id: "delai", label: "Délai souhaité", type: "text" },
    ],
  },
  alternance: {
    couleur: "#a371f7",
    titre: "Une offre d'alternance ?",
    intro: "Présentez le poste et l'entreprise.",
    sujet: "Proposition d'alternance",
    champs: [
      { id: "nom", label: "Votre nom", type: "text", requis: true },
      { id: "entreprise", label: "Entreprise", type: "text", requis: true },
      { id: "missions", label: "Missions proposées", type: "textarea", requis: true },
      { id: "rythme", label: "Rythme (ex. 3 semaines / 1 semaine)", type: "text" },
      { id: "duree", label: "Durée du contrat", type: "text" },
    ],
  },
  stage: {
    couleur: "#3fb950",
    titre: "Une proposition de stage ?",
    intro: "Présentez le sujet et les dates.",
    sujet: "Proposition de stage",
    champs: [
      { id: "nom", label: "Votre nom", type: "text", requis: true },
      { id: "entreprise", label: "Entreprise", type: "text", requis: true },
      { id: "sujet", label: "Sujet ou missions du stage", type: "textarea", requis: true },
      { id: "dates", label: "Dates ou durée", type: "text" },
    ],
  },
};

const modal = document.getElementById("contact-modal");
const modalForm = document.getElementById("modal-form");
const modalChamps = document.getElementById("modal-champs");
let choixActuel = null;

function ouvrirModal(type) {
  const c = CHOIX[type];
  if (!c) return;
  choixActuel = type;

  document.getElementById("modal-titre").textContent = c.titre;
  document.getElementById("modal-intro").textContent = c.intro;
  modal.querySelector(".modal-contenu").style.setProperty("--couleur-modal", c.couleur);

  modalChamps.replaceChildren();
  c.champs.forEach((ch) => {
    const bloc = document.createElement("div");
    bloc.className = "champ";

    const label = document.createElement("label");
    label.htmlFor = "champ-" + ch.id;
    label.textContent = ch.label + (ch.requis ? " *" : "");

    const saisie = document.createElement(ch.type === "textarea" ? "textarea" : "input");
    saisie.id = "champ-" + ch.id;
    saisie.name = ch.id;
    if (ch.type !== "textarea") saisie.type = "text";
    if (ch.requis) saisie.required = true;

    bloc.append(label, saisie);
    modalChamps.append(bloc);
  });

  modal.showModal();
}

document.querySelectorAll(".btn-choix").forEach((btn) => {
  btn.addEventListener("click", () => ouvrirModal(btn.dataset.type));
});

modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const c = CHOIX[choixActuel];

  const lignes = c.champs.map((ch) => {
    const valeur = modalForm.elements[ch.id].value.trim() || "(non précisé)";
    return ch.label + " : " + valeur;
  });
  const corps = "Bonjour Kanto,\n\n" + lignes.join("\n") + "\n\nCordialement.";

  window.location.href =
    "mailto:" + EMAIL +
    "?subject=" + encodeURIComponent(c.sujet) +
    "&body=" + encodeURIComponent(corps);

  modal.close();
});