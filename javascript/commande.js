const section = document.querySelector('section'); //Défini la ou le code html sera crée

fetch("http://localhost:3000/api/teddies/order") //Lien vers l'API
    .then(res => res.json()) //Défini le type de fichier attendu, ici un json
    .then(data => {
        for (let i=0; i<data.length; i++) { // Boucle parcourant les  entrées du tableau

            const div = document.createElement('div'); //Création d'une div
            div.className='cards'; //Ajout de la classe "cards"
            section.appendChild(div); //Défini l'élément parent "section"

            const description = document.createElement('p'); //Création d'un paragraphe
            div.appendChild(description); //Défini l'élément parent "div"
            description.innerText = data[i].description; //Récupération de la description depuis le json
        }
        console.log(data) //Affichage dans la console du navigateur

        /*const contact = {
            lastName: ,
            fistName: ,
            adress: ,
            city: ,
            email: ,
        }; */
    });

