const section = document.querySelector('section');

fetch("http://localhost:3000/api/teddies/") //Lien vers l'API
    .then(res => res.json())
    .then(data => {
        for (let i=0; i<Array(5).length; i++) {

            const div = document.createElement('div');
            section.appendChild(div);

            const name = document.createElement('h1');
            div.appendChild(name);
            name.innerText = data[i].name;

            const price = document.createElement('p');
            div.appendChild(price);
            price.innerText = data[i].price;

            const description = document.createElement('p');
            div.appendChild(description);
            description.innerText = data[i].description;

            const img = document.createElement('img');
            div.appendChild(img);
            img.src = data[i].imageUrl;
        }
        console.log(data)
    });

