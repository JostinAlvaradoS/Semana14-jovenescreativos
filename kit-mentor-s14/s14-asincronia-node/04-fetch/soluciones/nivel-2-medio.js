// 🔵 ENTORNO: NAVEGADOR — cargar desde index.html (cambiar el src del <script>)
// RETO · Nivel 2 MEDIO
// Meta: fetch + insertar 2-3 datos en el DOM (sin manejo de error aún)
// Requiere el <div id="tarjeta"> de index.html

async function cargarTarjeta() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const datos = await respuesta.json();

  // Tomamos el elemento del HTML y le inyectamos contenido
  // usando template literals (las comillas invertidas ``):
  const tarjeta = document.getElementById("tarjeta");
  tarjeta.innerHTML = `
    <h2>${datos.name}</h2>
    <p>Altura: ${datos.height}</p>
    <p>Experiencia base: ${datos.base_experience}</p>
    <img src="${datos.sprites.front_default}" alt="${datos.name}">
  `;
}

cargarTarjeta();
