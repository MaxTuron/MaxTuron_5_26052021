const section = document.querySelector('section'); //Défini la ou le code html sera crée

fetch("http://localhost:3000/api/teddies/") //Lien vers l'API
    .then(res => res.json()) //Défini le type de fichier attendu, ici un json
    .then(data => {
        for (let i=0; i<Array(5).length; i++) { // Boucle parcourant les  entrées du tableau

            const div = document.createElement('div'); //Création d'une div
            div.className='cards'; //Ajout de la classe "cards"
            section.appendChild(div); //Défini l'élément parent "section"

            const img = document.createElement('img'); //Création d'une image
            div.appendChild(img); //Défini l'élément parent "section"
            img.src = data[i].imageUrl; //Récupération du lien d'une image depuis le fichier json

            const lien = document.createElement('a'); //Création d'un lien
            div.appendChild(lien); //Défini l'élément parent "div"
            lien.src = data[i]._id; //Récupération de l'ID depuis le json

            const name = document.createElement('h1'); //Création d'un titre h1
            lien.appendChild(name); //Défini l'élément parent "lien"
            name.innerText = data[i].name; //Récupération du nom depuis le json

            const price = document.createElement('p'); //Création d'un paragraphe
            div.appendChild(price); //Défini l'élément parent "div"
            price.innerText = data[i].price; //Récupération du prix depuis le json

            const description = document.createElement('p'); //Création d'un paragraphe
            div.appendChild(description); //Défini l'élément parent "div"
            description.innerText = data[i].description; //Récupération de la description depuis le json
        }
        console.log(data) //Affichage dans la console du navigateur
    });

