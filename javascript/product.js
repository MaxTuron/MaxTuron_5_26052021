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

        const colorTeddys = document.createElement('select'); //Création d'un paragraphe
        colorTeddys.name='colors';
        colorTeddys.id='colorTeddys';
        div.appendChild(colorTeddys); //Défini l'élément parent "div"


        const number = document.createElement('input');
        number.type='number';
        number.id="quantite";
        number.min=0;
        number.max=10;
        number.placeholder="Quantité";
        div.appendChild(number);

            for (let i=0; i<data.colors.length; i++) {
                const color = document.createElement('option');
                color.value='colors'+[i];
                colorTeddys.appendChild(color);
                const txtColor = document.createTextNode(data.colors[i]);
                color.appendChild(txtColor);
            }

            //créer un bouton qui, au clic, va lancer la fonction suivante :
            const ajoutPanier = document.createElement('button');
            const txtButton = document.createTextNode("Ajouter au panier");
            ajoutPanier.appendChild(txtButton);
            div.appendChild(ajoutPanier);
            ajoutPanier.onclick = function() {
                addLocalstorage(data);
            };            
    });


    function addLocalstorage(data) {
        //Ajout au panier

        let choosenColor;
        choosenColor = document.getElementById("colorTeddys").options[document.getElementById('colorTeddys').selectedIndex].text;

        let choosenNumber;
        choosenNumber = document.getElementById('quantite').value;

        const teddy = {
            name: data.name,
            id: data._id,
            color: choosenColor,
            number: choosenNumber,
        };

        const panier = localStorage.getItem('panier');
        if (!panier) {
            localStorage.setItem('panier', JSON.stringify([teddy]));
        } else {     
            arrayPanier = JSON.parse(localStorage.getItem('panier'));      
            arrayPanier.push(teddy);
            localStorage.setItem('panier', JSON.stringify(arrayPanier));
        }
    }
