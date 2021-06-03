let p = new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        resolve(this);
    };
    request.open('GET', 'http://localhost:3000/api/teddies/');
    request.send();
});

p.then((response) => {

    let a = document.querySelector('#list');

    response.responseText.forEach((item)=> {
        let b = a.createNode(div);
        b.classList.ad
        b.createNode(img, item.img);
        a.appendChild(b);
    });
});