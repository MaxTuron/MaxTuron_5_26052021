//Défini la ou le code html sera crée
const section = document.querySelector('section');

//Récupération du localStorage
let objPanier = JSON.parse(localStorage.getItem('panier'));
console.log('panier', objPanier);

//Création d'une div
const div = document.createElement('div');
div.className='cards';
section.appendChild(div);

//Déclaration de deux variable permettant le calcul du prix d'un article et de la commande compléte
let prixAdjust = 0;
let prixArticle = 0;

//Si le panier est vide alors on affiche "Panier vide"
if (!objPanier) {
    const name = document.createElement('p');
    div.appendChild(name);
    name.innerText = "Panier vide";

    //Sinon on créer l'affichage des objets du localstorage
} else {
    for (let i = 0; i < objPanier.length; i++) {

        //Création du nom
        const name = document.createElement('p');
        div.appendChild(name);
        name.innerText = objPanier[i].name;

        //Création du prix
        const prix = document.createElement('p');
        div.appendChild(prix);
        prix.innerText = objPanier[i].price;

        //Création de la couleur
        const color = document.createElement('p');
        div.appendChild(color);
        color.innerText = objPanier[i].color;

        //Création du nombre
        const number = document.createElement('p');
        div.appendChild(number);
        number.innerText = objPanier[i].number;

        //Création du bouton permettant de modifier la quantité d'un objet (+1)
        const articleAdd = document.createElement('button');
        const txtBtnAdd = document.createTextNode("+");
        articleAdd.appendChild(txtBtnAdd);
        div.appendChild(articleAdd);

        articleAdd.onclick = function () {
            //Parcours les objets du tableau objPanier
            objPanier.forEach((article) => {
                //Si le nom et la couleur de l'article corespond à l'objet créer alors
                if (article.name === objPanier[i].name && article.colors === objPanier[i].colors) {
                    //On ajoute +1 au nombre d'objet
                    article.number++;
                    //Actualistation de la page
                    history.go(0);
                }
            });
            //Renvoie de l'article modifié dans le localstorage
            localStorage.setItem('panier', JSON.stringify(objPanier));
        };


        //Création du bouton permettant de modifier la quantité d'un objet (-1)
        const articleRemove = document.createElement('button');
        const txtBtnRemove = document.createTextNode("-");
        articleRemove.appendChild(txtBtnRemove);
        div.appendChild(articleRemove);
        articleRemove.onclick = function () {
            objPanier.forEach((article) => {
                //Si le nom et la couleur de l'article corespond à l'objet créer alors
                if (article.name === objPanier[i].name && article.colors === objPanier[i].colors) {
                    //On retire -1 au nombre d'objet
                    article.number--;
                    //Actualistation de la page
                    history.go(0);
                }
            });
            //Renvoie de l'article modifié dans le localstorage
            localStorage.setItem('panier', JSON.stringify(objPanier));
        };


        //Création du bouton permettant de supprimer un objet
        const supprPanier = document.createElement('button');
        const txtBtnSuppr = document.createTextNode("Supprimer du panier");
        supprPanier.appendChild(txtBtnSuppr);
        div.appendChild(supprPanier);
        supprPanier.onclick = function () {
            objPanier.forEach((article) => {
                    let arraySuppr = JSON.parse(localStorage.getItem('panier'));
                    if (article.name === arraySuppr[i].name && article.colors === arraySuppr[i].colors) {
                       arraySuppr.splice(0,1);
                        objPanier = arraySuppr;
                       history.go(0);
                    }

                });
            //Renvoie de l'article modifié dans le localstorage
            localStorage.setItem('panier', JSON.stringify(objPanier));
        };

        //Calcul du prix d'un article (prix unitaire * nombre d'objet)
        prixArticle = (objPanier[i].price * objPanier[i].number);
        const affichePrixArticle = document.createElement('p');
        div.appendChild(affichePrixArticle);
        const afficheTotalArticle = document.createTextNode('Le prix total de cet article est de : '+prixArticle);
        affichePrixArticle.appendChild(afficheTotalArticle);

        //A chaque tout de boucle, le prix d'un article s'ajoute au précédant
        prixAdjust = prixAdjust + prixArticle;

    }

    //Création d'une div
    const divCommande = document.createElement('div');
    divCommande.className='cards';
    section.appendChild(divCommande);

    //Création d'un formulaire
    const formCommande = document.createElement('form');
    formCommande.method='POST';
    divCommande.appendChild(formCommande);

    //Création d'un input avec un label pour le nom
    const txtFirstName = document.createElement('label');
    txtFirstName.for='firstName';
    txtFirstName.textContent='Prenom :';
    formCommande.appendChild(txtFirstName);
    const firstName = document.createElement('input');
    firstName.type='text';
    firstName.id='firstName';
    txtFirstName.appendChild(firstName);

    //Création d'un input avec un label pour le prenom
    const txtLastName = document.createElement('label');
    txtLastName.for='lastName';
    txtLastName.textContent='Nom :';
    formCommande.appendChild(txtLastName);
    const lastName = document.createElement('input');
    lastName.type='text';
    lastName.id='lastName';
    txtLastName.appendChild(lastName);

    //Création d'un input avec un label pour l'adresse
    const txtAdress = document.createElement('label');
    txtAdress.for='adress';
    txtAdress.textContent='Adresse :';
    formCommande.appendChild(txtAdress);
    const adress = document.createElement('input');
    adress.type='text';
    adress.id='adress';
    txtAdress.appendChild(adress);

    //Création d'un input avec un label pour la ville
    const txtCity = document.createElement('label');
    txtCity.for='city';
    txtCity.textContent='Ville :';
    formCommande.appendChild(txtCity);
    const city = document.createElement('input');
    city.type='text';
    city.id='city';
    txtCity.appendChild(city);

    //Création d'un input avec un label pour l'email'
    const txtEmail = document.createElement('label');
    txtEmail.for='email :';
    txtEmail.textContent='Email';
    formCommande.appendChild(txtEmail);
    const email = document.createElement('input');
    email.type='email';
    email.id='email';
    txtEmail.appendChild(email);

    //Récupétation du prix total de la commande
    prixTotal = prixAdjust;
    const totalCommande = document.createElement('p');
    divCommande.appendChild(totalCommande);
    const afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+prixTotal);
    totalCommande.appendChild(afficheTotalCommande);

    //Création d'un bouton de confirmation de commande
    const confirmCommande = document.createElement('button');
    const txtBtnCommande = document.createTextNode("Confirmer la commande");
    confirmCommande.appendChild(txtBtnCommande);
    divCommande.appendChild(confirmCommande);
    confirmCommande.onclick = function () {

    };


}