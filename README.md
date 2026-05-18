# PETYPLANT 🌱

> Système d'arrosage automatique intelligent basé sur l'IoT — *Smart Plant Watering System*

[![Made with Arduino](https://img.shields.io/badge/Made%20with-Arduino-00979D?logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![HTML5](https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3%20%2F%20JS-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![EMSI Tanger](https://img.shields.io/badge/École-EMSI%20Tanger-blue)](https://www.emsi.ma/)

---

## 📖 Description

**PETYPLANT** est un système d'arrosage automatique intelligent développé dans le cadre d'un projet de fin d'année à l'**EMSI Tanger**. Il combine l'Internet des Objets (IoT), des capteurs environnementaux et une interface web moderne pour offrir une solution complète de gestion des plantes.

Le système surveille en temps réel :
- 💧 L'humidité du sol et le niveau d'eau
- 🌡️ La température ambiante
- ☀️ L'ensoleillement
- 🤖 L'état de santé des plantes (IA intégrée)

---

## 🗂️ Architecture du Projet

```
PETYPLANT/
├── README.md                       ← Documentation principale
├── .gitignore                      ← Fichiers ignorés par Git
├── English-HAPPLANT.pptx           ← Présentation pitch du projet
│
├── projet arduino/                 ← Code source matériel & IoT
│   └── Arose-AGE-dmain/            ← Première maquette et schémas IoT
│
└── website/                        ← Application web premium complète
    ├── index.html                  ← Page d'accueil (landing page)
    ├── products.html               ← Page produits & tarifs
    ├── dashboard.html              ← Tableau de bord IoT avec simulation live
    └── assets/
        ├── css/
        │   ├── styles.css          ← Design system & styles globaux
        │   └── dashboard.css       ← Styles spécifiques dashboard
        ├── js/
        │   ├── main.js             ← Logique landing page
        │   ├── dashboard.js        ← Logique tableau de bord IoT
        │   └── scrollreveal.min.js ← Animations interactives au scroll
        ├── img/
        │   ├── *.png / *.jpg       ← Images et illustrations
        │   └── plants/             ← Catalogue d'images de plantes actives
        └── video/
            └── hero.mp4            ← Vidéo de présentation premium de l'arrosage
```

---

## 🚀 Fonctionnalités

### 🌐 Site Web (Landing Page)
- Design premium **dark mode** avec effets glassmorphism
- Navigation responsive avec menu hamburger mobile
- Compteurs animés et particules CSS
- Accordéon FAQ interactif
- Formulaire de contact
- Animations ScrollReveal
- Agent IA conversationnel intégré (Chatbase)

### 📊 Tableau de Bord IoT
- **Sidebar navigable** avec 4 sections (Vue d'ensemble, Inventaire, Capteurs, Alertes)
- **KPI Cards** : température, humidité, niveau d'eau, total plantes
- **Jauge de santé globale** animée en temps réel
- **Simulation live** des 5 capteurs (actualisation toutes les 4 secondes)
- **Inventaire des plantes** avec flip cards 3D, recherche et pagination
- **Classements** : meilleurs utilisateurs & meilleures plantes
- **Panel d'alertes** : historique des événements système
- **Articles** : conseils d'entretien avec liens externes

### 🛒 Page Produits
- Trois packs tarifaires : **Basic (599 MAD)**, **Standard (1 299 MAD)**, **Premium (2 199 MAD)**
- Showcase des composants matériels
- Design comparatif des fonctionnalités

---

## 🛠️ Stack Technologique

| Couche       | Technologie                                    |
|--------------|------------------------------------------------|
| **Frontend** | HTML5, CSS3 (Vanilla), JavaScript (ES6+)       |
| **Design**   | Design System custom, Glassmorphism, CSS Grid  |
| **Fonts**    | Inter + Space Grotesk (Google Fonts)           |
| **Icons**    | Remix Icon 3.5                                 |
| **Animation**| ScrollReveal.js, CSS Keyframes                 |
| **IA**       | Chatbase.co (agent conversationnel)            |
| **Hardware** | Arduino, DHT22, LDR, HC-SR04, SEN0161         |

---

## 🖥️ Installation & Utilisation

### Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge, Safari)
- Aucun serveur ou installation requise pour la version web

### Lancement

```bash
# Cloner le repository
git clone https://github.com/votre-username/PETYPLANT.git

# Naviguer dans le dossier website
cd PETYPLANT/website

# Ouvrir directement dans le navigateur
# → Double-cliquer sur index.html
# OU utiliser un serveur local (recommandé pour la vidéo)
npx serve .
```

### Pages disponibles
| Page             | Chemin                      | Description                      |
|------------------|-----------------------------|----------------------------------|
| Accueil          | `website/index.html`        | Landing page principale          |
| Produits         | `website/products.html`     | Catalogue et tarification        |
| Dashboard        | `website/dashboard.html`    | Tableau de bord IoT              |

---

## 👥 Équipe

Projet réalisé par des étudiants de l'**École Marocaine des Sciences de l'Ingénieur (EMSI) — Tanger**

| Prénom & Nom         | Rôle               |
|----------------------|--------------------|
| Salaheddine Manaa    | Développeur Web    |
| Saad Tmimi           | Développeur IoT    |
| Yassine Jannane      | Intégration HW/SW  |
| Yassir Amrani        | Design & UI        |
| Zaid Harboul         | Documentation      |

---

## 📞 Contact

- 📍 Angle Rue Omar Ibn Abdelaziz & Rue Sejelmassa, 90060 Tanger, Maroc
- 📞 +212-539-940308
- 📧 informations@emsi.ma
- 🌐 [EMSI Tanger](https://www.emsi.ma/)

---

## 📄 Licence

Ce projet est distribué sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<p align="center">
  Réalisé avec ♥ par l'équipe PETYPLANT — EMSI Tanger 2024
</p>
