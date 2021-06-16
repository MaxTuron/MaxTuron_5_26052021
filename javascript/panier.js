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
            if (objJson[i].number > 9) {
                alert("Vous ne pouvez pas mettre plus de 10 objets")
            } else {
                let num = objJson[i].number
                let numArticle = num + 1;
                objJson[i].number = numArticle;
                console.log(num)
                console.log(numArticle)
            }
        };

        const articleRemove = document.createElement('button');
        const txtBtnRemove = document.createTextNode("-");
        articleRemove.appendChild(txtBtnRemove);
        div.appendChild(articleRemove);
        articleRemove.onclick = function () {
            if (objJson[i].number < 1) {
                alert("Vous ne pouvez pas mettre moins d'un objet")
            } else {
                let num = objJson[i].number
                let numActu = num - 1;
                let panierUpdate = JSON.parse(localStorage.getItem('panier'));
                panierUpdate.push(numActu);
                localStorage.setItem("panier", JSON.stringify(panierUpdate));
                console.log(num)
                console.log(numActu)

            }
        }

        const supprPanier = document.createElement('button');
        const txtBtnSuppr = document.createTextNode("Supprimer du panier");
        supprPanier.appendChild(txtBtnSuppr);
        div.appendChild(supprPanier);
        supprPanier.onclick = function () {
            localStorage.removeItem(objJson.name);
        };


        prixArticle = (objJson[i].price * objJson[i].number);
        const affichePrixArticle = document.createElement('p');
        div.appendChild(affichePrixArticle);
        const afficheTotalArticle = document.createTextNode('Le prix total de cet article est de : '+prixArticle);
        affichePrixArticle.appendChild(afficheTotalArticle);


        prixAdjust = prixAdjust + prixArticle;

    }


    prixTotal = prixAdjust;
    const totalCommande = document.createElement('p');
    div.appendChild(totalCommande);
    const afficheTotalCommande = document.createTextNode('Le prix total de la commande est de : '+prixTotal);
    totalCommande.appendChild(afficheTotalCommande);
}