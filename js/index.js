const url = "/js/productos.json"; // URL del archivo JSON

const mangasListContainer = document.getElementById("mangas-list");

// Función para cargar los mangas desde el archivo JSON
async function cargarMangas() {
    try {
        const response = await fetch(url);
        const mangas = await response.json();
        mostrarMangas(mangas);
    } catch (error) {
        console.error("Error cargando los mangas:", error);
    }
}

// Función para mostrar los mangas en el DOM
function mostrarMangas(mangas) {
    mangasListContainer.innerHTML = "";
    mangas.forEach(manga => {
        const mangaDiv = document.createElement("div");
        mangaDiv.innerHTML = `
            <img src="${manga.imagen}" alt="${manga.titulo}" class="manga-img">
            <h3>${manga.titulo}</h3>
            <p>Precio: $${manga.precio}</p>
            <button onclick="agregarAlCarrito(${manga.id})">Agregar al Carrito</button>
        `;
        mangasListContainer.appendChild(mangaDiv);
    });
}

// Cargar los mangas desde el archivo JSON al cargar la página
cargarMangas();

