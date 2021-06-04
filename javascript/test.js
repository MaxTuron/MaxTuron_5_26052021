const section = document.querySelector('section');

fetch("http://localhost:3000/api/teddies/") //Lien vers l'API
    .then(res => res.json())
    .then(data => {
        for (let i=0; i<Array(5).length; i++) {

            const div = document.createElement('div');
            div.className='cards';
            section.appendChild(div);

            const img = document.createElement('img');
            div.appendChild(img);
            img.src = data[i].imageUrl;

            const lien = document.createElement('a');
            div.appendChild(lien);
            lien.src = data[i]._id;

            const name = document.createElement('h1');
            lien.appendChild(name);
            name.innerText = data[i].name;

            const price = document.createElement('p');
            div.appendChild(price);
            price.innerText = data[i].price;

            const description = document.createElement('p');
            div.appendChild(description);
            description.innerText = data[i].description;
        }
        console.log(data)
    });

