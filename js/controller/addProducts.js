function addProducts() {
        let form = document.querySelector('form');
        let nameProductForm = form.querySelector('#nameProductForm');
        let priceProductForm = form.querySelector('#priceProductForm');
        let imgProductForm = form.querySelector('#imgProductForm');
        let btnSend = form.querySelector('#btnSend');
        let btnClean = form.querySelector('#btnClean');

        // Event listener para el evento de entrada en el campo de precio
        priceProductForm.addEventListener('input', function () {
            // Obtener el valor actual del campo de precio
            let price = this.value;

            // Verificar si el valor del precio tiene más de 5 caracteres
            if (price.length > 5) {
                this.value = price.slice(0, 13);
            }

        });
        // Event listener para el botón "Enviar"
        btnSend.addEventListener('click', function (event) {
            event.preventDefault(); 

            // Obtener los valores de los campos del formulario
            let name = nameProductForm.value;
            let price = parseFloat(priceProductForm.value);
            let img = imgProductForm.value;

            // Verificar que todos los campos estén completos
            if (name.trim() === '' || isNaN(price) || img.trim() === '') {
                alert('Por favor completa todos los campos');
                return;
            }

            // Datos del nuevo producto 
            let nuevoProducto = {
                name: name,
                price: price,
                img: img
            };

            // Opciones para la solicitud fetch
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoProducto) 
            };

            // Realizar la solicitud POST a la API
            fetch("http://localhost:3000/products", options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("La solicitud no fue exitosa");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Producto añadido:", data);
                })
                .catch(error => {
                    console.error("Error al realizar la solicitud:", error);
                });
        });

        // Event listener para el botón "Limpiar"
        btnClean.addEventListener('click', function (event) {
            event.preventDefault()
            // Limpiar los valores de los campos del formulario
            nameProductForm.value = '';
            priceProductForm.value = '';
            imgProductForm.value = '';
        });
}

addProducts()

export { addProducts };
