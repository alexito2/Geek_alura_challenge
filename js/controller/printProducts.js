import { deleteProduct } from "./deletProducts.js";

function printProducts() {
    let products = document.getElementById('products');

    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                // Crear un nuevo elemento de imagen (SVG) para cada producto
                let svg = document.createElement('img');
                svg.src = '../img/btn-borrar.svg';
                
                // Crear el HTML del producto 
                let productHTML = `
                    <div class="cart" id="${element.id}">
                        <img src="${element.img}" alt="img-producto">
                        <p>${element.name}</p>
                        <div class="price">
                            <p>$ ${element.price}</p>
                        </div>
                    </div>
                `;
                
                // Agregar el elemento SVG al contenedor de productos
                let div = document.createElement('div');
                div.innerHTML = productHTML;
                div.querySelector('.price').appendChild(svg);
                
                // Agregar el producto al contenedor principal
                products.appendChild(div);

                svg.addEventListener('click', (event) => {
                    event.preventDefault(); 
                    deleteProduct(element.id);
                });
            });
        })
        .catch(error => console.error("Error:", error));
}


printProducts();

export { printProducts };
