import evanPreview from '@/assets/projects/evan.png';

export default [
    {
        title: "Projet secret",
        preview: evanPreview, // ✅ use imported variable
        link: "https://example.com/project1",
    },
    {
        title: "Project 2",
        preview: evanPreview,
        link: "https://example.com/project2",
    },
    {
        title: "Project 3",
        preview: "/projects/project3.jpg",
        link: "https://example.com/project3",
    },
];
