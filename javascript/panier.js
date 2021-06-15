const section = document.querySelector('section'); //Défini la ou le code html sera crée

let objJson = JSON.parse(localStorage.getItem('panier'));
console.log('panier', objJson);
const div = document.createElement('div'); //Création d'une div
div.className='cards'; //Ajout de la classe "cards"
section.appendChild(div); //Défini l'élément parent "section"

if (!objJson) {
    const name = document.createElement('p');
    div.appendChild(name);
    name.innerText = "Panier vide";
} else {
    for (let i=0; i<objJson.length; i++) {

        const name = document.createElement('p');
        div.appendChild(name);
        name.innerText = objJson[i].name;

        const color = document.createElement('p');
        div.appendChild(color);
        color.innerText = objJson[i].color;

        const number = document.createElement('p');
        div.appendChild(number);
        number.innerText = objJson[i].number;
    }
}