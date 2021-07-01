let Ours = document.querySelector('#Ours'); //Défini la ou le code html sera crée

//on récupère les paramètres de l'url
let searchParams = window.location.search;

//on enlève le '?' pour n'avoir QUE les paramètres
let searchParamsOnly = searchParams.substring(1,window.location.search.length);

//on enlève le 'id=' pour n'avoir que l'id utilisable
let searchParamsId = searchParamsOnly.substring(3,window.location.search.length);

fetch("http://localhost:3000/api/teddies/"+searchParamsId) //Lien vers l'API
    .then(res => res.json()) //Défini le type de fichier attendu, ici un json
    .then(data => {

        //Création des différents élements
        let img = document.querySelector('#imgProduct'),
            name = document.querySelector('#nameProduct'),
            price = document.querySelector('#priceProduct'),
            description = document.querySelector('#descriptionProduct'),
            colorTeddys = document.querySelector('#colorTeddys'),
            ajoutPanier = document.querySelector('#ajoutPanier');

        //On attribu les données à chaque élement
        img.src = data.imageUrl;
        name.innerText = data.name;
        price.innerText =(data.price / 100).toLocaleString("fr") + " €";
        description.innerText = data.description;


        //Boucle permettant d'afficher le nom des couleurs liée à un ours
        for (let i=0; i<data.colors.length; i++) {
            //Création de la balise option
            let color = document.createElement('option');
            color.value='colors'+[i];
            colorTeddys.appendChild(color);
            let txtColor = document.createTextNode(data.colors[i]);
            color.appendChild(txtColor);
        }

        let txtButton = document.createTextNode("Ajouter au panier");
        ajoutPanier.appendChild(txtButton);
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
            img: data.imageUrl,
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
            let arrayPanier = JSON.parse(panier);
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