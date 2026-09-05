// ┌──────────────────────────────────────────────────────────┐
// │ 🟢 ENTORNO: TERMINAL (node archivo.js)                   │
// │ Esto es JavaScript "puro": correría IGUAL en la consola  │
// │ del navegador (F12). Usamos la terminal con Node solo    │
// │ como forma cómoda de ejecutar JS — aquí Node NO es       │
// │ servidor todavía, es solo "el que ejecuta el archivo".   │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 3 · PROMESAS: manejar "lo que va a llegar"
// Correr con: node 02-promesa.js
// 🎯 EN VIVO: correrlo, luego cambiar `exito` a false y volver a correr
// ============================================================
//
// Ya sabemos que las operaciones lentas terminan "después".
// La pregunta: ¿cómo escribo código que use un valor que
// TODAVÍA NO EXISTE?
//
// Respuesta: la PROMESA — un objeto que representa un valor futuro.
//
// 🧾 Es como el número que te dan en un local de comidas:
//    todavía no tienes tu comida, pero tienes un "comprobante"
//    de que llegará — o de que algo salió mal.
//
// Una promesa está SIEMPRE en uno de tres estados:
//   pending   → la operación aún no termina (tienes el número, esperas)
//   fulfilled → terminó bien, hay un valor (te entregaron la comida)
//   rejected  → terminó mal, hay un error (se acabó el producto)
//
// ⭐ DOS REGLAS DE ORO:
//   1. Una promesa SIEMPRE termina en fulfilled o rejected.
//      Nunca queda en el limbo.
//   2. Solo cambia de estado UNA vez. Cumplida no puede
//      "des-cumplirse": queda sellada (settled).

// ------------------------------------------------------------
// CREAR una promesa
// ------------------------------------------------------------
function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    // Simulamos una operación que tarda 1.5 segundos:
    setTimeout(() => {
      const exito = true; 

      if (exito) {
        resolve({ nombre: "Ana", rol: "admin" });
        // resolve(valor) = "terminé BIEN, aquí está el valor"
        //                → cumple la promesa → dispara el .then
      } else {
        reject("No se pudo obtener el usuario");
        // reject(error) = "terminé MAL, este es el error"
        //               → rechaza la promesa → dispara el .catch
      }
    }, 1500);
  });
}
// 💡 resolve y reject son funciones que TÚ llamas para decidir
//    el destino de la promesa.

// ------------------------------------------------------------
// CONSUMIR una promesa: .then / .catch / .finally
// ------------------------------------------------------------
obtenerUsuario()
  .then((usuario) => {

    console.log("Usuario:", usuario);
  // ⏰ "ejecuta esto en 0 milisegundos"
  })
  .catch((error) => {
  
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Operación terminada");
  });

obtenerUsuario()
  .then((usuario) => {

    console.log("Usuario2:", usuario);
  // ⏰ "ejecuta esto en 0 milisegundos"
  })
  .catch((error) => {
  
    console.error("Error2:", error);
  })
  .finally(() => {
    console.log("Operación terminada");
  });



// ------------------------------------------------------------
// PRUEBA MENTAL (hacerla con el grupo):
// Si exito = false, ¿qué sale?
// → "Error: No se pudo obtener el usuario" y "Operación terminada".
//   El .then SE SALTA por completo.
//
// → Siguiente archivo: 03-async-await.js (lo mismo, pero legible)
