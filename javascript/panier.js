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
            let objActu = objPanier[i];
            articlePlus(objActu);
        };


        //Création du bouton permettant de modifier la quantité d'un objet (-1)
        const articleRemove = document.createElement('button');
        const txtBtnRemove = document.createTextNode("-");
        articleRemove.appendChild(txtBtnRemove);
        div.appendChild(articleRemove);

        articleRemove.onclick = function () {
           let objActu = objPanier[i];
            articleMoins(objActu);
        };


        //Création du bouton permettant de supprimer un objet
        const supprPanier = document.createElement('button');
        const txtBtnSuppr = document.createTextNode("Supprimer du panier");
        supprPanier.appendChild(txtBtnSuppr);
        div.appendChild(supprPanier);
        supprPanier.onclick = function () {
            let objActu = objPanier[i];
            articleSuppr(objActu);
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

    const form = document.querySelector('form'); //Défini la ou le code html sera crée

    //Récupétation du prix total de la commande
    prixTotal = prixAdjust;
    const totalCommande = document.createElement('p');
    form.appendChild(totalCommande);
    const afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+prixTotal);
    totalCommande.appendChild(afficheTotalCommande);

    //Création d'un bouton de confirmation de commande
    const confirmCommande = document.createElement('button');
    const txtBtnCommande = document.createTextNode("Confirmer la commande");
    confirmCommande.appendChild(txtBtnCommande);
    form.appendChild(confirmCommande);
    confirmCommande.onclick = function () {

    };
}

function articleMoins (objActu){
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name && article.colors === objActu.colors) {
            //On retire -1 au nombre d'objet
            article.number--;
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    history.go(0);
}

function articlePlus (objActu){
    //Parcours les objets du tableau objPanier
    objPanier.forEach((article) => {
        //Si le nom et la couleur de l'article corespond à l'objet créer alors
        if (article.name === objActu.name && article.colors === objActu.colors) {
            //On ajoute +1 au nombre d'objet
            article.number++;
            //Actualistation de la page
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(objPanier));
    history.go(0);
}

function articleSuppr (objActu) {
    let panier = JSON.parse(localStorage.getItem('panier'));

    panier.forEach((article,index)=> {
        if (objActu.name === article.name && objActu.colors === article.colors) {
            panier.splice(index,1);
        }
    });
    //Renvoie de l'article modifié dans le localstorage
    localStorage.setItem('panier', JSON.stringify(panier));
    history.go(0);
}