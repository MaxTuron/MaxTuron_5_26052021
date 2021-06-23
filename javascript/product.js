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

        //Création de la div
        const div = document.createElement('div');
        //Ajout de la classe "cards"
        div.className='cards';
        //Défini l'élément parent "section"
        section.appendChild(div);

        //Création d'une image
        const img = document.createElement('img');
        div.appendChild(img);
        //Récupération du lien d'une image depuis le fichier json
        img.src = data.imageUrl;

        //Création d'un titre h1
        const name = document.createElement('h1');
        div.appendChild(name);
        name.innerText = data.name;

        //Création d'un paragraphe prix
        const price = document.createElement('p');
        div.appendChild(price);
        price.innerText = data.price;

        //Création d'un paragraphe description
        const description = document.createElement('p');
        div.appendChild(description);
        description.innerText = data.description;

        //Création d'un selecteur pour les différentes couleurs
        const colorTeddys = document.createElement('select');
        colorTeddys.name='colors';
        colorTeddys.id='colorTeddys';
        div.appendChild(colorTeddys);

        //Création d'un input permettant à l'utilistaeur de choisir le nombre de produit
        const number = document.createElement('input');
        number.type='number';
        number.id="quantite";
        //Valeur minimale
        number.min=0;
        //Valeur maximale
        number.max=10;
        //Valeur de base
        number.value=1;
        div.appendChild(number);

        //Boucle permettant d'afficher le nom des couleurs liée à un ours
        for (let i=0; i<data.colors.length; i++) {
            //Création de la balise option
            const color = document.createElement('option');
            color.value='colors'+[i];
            colorTeddys.appendChild(color);
            const txtColor = document.createTextNode(data.colors[i]);
            color.appendChild(txtColor);
        }

            //Création du bouton
            const ajoutPanier = document.createElement('button');
            //Texte liée au bouton
            const txtButton = document.createTextNode("Ajouter au panier");
            ajoutPanier.appendChild(txtButton);
            div.appendChild(ajoutPanier);
            //Appel de la fonction addLocalstorage au click sur le bouton
            ajoutPanier.onclick = function() {
                addLocalstorage(data);
            };            
    });

    //Fonction d'ajout au local storage
    function addLocalstorage(data) {

        //Récupération de la couleur choisie par l'utilisateur
        let choosenColor;
        choosenColor = document.getElementById("colorTeddys").options[document.getElementById('colorTeddys').selectedIndex].text;

        //Récupération du nombre choisi par l'utilisateur
        let choosenNumber;
        choosenNumber = document.getElementById('quantite').value;

        //Création de l'objet avec les paramètres de l'ours
        const teddy = {
            name: data.name,
            id: data._id,
            price: data.price,
            color: choosenColor,
            number: choosenNumber,
        };

        //Récupération du localstorage
        const panier = localStorage.getItem('panier');
        //Si le localstorga est vide alors ajouter l'objet
        if (!panier) {
            localStorage.setItem('panier', JSON.stringify([teddy]));
            localStorage.setItem('panier', JSON.stringify([teddy]));
            //Sinon si un objet est identique mais avec un nombre différent
        }else{
            arrayPanier = JSON.parse(panier);
            let valid = false;
            arrayPanier.forEach((article)=>{
                if(article.name===teddy.name && article.color===teddy.color){
                    article.number = +article.number + +teddy.number;
                    valid = true;
                }
            });
            if(valid===false){
                arrayPanier.push(teddy);
            }
            localStorage.setItem('panier', JSON.stringify(arrayPanier));
            alert("L'objet à été ajouté au panier");
        }
    }