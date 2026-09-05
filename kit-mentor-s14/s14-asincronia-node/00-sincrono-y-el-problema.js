// ┌──────────────────────────────────────────────────────────┐
// │ 🟢 ENTORNO: TERMINAL (node archivo.js)                   │
// │ Esto es JavaScript "puro": correría IGUAL en la consola  │
// │ del navegador (F12). Usamos la terminal con Node solo    │
// │ como forma cómoda de ejecutar JS — aquí Node NO es       │
// │ servidor todavía, es solo "el que ejecuta el archivo".   │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 0 · CÓMO EJECUTA JAVASCRIPT EL CÓDIGO NORMALMENTE
// Correr con: node 00-sincrono-y-el-problema.js
// ============================================================
//
// JavaScript ejecuta las instrucciones UNA POR UNA, en orden,
// y no pasa a la siguiente hasta terminar la actual.
// Eso se llama código SÍNCRONO.
//
// Piensa en JS como UNA SOLA PERSONA haciendo una lista de
// tareas: no puede hacer dos cosas a la vez.
// A esa "persona" se le llama EL HILO (thread).
// JavaScript tiene UN solo hilo.

console.log("uno");


console.log("dos");



console.log("tres");
// Salida: uno, dos, tres — siempre, en ese orden.

// ============================================================
// PASO 1 · EL PROBLEMA: LAS OPERACIONES LENTAS
// ============================================================
//
// Imagina la instrucción: "trae los datos de un servidor".
// Eso puede tardar 2 segundos. Si JS fuera puramente síncrono,
// durante esos 2 segundos LA PÁGINA ENTERA QUEDARÍA CONGELADA:
// sin clics, sin animaciones, sin poder escribir en formularios.
// La única persona disponible estaría parada esperando.
//
// 🍽️ ANALOGÍA DEL RESTAURANTE (contarla aquí, en vivo):
//
//   Un mesero (el hilo de JS) toma tu pedido y lo lleva a la
//   cocina (el servidor de internet). Pero NO SE QUEDA PARADO
//   frente a la cocina esperando. Se va a atender otras mesas.
//   Cuando el plato está listo, la cocina LE AVISA, y él lo
//   recoge y lo entrega.
//
//   mesero  = hilo de JS
//   cocina  = servidor / disco
//   aviso   = promesa resuelta
//
// Eso es la ASINCRONÍA: JS delega la operación lenta, sigue
// haciendo otras cosas, y REACCIONA cuando le avisan que terminó.
//
// → Siguiente archivo: 01-event-loop.js (¿QUIÉN le avisa al mesero?)
