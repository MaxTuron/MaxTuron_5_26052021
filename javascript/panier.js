//Défini la ou le code html sera crée
const section = document.querySelector('section');


//Récupération du localStorage
let objPanier = JSON.parse(localStorage.getItem('panier'));
console.log('panier', objPanier);

//Création d'une div
const divRow = document.createElement('div');
divRow.className="d-flex flex-row bd-highlight mb-3";
section.appendChild(divRow);

//Déclaration de deux variable permettant le calcul du prix d'un article et de la commande compléte
let prixAdjust = 0;
let prixArticle = 0;

//Si le panier est vide alors on affiche "Panier vide"
if (objPanier.length===0) {
    const name = document.createElement('p');
    divRow.appendChild(name);
    name.innerText = "Panier vide";

    //Sinon on créer l'affichage des objets du localstorage
} else {
    for (let i = 0; i < objPanier.length; i++) {

        //Création d'une div
        const divCol = document.createElement('div');
        divCol.className="p-2 bd-highlight";
        divRow.appendChild(divCol);

        //Création du nom
        const name = document.createElement('p');
        divCol.appendChild(name);
        name.textContent  = "Produit : "+objPanier[i].name;

        //Création du prix
        const prix = document.createElement('p');
        divCol.appendChild(prix);
        prix.textContent ="Prix unitaire : "+objPanier[i].price+"€";

        //Création de la couleur
        const color = document.createElement('p');
        divCol.appendChild(color);
        color.textContent = "Couleur : "+objPanier[i].color;


        //Création du nombre
        const number = document.createElement('p');
        divCol.appendChild(number);
        number.textContent ="Quantité : "+objPanier[i].number;

        //Création du bouton permettant de modifier la quantité d'un objet (-1)
        const articleLess = document.createElement('button');
        const txtBtnLess = document.createTextNode("-");
        articleLess.className = "btn btn-primary";
        articleLess.appendChild(txtBtnLess);
        number.appendChild(articleLess);

        //Si la quantité d'un article est > 0 on fait -1
        if(objPanier[i].number > 0){
            articleLess.onclick = function () {
                let objActu = objPanier[i];
                //Appel de la fonction articleMoins
                articleMoins(objActu);
            }
            //Sinon on supprime l'article
        }else{
            let objActu = objPanier[i];
            //Appel de la fonction articleSuppr
            articleSuppr(objActu);
        }

        //Création du bouton permettant de modifier la quantité d'un objet (+1)
        const articleMore = document.createElement('button');
        const txtBtnMore = document.createTextNode("+");
        articleMore.className = "btn btn-primary";
        articleMore.appendChild(txtBtnMore);
        number.appendChild(articleMore);

        articleMore.onclick = function () {
            let objActu = objPanier[i];
            //Appel de la fonction articlePlus
            articlePlus(objActu);
        };



        //Création du bouton permettant de supprimer un objet
        const supprPanier = document.createElement('button');
        const txtBtnSuppr = document.createTextNode("Supprimer du panier");
        supprPanier.className = "btn btn-primary";
        supprPanier.appendChild(txtBtnSuppr);
        divCol.appendChild(supprPanier);
        supprPanier.onclick = function () {
            let objActu = objPanier[i];
            //Appel de la fonction articleSuppr
            articleSuppr(objActu);
        };

        //Calcul du prix d'un article (prix unitaire * nombre d'objet)
        prixArticle = (objPanier[i].price * objPanier[i].number);
        const affichePrixArticle = document.createElement('p');
        divCol.appendChild(affichePrixArticle);
        const afficheTotalArticle = document.createTextNode('Le prix total de cet article est de : '+prixArticle);
        affichePrixArticle.appendChild(afficheTotalArticle);

        //A chaque tout de boucle, le prix d'un article s'ajoute au précédant
        prixAdjust = prixAdjust + prixArticle;

    }

    //Défini la ou le code html sera crée
    const form = document.querySelector('form');

    //Récupétation du prix total de la commande
    prixTotal = prixAdjust;
    const totalCommande = document.createElement('p');
    form.appendChild(totalCommande);
    const afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+prixTotal);
    totalCommande.appendChild(afficheTotalCommande);

    //Création d'un bouton de confirmation de commande
    const confirmCommande = document.createElement('button');
    const txtBtnCommande = document.createTextNode("Confirmer la commande");
    confirmCommande.className = "btn btn-primary";
    confirmCommande.appendChild(txtBtnCommande);
    form.appendChild(confirmCommande);
    confirmCommande.onclick = function () {

        //Récuperation des informations données dans le formulaire
        let nom = document.getElementById("lastName").value;
        let prenom = document.getElementById("firstName").value;
        let adresse = document.getElementById("adress").value;
        let ville = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        let prixFinal = prixTotal;

        //Création d'un objet contact
        const contact = {
            lastName: nom,
            firstName: prenom,
            adress: adresse,
            city: ville,
            email: email,
            prixFinal: prixFinal,
        };
        console.log(contact);
        alert(contact);
    };
}

//Fonction qui retire 1 au nombre d'objet
function articleMoins (objActu){
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name&& article.color === objActu.color) {
            //On retire -1 au nombre d'objet
            article.number--;
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    history.go(0);
}

//Fonction qui ajout 1 au nombre d'objet
function articlePlus (objActu){
    //Parcours les objets du tableau objPanier
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name &&article.color === objActu.color) {
            //On ajoute +1 au nombre d'objet
            article.number++;

        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    //Actualistation de la page
    history.go(0);
}

//Fonction de supression d'article
function articleSuppr (objActu) {
    let panier = JSON.parse(localStorage.getItem('panier'));

    panier.forEach((article,index)=> {
        if (objActu.name === article.name &&objActu.color === article.color) {
            panier.splice(index,1);
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
    history.go(0);
}