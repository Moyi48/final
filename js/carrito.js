const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

let carrito = [];

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un manga al carrito
function agregarAlCarrito(mangaId) {
    fetch(url)
        .then(response => response.json())
        .then(mangas => {
            const manga = mangas.find(manga => manga.id === mangaId);
            if (manga) {
                const itemEnCarrito = carrito.find(item => item.id === mangaId);
                if (itemEnCarrito) {
                    itemEnCarrito.cantidad++;
                } else {
                    carrito.push({ ...manga, cantidad: 1 });
                }
                mostrarCarrito();
                guardarCarritoEnLocalStorage();
            }
        })
        .catch(error => console.error("Error agregando al carrito:", error));
}

// Función para sacar un manga del carrito
function sacarDelCarrito(mangaId) {
    carrito = carrito.filter(item => item.id !== mangaId);
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para ajustar la cantidad de un manga en el carrito
function ajustarCantidad(mangaId, cantidad) {
    const itemEnCarrito = carrito.find(item => item.id === mangaId);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad = cantidad;
        if (itemEnCarrito.cantidad <= 0) {
            sacarDelCarrito(mangaId);
        } else {
            mostrarCarrito();
            guardarCarritoEnLocalStorage();
        }
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.titulo} - $${item.precio} x 
            <input type="number" value="${item.cantidad}" min="1" onchange="ajustarCantidad(${item.id}, this.value)">
            <button onclick="sacarDelCarrito(${item.id})">Quitar</button>
        `;
        cartItemsContainer.appendChild(listItem);
        total += item.precio * item.cantidad;
    });
    cartTotalContainer.textContent = total.toFixed(2);
}

// Agregar botón para vaciar el carrito
const vaciarCarritoButton = document.createElement("button");
vaciarCarritoButton.textContent = "Vaciar Carrito";
vaciarCarritoButton.onclick = vaciarCarrito;
document.getElementById("cart").appendChild(vaciarCarritoButton);

// Cargar el carrito desde el almacenamiento local al cargar la página
cargarCarritoDesdeLocalStorage();
