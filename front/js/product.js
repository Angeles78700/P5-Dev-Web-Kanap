console.log('product js');

const currentUrl = window.location.href
const url = new URL(currentUrl);
const id = url.searchParams.get("id");

// Récupère la liste des produits
async function fetchProduct() {
    return new Promise((resolve, reject) => {
        const url = new URL(`http://localhost:3000/api/products/${id}`);
        let data = fetch(url)
            .then((reponse) => reponse.json())
            .then((data) => {
                resolve(data);
            })
    })
}

async function setProductHTML() {
    const canap = await fetchProduct();
    const imgContainer = document.querySelector('.item__img')
    if (imgContainer !== null) {
        imgContainer.innerHTML = `<img src="${canap.imageUrl}" alt="${canap.altTxt}" >`
    }
    const titleElt = document.getElementById('title')
    if (titleElt !== null) {
        titleElt.textContent = canap.name
    }
    const priceElt = document.getElementById('price')
    if (priceElt !== null) {
        priceElt.textContent = canap.price
    }
    const descriptionElt = document.getElementById('description')
    if (descriptionElt !== null) {
    descriptionElt.textContent = canap.description
    }
    const colorsElt = document.getElementById('colors')
    if (colorsElt !== null) {
        const colors = canap.colors
        let optionsHtml = ''
        for (const color of colors) {
            optionsHtml += `<option value="${color.toLowerCase()}">${color}</option>`
        }
        colorsElt.innerHTML += optionsHtml
    }
}

setProductHTML()

// Add to cart

const buttonElt = document.getElementById('addToCart')

function addToCart() {
    // Check color
    const colorSelectElt = document.getElementById('colors')
    if (colorSelectElt === null) {
        alert('We cant add your product')
        return false;
    }
    const selectedColor = colorSelectElt.value;
    if (selectedColor === "") {
        alert('Merci de sélectionner une couleur')
        return false;
    }
    // Check quantity
    const quantityElt = document.getElementById('quantity')
    if (quantityElt === null) {
        alert('We cant add your product')
        return false;
    }
    const quantity = quantityElt.value;
    if (quantity<=0  || quantity > 100 ) {
        alert('Merci de sélectionner une quantité entre 0 et 100')
        return false;
    }
    // Ajout article au panier avec le localstorage
    // Depuis la page panier : récupération du localstorage
    // redirect panier ?
}
if (buttonElt !== null) {
    buttonElt.addEventListener("click",addToCart)
}

