// ┌──────────────────────────────────────────────────────────┐
// │ 🟢 ENTORNO: TERMINAL (node archivo.js)                   │
// │ Esto es JavaScript "puro": correría IGUAL en la consola  │
// │ del navegador (F12). Usamos la terminal con Node solo    │
// │ como forma cómoda de ejecutar JS — aquí Node NO es       │
// │ servidor todavía, es solo "el que ejecuta el archivo".   │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 2 · EL "AVISO": EL EVENT LOOP
// Correr con: node 01-event-loop.js
// 🎯 EN VIVO: pedir predicción del orden en el chat ANTES de correr
// ============================================================
//
// ¿Quién le avisa al mesero? El mecanismo interno funciona así:
//
//  1. JS ejecuta el código síncrono en su PILA
//     ("lo que estoy haciendo ahora").
//  2. Cuando encuentra una operación lenta (timer, petición a
//     internet), SE LA ENTREGA AL ENTORNO (navegador o Node),
//     que la maneja por fuera del hilo. JS sigue con lo suyo.
//  3. Cuando la operación termina, su resultado NO interrumpe
//     a JS: se pone a esperar en una COLA.
//  4. Un vigilante — el EVENT LOOP — revisa constantemente:
//     "¿JS ya terminó todo lo que tenía en la pila? ¿Sí?
//      Entonces le paso lo siguiente de la cola."

console.log("1");

setTimeout(() => {
  console.log("2");
}, 10000); // ⏰ "ejecuta esto en 0 milisegundos"

setTimeout(() => {
  console.log("3");
}, 0); // ⏰ "ejecuta esto en 0 milisegundos"

// ------------------------------------------------------------
// SALIDA: 1, 3, 2
// ------------------------------------------------------------
// ¿Por qué "2" sale de último si el tiempo era CERO?
//
// Porque setTimeout es una operación DELEGADA: su función va a
// la cola, y la cola SOLO se atiende cuando el código síncrono
// terminó. El 0 no significa "ahora mismo"; significa:
// "lo antes posible, DESPUÉS de todo lo síncrono".
//
// 🔥 REPREGUNTA TÍPICA DE AVANZADO:
// "¿Y si el timeout es de 1ms y hay un bucle largo de por medio?"
// → Misma respuesta: aunque hubiera un bucle de 5 segundos entre
//   medio, el "2" saldría después, sí o sí. Descomenta esto y pruébalo:
//
// console.log("A");
// setTimeout(() => console.log("B"), 0);
// const inicio = Date.now();
// while (Date.now() - inicio < 3000) {} // bucle síncrono de 3 seg
// console.log("C");
// // Salida: A, (3 seg de espera), C, B
//
// → Siguiente archivo: 02-promesa.js (¿cómo escribo código que
//   use un valor que TODAVÍA no existe?)
