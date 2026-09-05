// ┌──────────────────────────────────────────────────────────┐
// │ 🟣 ENTORNO: TERMINAL (Node como SERVIDOR) + NAVEGADOR    │
// │ Igual que el paso 06: Node escucha, el navegador pide.   │
// │ Lo único que cambia es QUÉ respondemos: HTML, no texto.  │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 7 · ABREBOCAS: servir HTML en vez de texto
// 🎬 DEMO DEL MENTOR — sin entregable, sin checkpoint
// Correr: node server-html.js → recargar http://localhost:3000
// (cerrar antes el servidor del 06 con Ctrl+C, ¡o EADDRINUSE!)
// ============================================================
//
// Cambian SOLO DOS COSAS respecto al servidor anterior,
// y el navegador mostrará una página real:

const http = require("http");

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  // 👆 CAMBIO 1: el Content-Type ahora es text/html.
  //
  // ⭐ La clave está aquí: Content-Type es la etiqueta que le
  //    dice al navegador CÓMO INTERPRETAR lo que recibe.
  //    - Con text/plain → mostraría las etiquetas <h1> como
  //      texto literal.
  //    - Con text/html  → las RENDERIZA como página.

  res.end(`
    <html>
      <body>
        <h1>Mi proyecto desde el servidor</h1>
        <p>Esta página la generó Node, no el navegador.</p>
      </body>
    </html>
  `);
  // 👆 CAMBIO 2: el contenido ahora es HTML.
});

servidor.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

// ------------------------------------------------------------
// 💬 PREGUNTAS DE DISCUSIÓN (solo conversar, no codear):
//
// ¿Qué cambió respecto al paso anterior?
// → Solo el Content-Type y el contenido de la respuesta.
//
// ¿Por qué esto es útil?
// → LA PUERTA QUE ABRE: un servidor podría meter DATOS REALES
//   (de una base de datos) dentro de ese HTML antes de enviarlo.
//   Eso se llama "renderizar del lado del servidor", y es la
//   semilla del backend con Express + MongoDB que viene en S15.
//
// ============================================================
// 🗺️ EL MAPA COMPLETO EN UNA FRASE (cierre de la sesión):
//
// JS tiene un solo hilo → las operaciones lentas se delegan y
// avisan cuando terminan (event loop) → la promesa es el objeto
// que representa ese resultado futuro → async/await es la forma
// legible de esperarla → fetch usa promesas para pedir datos a
// una API (dos awaits: sobre y carta) → y Node te deja usar ese
// mismo JavaScript para estar DEL OTRO LADO: ser tú quien
// responde las peticiones.
//
// → Siguiente: 08-servidor-pokeapi/ (el servidor sale a buscar
//   datos REALES a PokéAPI — y descubrimos que todo eso queda
//   del lado del servidor, invisible para quien visita).
// ============================================================
