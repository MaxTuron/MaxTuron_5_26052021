//Lien vers l'API
fetch("http://localhost:3000/api/teddies/")
    //Défini le type de fichier attendu, ici un json
    .then(res => res.json())
    .then(data => {
        //Boucle parcourant les  entrées du tableau
        for (let i=0; i<data.length; i++) {
            //Défini la ou le code html sera crée
            let Ours = document.querySelector('#Ours'),
            //Création des différents élements
                div = document.createElement('div'),
                img = document.createElement('img'),
                lien = document.createElement('a'),
                name = document.createElement('h1'),
                price = document.createElement('p'),
                description = document.createElement('p');

            //On défini la structure de la section
            Ours.appendChild(div);
            div.appendChild(img);
            div.appendChild(lien);
            lien.appendChild(name);
            div.appendChild(price);
            div.appendChild(description);

            //On attribu les données à chaque élement
            img.src = data[i].imageUrl;
            lien.href = 'pages/product.html?id='+data[i]._id;
            name.innerText = data[i].name;
            price.innerText = (data[i].price / 100).toLocaleString("fr") + " €";
            description.innerText = data[i].description;

            //Ajout de classes CSS
            div.className='col-sm';
        }
        //Affichage dans la console du navigateur
        console.log(data)
    });