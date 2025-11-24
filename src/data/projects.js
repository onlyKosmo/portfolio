import evanPreview from '@/assets/projects/evan.png';
import LimboPreview from '@/assets/projects/suitlimbo/1.png';
import PlayTestPreview from '@/assets/projects/playtest/1.png';
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
        media: ['src/assets/projects/playtest/1.png', 'src/assets/projects/playtest/2.png'],
        description: "<p>Élaboration d'un site avec sa base de données permettant à ses utilisateurs de se connecter, de noter des jeux sur 5, de laisser des commentaires et d'interagir en communauté de joueurs. Calcul de la note moyenne des jeux en temps réel selon celles des utilisateurs.</p>",
        tech_stack: "PHP, MariaDB, HTML & CSS, JavaScript",
        link: "",
    },
    {
        title: "SuitLimbo",
        slug: "SuitLimbo | Site de vente de costumes",
        subtitle: '"SuitLimbo" | Gestion de contenus et déploiement AWS',
        preview: LimboPreview,
        image: LimboPreview,
        media: ['/images/dals-1.jpg', '/images/dals-2.jpg'],
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
        media: ['/images/dals-1.jpg', '/images/dals-2.jpg'],
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
        media: ['/images/dals-1.jpg', '/images/dals-2.jpg'],
        description: "<p>Promotion d'un artiste via un mini-site web intégrant un formulaire de contact et des animations CSS. </p>",
        tech_stack: "HTML & CSS",
        link: "https://basileferi.fr/src/assets/projects/MiniSite/html_mini_site/index.html",
    },

    {
        title: "Boutique Sneakers",
        slug: "Boutique Sneakers",
        subtitle: 'Conception d’un site pour une boutique Sneakers fictive',
        preview: SneakersPreview,
        image: SneakersPreview,
        media: ['', ''],
        description: "<p>Ce site charge les produits depuis un fichier CSV et les affiche en colonne avec Bootstrap. De plus, une fonctionnalité de tri en JavaScript est disponible sur la page boutique. Enfin, ce site change la couleur de son header en fonction de l'heure de connexion de l'utilisateur. </p>",
        tech_stack: "HTML, CSS, PHP, JavaScript",
        link: "",
        video: "https://www.youtube.com/embed/y2tu4FJsBso"
    },

];
