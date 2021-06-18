const section = document.querySelector('section'); //Défini la ou le code html sera crée

let objJson = JSON.parse(localStorage.getItem('panier'));
console.log('panier', objJson);
const div = document.createElement('div'); //Création d'une div
div.className='cards'; //Ajout de la classe "cards"
section.appendChild(div); //Défini l'élément parent "section"

let prixAdjust = 0;
let prixArticle = 0;

if (!objJson) {
    const name = document.createElement('p');
    div.appendChild(name);
    name.innerText = "Panier vide";
} else {
    for (let i = 0; i < objJson.length; i++) {

        const name = document.createElement('p');
        div.appendChild(name);
        name.innerText = objJson[i].name;

        const prix = document.createElement('p');
        div.appendChild(prix);
        prix.innerText = objJson[i].price;

        const color = document.createElement('p');
        div.appendChild(color);
        color.innerText = objJson[i].color;

        const number = document.createElement('p');
        div.appendChild(number);
        number.innerText = objJson[i].number;


        const articleAdd = document.createElement('button');
        const txtBtnAdd = document.createTextNode("+");
        articleAdd.appendChild(txtBtnAdd);
        div.appendChild(articleAdd);
        articleAdd.onclick = function () {
            objJson.forEach((article) => {
                if (article.name === objJson[i].name && article.colors === objJson[i].colors) {
                    article.number++;
                    history.go(0);
                }
            });

            localStorage.setItem('panier', JSON.stringify(objJson));
        };

        const articleRemove = document.createElement('button');
        const txtBtnRemove = document.createTextNode("-");
        articleRemove.appendChild(txtBtnRemove);
        div.appendChild(articleRemove);
        articleRemove.onclick = function () {
            objJson.forEach((article) => {
                if (article.name === objJson[i].name && article.colors === objJson[i].colors) {
                    article.number--;
                    history.go(0);
                }
            });

            localStorage.setItem('panier', JSON.stringify(objJson));
        };

        const supprPanier = document.createElement('button');
        const txtBtnSuppr = document.createTextNode("Supprimer du panier");
        supprPanier.appendChild(txtBtnSuppr);
        div.appendChild(supprPanier);
        supprPanier.onclick = function () {
                objJson.forEach((article) => {
                    if (article.name === objJson[i].name && article.colors === objJson[i].colors) {
                        delete article;
                    }
                   console.log(article);
                });

            localStorage.setItem('panier', JSON.stringify(objJson));
        };


        prixArticle = (objJson[i].price * objJson[i].number);
        const affichePrixArticle = document.createElement('p');
        div.appendChild(affichePrixArticle);
        const afficheTotalArticle = document.createTextNode('Le prix total de cet article est de : '+prixArticle);
        affichePrixArticle.appendChild(afficheTotalArticle);


        prixAdjust = prixAdjust + prixArticle;

    }

    const divCommande = document.createElement('div'); //Création d'une div
    divCommande.className='cards'; //Ajout de la classe "cards"
    section.appendChild(divCommande); //Défini l'élément parent "section"

    const formCommande = document.createElement('form');
    formCommande.method='POST';
    divCommande.appendChild(formCommande); //Défini l'élément parent "section"


    const txtFirstName = document.createElement('label');
    txtFirstName.for='firstName';
    txtFirstName.textContent='Prenom :';
    formCommande.appendChild(txtFirstName);
    const firstName = document.createElement('input');
    firstName.type='text';
    firstName.id='firstName';
    txtFirstName.appendChild(firstName);


    const txtLastName = document.createElement('label');
    txtLastName.for='lastName';
    txtLastName.textContent='Nom :';
    formCommande.appendChild(txtLastName);
    const lastName = document.createElement('input');
    lastName.type='text';
    lastName.id='lastName';
    txtLastName.appendChild(lastName);


    const txtAdress = document.createElement('label');
    txtAdress.for='adress';
    txtAdress.textContent='Adresse :';
    formCommande.appendChild(txtAdress);
    const adress = document.createElement('input');
    adress.type='text';
    adress.id='adress';
    txtAdress.appendChild(adress);


    const txtCity = document.createElement('label');
    txtCity.for='city';
    txtCity.textContent='Ville :';
    formCommande.appendChild(txtCity);
    const city = document.createElement('input');
    city.type='text';
    city.id='city';
    txtCity.appendChild(city);


    const txtEmail = document.createElement('label');
    txtEmail.for='email :';
    txtEmail.textContent='Email';
    formCommande.appendChild(txtEmail);
    const email = document.createElement('input');
    email.type='email';
    email.id='email';
    txtEmail.appendChild(email);

    prixTotal = prixAdjust;
    const totalCommande = document.createElement('p');
    divCommande.appendChild(totalCommande);
    const afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+prixTotal);
    totalCommande.appendChild(afficheTotalCommande);

    const confirmCommande = document.createElement('button');
    const txtBtnCommande = document.createTextNode("Confirmer la commande");
    confirmCommande.appendChild(txtBtnCommande);
    divCommande.appendChild(confirmCommande);
    confirmCommande.onclick = function () {

    };


}