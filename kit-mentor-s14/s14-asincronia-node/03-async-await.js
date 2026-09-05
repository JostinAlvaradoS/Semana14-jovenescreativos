// ┌──────────────────────────────────────────────────────────┐
// │ 🟢 ENTORNO: TERMINAL (node archivo.js)                   │
// │ Esto es JavaScript "puro": correría IGUAL en la consola  │
// │ del navegador (F12). Usamos la terminal con Node solo    │
// │ como forma cómoda de ejecutar JS — aquí Node NO es       │
// │ servidor todavía, es solo "el que ejecuta el archivo".   │
// └──────────────────────────────────────────────────────────┘
// ============================================================
// PASO 4 · async/await: LO MISMO, PERO LEGIBLE
// Correr con: node 03-async-await.js
// 🎯 EN VIVO: es la SOLUCIÓN del reto de refactorizar 02-promesa.js
// ============================================================
//
// El problema de .then: al encadenar varios pasos, el código se
// vuelve una escalera difícil de leer.
//
// async/await es EXACTAMENTE el mismo mecanismo de promesas por
// debajo (azúcar sintáctica), pero se escribe como código normal.
//
// EQUIVALENCIAS EXACTAS:
//   await             ↔  .then   (te da directamente el valor)
//   catch (try/catch) ↔  .catch
//   finally           ↔  .finally

// (misma función del archivo anterior)
function obtenerUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = true; // cambiar a false para ver el catch
      if (exito) {
        resolve({ nombre: "Ana", rol: "admin" });
      } else {
        reject("No se pudo obtener el usuario");
      }
    }, 1500);
  });
}


async function obtenerUsuarioAsync() {
  try {
    const usuario = await obtenerUsuario();
    // await = "espera aquí a que la promesa se cumpla,
    //          y guarda su VALOR en la variable"
    console.log("Usuario:", usuario);
  } catch (error) {
    // Si la promesa se RECHAZA, saltamos directo aquí:
    console.error("Error:", error);
  } finally {
    console.log("Operación terminada");
  }
}

obtenerUsuarioAsync();

// ------------------------------------------------------------
// ⭐ TRES REGLAS (producen los errores clásicos):
//
// 1. await SOLO se usa dentro de una función marcada `async`.
//    Si lo usas afuera → "Unexpected token 'await'"
//
// 2. El "espera" es solo DENTRO de esa función. El resto del
//    programa sigue corriendo — no se congela nada.
//    (El mesero de siempre: esta función queda en pausa,
//     él sigue atendiendo las demás mesas.)
//
// 3. Una función async SIEMPRE devuelve una promesa,
//    aunque tú retornes un número normal.
//
// ------------------------------------------------------------
// 🌱 PARA SEMBRAR SI EL GRUPO VA RÁPIDO (¡no desarrollar!):
// "¿Y si debo esperar DOS promesas que NO dependen entre sí?"
//
//   // ❌ En SERIE: tarda tiempo1 + tiempo2
//   //    (la 2ª ni siquiera ARRANCA hasta que la 1ª resolvió)
//   const usuario   = await obtenerUsuario();
//   const productos = await obtenerProductos();
//
//   // ✅ En PARALELO: tarda solo lo que dure la más lenta
//   const [usuario, productos] = await Promise.all([
//     obtenerUsuario(),
//     obtenerProductos()
//   ]);
//
// → Siguiente: carpeta 04-fetch/ (pedir datos a una API REAL)
