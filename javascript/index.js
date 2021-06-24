//Défini la ou le code html sera crée
const section = document.querySelector('section');

//Lien vers l'API
fetch("http://localhost:3000/api/teddies/")
    //Défini le type de fichier attendu, ici un json
    .then(res => res.json())
    .then(data => {
        //Boucle parcourant les  entrées du tableau
        for (let i=0; i<data.length; i++) {

            //Création d'une div
            const div = document.createElement('div');
            div.className='col-sm';
            section.appendChild(div);

            //Création d'une image
            const img = document.createElement('img');
            div.appendChild(img);
            img.src = data[i].imageUrl;

            //Création d'un lien
            const lien = document.createElement('a');
            div.appendChild(lien);
            //Récupération de l'ID depuis le json
            lien.href = 'pages/product.html?id='+data[i]._id;

            //Création d'un titre h1
            const name = document.createElement('h1');
            lien.appendChild(name);
            name.innerText = data[i].name;

            //Création d'un paragraphe
            const price = document.createElement('p');
            div.appendChild(price);
            price.innerText = data[i].price;

            //Création d'un paragraphe
            const description = document.createElement('p');
            div.appendChild(description);
            description.innerText = data[i].description;
        }
        //Affichage dans la console du navigateur
        console.log(data)
    });

