const section = document.querySelector('section'); //Défini la ou le code html sera crée

//on récupère les paramètres de l'url
const searchParams = window.location.search;

//on enlève le '?' pour n'avoir QUE les paramètres
const searchParamsOnly = searchParams.substring(1,window.location.search.length);

//on enlève le 'id=' pour n'avoir que l'id utilisable
const searchParamsId = searchParamsOnly.substring(3,window.location.search.length);

fetch("http://localhost:3000/api/teddies/"+searchParamsId) //Lien vers l'API
    .then(res => res.json()) //Défini le type de fichier attendu, ici un json
    .then(data => {

        const div = document.createElement('div'); //Création d'une div
        div.className='cards'; //Ajout de la classe "cards"
        section.appendChild(div); //Défini l'élément parent "section"

        const img = document.createElement('img'); //Création d'une image
        div.appendChild(img); //Défini l'élément parent "section"
        img.src = data.imageUrl; //Récupération du lien d'une image depuis le fichier json

        const name = document.createElement('h1'); //Création d'un titre h1
        div.appendChild(name); //Défini l'élément parent "lien"
        name.innerText = data.name; //Récupération du nom depuis le json

        const price = document.createElement('p'); //Création d'un paragraphe
        div.appendChild(price); //Défini l'élément parent "div"
        price.innerText = data.price; //Récupération du prix depuis le json

        const description = document.createElement('p'); //Création d'un paragraphe
        div.appendChild(description); //Défini l'élément parent "div"
        description.innerText = data.description; //Récupération de la description depuis le json

        console.log(data) //Affichage dans la console du navigateur

        //créer un bouto qui, au clic, va lancer la fonction suivante :
        const panier = localStorage.getItem('panier')
        console.log(panier);
        if (panier === null) {
            const array = [];
            array.push(data.name);
            localStorage.setItem('panier', JSON.stringify(array));
        } //else {
            //console.log(JSON.stringify(JSON.parse(panier).push(data.name)));
            //localStorage.setItem('panier', JSON.stringify(JSON.parse(panier).push(data.name)));
        //}
    });

