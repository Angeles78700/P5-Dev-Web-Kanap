// Inject une liste de liens HTML avec les données récupérées sur le serveur
async function setProductsHTML() {
  const canaps = await fetchProducts();
  let productsHtml = ''
  for (const canap of canaps) {
    productsHtml += `<a href="./product.html?id=${canap._id}">${canap.name}</a>`
  }
  document.getElementById('items').innerHTML = productsHtml
}

// Récupère la liste des produits
async function fetchProducts() {
  return new Promise((resolve, reject) => {
    const url = new URL("http://localhost:3000/api/products");
    let data = fetch(url)
      .then((reponse) => reponse.json())
      .then((data) => {
        resolve(data);
      })
  })

}

setProductsHTML()