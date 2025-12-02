import LimboPreview from '@/assets/projects/suitlimbo/1.png';
import LimboPreview2 from '@/assets/projects/suitlimbo/2.png';
import LimboPreview3 from '@/assets/projects/suitlimbo/3.png';
import LimboPreview4 from '@/assets/projects/suitlimbo/4.png';
import LimboPreview5 from '@/assets/projects/suitlimbo/5.png';
import LimboPreview6 from '@/assets/projects/suitlimbo/6.png';
import LimboPreview7 from '@/assets/projects/suitlimbo/7.png';
import LimboPreview8 from '@/assets/projects/suitlimbo/8.png';
import LimboPreview9 from '@/assets/projects/suitlimbo/9.png';
import LimboPreview10 from '@/assets/projects/suitlimbo/9.png';

import PlayTestPreview from '@/assets/projects/playtest/1.png';
import PlayTestPreview2 from '@/assets/projects/playtest/2.png';

import TylerPreview from '@/assets/projects/MiniSite/img/chromakopia - Copie.jpg';
import LeafletPreview from '@/assets/projects/Manuel/leaflet.png';
import SneakersPreview from '@/assets/projects/sneakers/sneakers.png';

export default [
    {
        title: "Playtest",
        slug: "playtest",
        subtitle: '"PlayTest" | Site de notation de jeux vidéo',
        preview: PlayTestPreview,
        image: PlayTestPreview,
        media: [PlayTestPreview, PlayTestPreview2],
        description: "<p>Élaboration d'un site avec sa base de données permettant à ses utilisateurs de se connecter, de noter des jeux sur 5, de laisser des commentaires et d'interagir en communauté de joueurs. Calcul de la note moyenne des jeux en temps réel selon celles des utilisateurs.</p>",
        tech_stack: "PHP, MariaDB, HTML & CSS, JavaScript",
        link: "",
    },
    {
        title: "SuitLimbo",
        slug: "SuitLimbo | Site de vente de costumes",
        subtitle: '"SuitLimbo" | Gestion de contenus et déploiement AWS',
        preview: LimboPreview2,
        image: LimboPreview2,
        media: [LimboPreview, LimboPreview2, LimboPreview3, LimboPreview4, LimboPreview5, LimboPreview6, LimboPreview7, LimboPreview8, LimboPreview9, LimboPreview10],
        description: "<p>Site web avec une solution de gestion de contenus Wordpress avec l'extension Elementor.</p>",
        tech_stack: "Wordpress / Elementor / Amazon Web Service",
        link: ""
    },
    {
        title: "Leaflet.js Man",
        slug: "Leaflet.js Man",
        subtitle: "Manuel d'utilisation du plugin Leaflet.js",
        preview: LeafletPreview,
        image: LeafletPreview,
        description: "<p>Création d'un site web servant de manuel d'utilisation pour intégrer le plugin Leaflet.js à un site web.</p>",
        tech_stack: "JavaScript, HTML & CSS",
        link: "https://basileferi.fr/src/assets/projects/Manuel/man.html"
    },
    {
        title: "Tyler, The Creator",
        slug: "Tyler, The Creator",
        subtitle: 'Conception d’un site vitrine pour un artiste',
        preview: TylerPreview,
        image: TylerPreview,
        description: "<p>Promotion d'un artiste via un mini-site web intégrant un formulaire de contact et des animations CSS. </p>",
        tech_stack: "HTML & CSS",
        link: "https://basileferi.fr/src/assets/projects/MiniSite/html_mini_site/index.html",
    },

    {
        title: "Boutique Sneakers",
        slug: "Boutique Sneakers",
        subtitle: 'Conception d’un site pour une boutique de sneakers fictive',
        preview: SneakersPreview,
        image: SneakersPreview,
        description: "<p>Ce site charge les produits depuis un fichier CSV et les affiche en colonne avec Bootstrap. De plus, une fonctionnalité de tri en JavaScript est disponible sur la page boutique. Enfin, ce site change la couleur de son header en fonction de l'heure de connexion de l'utilisateur. </p>",
        tech_stack: "HTML, CSS, PHP, JavaScript",
        link: "",
        video: "https://www.youtube.com/embed/y2tu4FJsBso"
    },

];
