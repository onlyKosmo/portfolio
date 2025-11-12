// J'ai remplacé ici le var du man en const sous conseil de l'IDE
const map = L.map('map').setView([45.203522,5.701859], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([45.203522, 5.701859]).addTo(map)
    .bindPopup('Un marqueur Leaflet au BUT MMI !')
    .openPopup();
// J'ai enlevé ici la fonction, car non nécessaire
map.on('click', e => alert("Vous avez cliqué sur la carte à " + e.latlng));
// Utilisation du plugin "facile" confetti pour essayer
// Renseigner l'id
let confetti = new Confetti('confetti');
// Changer les paramètres si besoin
confetti.setCount(200);
confetti.setSize(2);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true);

// Alert pour m'entraîner
document.getElementById('showTextButton').addEventListener('click', () => {
    alert('Que se passe-t-il?');})
// Changement d'attribut hidden pour m'entraîner
document.getElementById('showTextButton').addEventListener('click', () => {
    const hiddenText = document.getElementById('hiddenText');
    hiddenText.removeAttribute('hidden'); // Supprime l'attribut 'hidden'
});