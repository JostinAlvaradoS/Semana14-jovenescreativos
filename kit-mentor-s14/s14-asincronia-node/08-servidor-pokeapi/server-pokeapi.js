// ┌──────────────────────────────────────────────────────────┐
// │ 🟣 ENTORNO: TERMINAL (Node) + NAVEGADOR + INTERNET       │
// │                                                          │
// │  NAVEGADOR ──pide──► 🟣 TU SERVIDOR ──pide──► PokéAPI    │
// │  (cliente)  ◄─HTML── (Node: SERVIDOR   ◄─JSON── (otro    │
// │                       Y CLIENTE a la vez)      servidor) │
// │                                                          │
// │ ⭐ AQUÍ se cierra el círculo de la sesión: en el paso 04 │
// │ el NAVEGADOR le pedía a PokéAPI. Ahora le pide TU        │
// │ SERVIDOR, y el navegador solo recibe el HTML ya armado.  │
// │ Node es las dos cosas al tiempo: servidor de tu página   │
// │ y cliente de una API ajena.                              │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 8 · LO QUE QUEDA EN EL SERVIDOR Y NADIE PUEDE VER
// 🎬 DEMO DEL MENTOR — sin entregable, sin checkpoint
// Correr: (dentro de esta carpeta)
//    node server-pokeapi.js  → enciende el servidor
//    abrir http://localhost:3000        → pikachu (por defecto)
//    abrir http://localhost:3000/ditto  → ¡el que quieras!
// Detener: Ctrl+C
// (cerrar antes el servidor del 07 con Ctrl+C, ¡o EADDRINUSE!)
// ============================================================
//
// Venimos del paso 07: el servidor respondía un HTML fijo,
// escrito a mano dentro del archivo. Un cartel bonito, pero
// muerto: siempre dice lo mismo.
//
// AHORA el servidor va a SALIR A BUSCAR DATOS REALES antes de
// responder. Y ahí aparece la idea central de este paso:
//
//   🔒 TODO lo que pasa aquí adentro es INVISIBLE para quien
//      visita la página. El visitante recibe el RESULTADO,
//      nunca el procedimiento.
//
// COMPARACIÓN CON EL PASO 04 (la que hay que decir en voz alta):
//
//   PASO 04 · fetch en el NAVEGADOR          ← todo a la vista
//   ─────────────────────────────────────────────────────────
//   El JS viajaba al navegador y AHÍ se ejecutaba. Cualquiera
//   con F12 veía: la URL de la API, la petición en la pestaña
//   Network, el JSON completo, y tu código en "Ver código
//   fuente". Si ahí hubiera una contraseña, sería pública.
//
//   PASO 08 · fetch en el SERVIDOR           ← caja negra
//   ─────────────────────────────────────────────────────────
//   El JS NUNCA sale de tu computador. El navegador solo
//   recibe HTML terminado. No sabe de dónde salieron los datos,
//   ni con qué clave, ni cuántas peticiones hiciste.
//
// ⭐ ESO es "backend": la lógica que el usuario no puede ver
//    ni tocar. Es la razón por la que las contraseñas, las
//    claves de API y las reglas de negocio viven del lado del
//    servidor y no en el navegador.
//
// 📝 fetch en Node: desde Node 18 `fetch` viene INCLUIDO, igual
//    que en el navegador. Es literalmente la misma función del
//    paso 04 — mismo JavaScript, otro entorno. (Verifica tu
//    versión con `node -v`; si es menor a 18, actualiza Node.)

const http = require("http");

// ------------------------------------------------------------
// 🔒 EL SECRETO — la demostración más importante del paso
// ------------------------------------------------------------
// Esta constante es de mentira, pero represéntala como si fuera
// la clave de API de un banco o de una pasarela de pagos.
// Vive en el servidor, se usa en el servidor, y NUNCA se envía
// al navegador. Al final del archivo hay un reto para probarlo.
const CLAVE_SECRETA = "sk_demo_esto_jamas_llega_al_navegador";

// Regla de negocio: también invisible. El visitante no sabe
// cuál es el pokémon por defecto ni puede cambiar esta lógica.
const POKEMON_POR_DEFECTO = "pikachu";

// ------------------------------------------------------------
// 1) EL SERVIDOR COMO CLIENTE: pedirle datos a PokéAPI
// ------------------------------------------------------------
async function traerPokemon(nombre) {
  // 👇 Los MISMOS DOS AWAIT del paso 04 (el sobre 📬 y la carta):
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  // await #1 → llegó el SOBRE (la respuesta HTTP, aún cerrada)

  if (!respuesta.ok) {
    // respuesta.ok es false cuando el código NO es 2xx (404, 500...).
    // ⚠️ Ojo: fetch NO lanza error solo porque la API responda 404.
    //    Si no revisas esto, seguirías con datos vacíos.
    throw new Error(`PokéAPI respondió ${respuesta.status} para "${nombre}"`);
  }

  return await respuesta.json();
  // await #2 → ABRIMOS el sobre y leemos la carta (el JSON)
}

// ------------------------------------------------------------
// 2) LA PLANTILLA: convertir DATOS en HTML
// ------------------------------------------------------------
// Esto es "renderizar del lado del servidor" (server-side
// rendering): el HTML sale de aquí YA LLENO. El navegador no
// arma nada, solo pinta lo que recibe.
function plantilla(datos) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${datos.name} · servido por Node</title>
        <style>
          body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }
          .tarjeta { border: 2px solid #333; border-radius: 8px;
                     padding: 16px; width: 240px; text-align: center; }
          .tarjeta h2 { text-transform: capitalize; margin: 0 0 8px; }
        </style>
      </head>
      <body>
        <h1>Datos traídos por el SERVIDOR</h1>
        <div class="tarjeta">
          <h2>${datos.name}</h2>
          <img src="${datos.sprites.front_default}" alt="${datos.name}">
          <p>Altura: ${datos.height}</p>
          <p>Experiencia base: ${datos.base_experience}</p>
        </div>
        <p>Prueba otro: <code>http://localhost:3000/charizard</code></p>
        <p>👀 Abre "Ver código fuente" (Ctrl+U): solo verás este HTML.
           Ni el fetch, ni la URL de PokéAPI, ni la clave secreta.</p>
      </body>
    </html>
  `;
}

// ------------------------------------------------------------
// 3) EL SERVIDOR
// ------------------------------------------------------------
const servidor = http.createServer(async (req, res) => {
  // 👆 CAMBIO CLAVE respecto al 06 y 07: la función es ASYNC.
  //    ¿Por qué? Porque adentro vamos a ESPERAR a PokéAPI con
  //    await, y solo cuando llegue la respuesta contestaremos.
  //    Mientras tanto Node NO se bloquea: puede atender otras
  //    peticiones. Es el event loop del paso 01, trabajando.

  // 🐾 El navegador SIEMPRE pide además el iconito de la pestaña.
  //    Si no lo atajamos, intentaríamos buscar un pokémon
  //    llamado "favicon.ico" en cada visita. (Míralo en la
  //    terminal si borras estas dos líneas: clásico despiste.)
  if (req.url === "/favicon.ico") {
    res.writeHead(204); // 204 = "todo bien, pero no hay contenido"
    return res.end();
  }

  // ⭐ AQUÍ USAMOS `req` POR PRIMERA VEZ.
  //    req.url es la parte de la dirección después del puerto:
  //      http://localhost:3000/         → req.url === "/"
  //      http://localhost:3000/ditto    → req.url === "/ditto"
  //    Con .slice(1) le quitamos la barra inicial. Eso es una
  //    RUTA: decidir qué responder según lo que pidieron.
  const nombre =
    req.url === "/" ? POKEMON_POR_DEFECTO : req.url.slice(1).toLowerCase();

  // 🎬 ESTE console.log ES LA DEMO: aparece en TU TERMINAL, no
  //    en la consola del navegador. Cada vez que alguien recarga
  //    la página, la prueba de que el trabajo pasó ACÁ.
  console.log(`→ Petición "${req.url}" · buscando "${nombre}" en PokéAPI...`);
  console.log(`   (usando la clave ${CLAVE_SECRETA} — solo visible aquí)`);

  try {
    const datos = await traerPokemon(nombre);
    // await #3: el servidor espera a que su propio cliente termine.

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    // 👆 charset=utf-8: sin esto, las tildes y las ñ se ven como
    //    símbolos raros (Ã±). El paso 07 se salvó por no tenerlas.

    res.end(plantilla(datos));
    // El navegador recibe HTML terminado. Fin de su trabajo.
  } catch (error) {
    // ⭐ MISMA LECCIÓN DEL PASO 04, PERO DEL LADO DEL SERVIDOR:
    //    el error técnico va a la terminal (para ti);
    //    al visitante le llega un mensaje humano en la página.
    console.error("💥 Falló la petición:", error.message);

    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
      <h1>😕 No encontramos "${nombre}"</h1>
      <p>Revisa el nombre e intenta de nuevo.</p>
      <p><a href="/">Volver al inicio</a></p>
    `);
    // 👀 Fíjate en lo que NO le contamos: ni que usamos PokéAPI,
    //    ni el código HTTP real, ni la línea que falló. Eso se
    //    queda en la terminal. También eso es "no se puede ver".
  }
});

servidor.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
  console.log("Prueba también: http://localhost:3000/ditto");
});

// ------------------------------------------------------------
// 🎯 RETO DE 2 MINUTOS (hacerlo EN VIVO, con el grupo mirando)
//
// 1. Abre http://localhost:3000 y mira la terminal: ahí están
//    los console.log. En el navegador (F12 → Console): vacío.
// 2. Ctrl+U (Ver código fuente): busca "fetch", busca "pokeapi",
//    busca "sk_demo". NO ESTÁN. Solo hay HTML.
// 3. F12 → pestaña Network → recarga: una sola petición, a
//    localhost. NINGUNA a pokeapi.co.
//    ↔️ Compáralo abriendo el paso 04: ahí SÍ aparece pokeapi.co,
//       porque el que pedía era el navegador.
// 4. Cambia la URL a http://localhost:3000/pikachuuu → el
//    visitante ve un mensaje amable; el error real, en tu
//    terminal.
//
// ------------------------------------------------------------
// 🚨 ERRORES GARANTIZADOS DEL BLOQUE
//
// EADDRINUSE               → quedó encendido el servidor del 07.
//                            Ctrl+C, o cambia 3000 por 3001.
// fetch is not defined     → tu Node es anterior al 18 (`node -v`).
// Cannot read properties   → faltó un await, o la API devolvió
//   of undefined              404 y no revisaste `respuesta.ok`.
// La página no carga nunca → olvidaste `res.end()` en algún
//                            camino del if/try/catch: el
//                            navegador se queda esperando.
// Tildes raras (Ã±)        → falta charset=utf-8 en el writeHead.
//
// ------------------------------------------------------------
// 💬 PREGUNTAS DE DISCUSIÓN (solo conversar, no codear)
//
// ¿Por qué NO poner la clave de una API en el JavaScript del
// navegador?
// → Porque todo lo que le mandas al navegador es público:
//   basta con Ctrl+U. Las claves viven en el servidor.
//
// ¿Y si PokéAPI se cae?
// → Tu servidor sigue vivo y responde el mensaje del catch.
//   Quien depende de otro debe saber qué hacer cuando falla.
//
// ¿Esto no es más lento que el paso 04?
// → El visitante espera a que el servidor consulte. A cambio:
//   ve la página completa de una, y el secreto queda a salvo.
//   Elegir dónde va la lógica es una DECISIÓN de arquitectura.
//
// ============================================================
// 🗺️ EL MAPA, AHORA COMPLETO:
//
// Un solo hilo → lo lento se delega (event loop) → la promesa
// representa el resultado futuro → async/await lo hace legible
// → fetch pide datos a una API (dos awaits: sobre y carta) →
// Node te deja estar del OTRO lado (servidor) → y del lado del
// servidor puedes ser CLIENTE de otros servicios sin que nadie
// vea cómo. Eso último tiene nombre: BACKEND.
//
// → Siguiente: S15 · Express + base de datos, que es exactamente
//   este archivo, pero sin escribir a mano el routing, el
//   Content-Type ni las plantillas.
// ============================================================
