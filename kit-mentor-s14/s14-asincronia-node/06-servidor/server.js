// ┌──────────────────────────────────────────────────────────┐
// │ 🟣 ENTORNO: DOS PROGRAMAS A LA VEZ                       │
// │                                                          │
// │  TERMINAL (node server.js)  ←→  NAVEGADOR (localhost)    │
// │  Node corre este archivo y      El navegador es el       │
// │  se convierte en SERVIDOR:      CLIENTE: pide la página  │
// │  queda encendido escuchando.    y muestra la respuesta.  │
// │                                                          │
// │ ⭐ AQUÍ cambia el rol de Node: en los pasos 00-03 solo   │
// │ ejecutaba y terminaba; ahora queda VIVO respondiendo.    │
// │ Y ustedes cambian de lado: en el paso 04 eran el cliente │
// │ que pedía a PokéAPI — ahora son el servidor que responde.│
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 6 · NODE.JS: JavaScript FUERA del navegador
// (Viene de 05-sin-node: acabamos de ver que una página file://
//  vive encerrada en tu disco y nadie "responde" nada.
//  AHORA construimos al que responde.)
// Correr: (dentro de esta carpeta)
//    npm init -y      → genera package.json (mostrarlo al grupo)
//    node server.js   → enciende el servidor
//    abrir http://localhost:3000 en el navegador
// Detener: Ctrl+C
// ============================================================
//
// Hasta aquí, TODO tu JavaScript ha corrido dentro de un
// navegador. Pero el navegador es solo un ENTORNO que ejecuta
// JS y le presta herramientas: document, window, fetch.
//
// Node.js es OTRO entorno: toma el mismo motor que usa Chrome
// para ejecutar JavaScript (V8) y lo pone a correr directamente
// en tu computador, sin navegador.
//
//   ⚠️ Como NO hay página → en Node NO existen document ni window.
//   ✅ A cambio, presta OTRAS herramientas: acceso a archivos,
//      a la red, y la capacidad de CREAR SERVIDORES.
//      Vienen en módulos nativos como http, fs, path.
//
// ¿QUÉ ES UN SERVIDOR? Un programa que se queda encendido,
// ESCUCHANDO en un puerto (una "puerta" numerada de tu
// computador), y cada vez que alguien visita su dirección,
// LE RESPONDE ALGO. Eso es todo: recibir petición → responder.
//
// ¿Y NPM? El gestor de paquetes de Node: instala librerías y
// administra tu proyecto mediante package.json (la "cédula" del
// proyecto: nombre, versión, dependencias).
// `npm init -y` crea ese archivo con valores por defecto.

// ------------------------------------------------------------
// EL SERVIDOR, LÍNEA POR LÍNEA
// ------------------------------------------------------------

const http = require("http");
// require importa un módulo. http es NATIVO de Node:
// NO se instala con npm, viene incluido.

const servidor = http.createServer((req, res) => {
  // ⭐ Esta función se ejecuta UNA VEZ POR CADA petición que llegue.
  //    req = la petición: qué pidió el visitante, desde dónde.
  //    res = la respuesta: tu canal para contestarle.

  res.writeHead(200, { "Content-Type": "text/plain" });
  // 200 = código "todo bien".
  // Content-Type le dice al navegador QUÉ tipo de contenido
  // le estás mandando (aquí: texto plano).

  res.end("¡Hola desde mi primer servidor Node!");
  // end() envía el contenido y CIERRA la respuesta.
  // 🎯 RETO: cada estudiante cambia este mensaje por algo
  //    de SU proyecto.
});

servidor.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000");
});
// listen() enciende el servidor y lo deja ESCUCHANDO en el
// puerto 3000. localhost = "este mismo computador".
// El programa NO termina: queda escuchando hasta Ctrl+C.

// ------------------------------------------------------------
// 🚨 ERROR GARANTIZADO DEL BLOQUE: EADDRINUSE
// "Esa dirección ya está en uso" = el puerto 3000 lo ocupa otro
// proceso — casi siempre un servidor anterior que olvidaste
// cerrar. Solución: Ctrl+C al viejo, o cambiar 3000 por 3001.
//
// 🛑 LÍMITE DE LA SESIÓN: NO se introduce Express aquí.
// Si preguntan por qué: "Express abstrae exactamente esto — si
// primero entienden qué hace un servidor a bajo nivel, sabrán
// qué les ahorra el framework. Express llega en S15."
//
// → Siguiente: 07-servidor-html/ (servir HTML en vez de texto)
