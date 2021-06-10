const section = document.querySelector('section'); //Défini la ou le code html sera crée
const panier = localStorage.getItem('article1');

let objJson = JSON.parse(panier);

const div = document.createElement('div'); //Création d'une div
div.className='cards'; //Ajout de la classe "cards"
section.appendChild(div); //Défini l'élément parent "section"

for (let i=0; i<objJson.length; i++) {

    const name = document.createElement('p');
    div.appendChild(name);
    name.innerText = objJson[i];


}
console.log(panier);