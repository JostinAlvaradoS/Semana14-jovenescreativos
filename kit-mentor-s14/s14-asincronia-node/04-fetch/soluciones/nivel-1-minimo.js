// 🔵 ENTORNO: NAVEGADOR — cargar desde index.html (cambiar el src del <script>)
// RETO · Nivel 1 MÍNIMO
// Meta: fetch + await + mostrar 1 dato en consola (sin DOM todavía)
// Para quien va bloqueado: este es el "logro base" de la sesión.

async function cargarDato() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const datos = await respuesta.json(); // ← el segundo await, siempre
  console.log(datos.name);
}

cargarDato();
