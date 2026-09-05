// 🔵 ENTORNO: NAVEGADOR — cargar desde index.html (cambiar el src del <script>)
// RETO · Nivel 3 EXTENDIDO
// Meta: todo lo anterior + try/catch con error VISIBLE en pantalla + estilos
// Requiere <div id="tarjeta"> y <p id="mensaje-error"> de index.html
//
// 🎬 DEMO DEL ERROR EN VIVO: cambia la URL a una mal escrita
//    (ej. .../pokemonX/pikachu) y recarga → verás el mensaje amable.

async function cargarTarjeta() {
  const tarjeta = document.getElementById("tarjeta");
  const mensajeError = document.getElementById("mensaje-error");

  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const datos = await respuesta.json();

    tarjeta.innerHTML = `
      <h2>${datos.name}</h2>
      <p>Altura: ${datos.height}</p>
      <p>Experiencia base: ${datos.base_experience}</p>
      <img src="${datos.sprites.front_default}" alt="${datos.name}">
    `;
    tarjeta.style.cssText =
      "border: 2px solid #333; border-radius: 8px; padding: 16px; width: 220px; text-align: center;";
  } catch (error) {
    // ⭐ Razón pedagógica: el usuario final NUNCA ve la consola.
    //    El error debe aparecer EN LA PÁGINA, con lenguaje humano:
    mensajeError.textContent =
      "😕 No pudimos cargar los datos. Intenta de nuevo en un momento.";
    console.error(error); // esto queda para el desarrollador
  }
}

cargarTarjeta();

// → Siguiente: 05-sin-node/index.html (ponerle nombre al mundo
//   en el que hemos vivido... antes de construir un servidor)
