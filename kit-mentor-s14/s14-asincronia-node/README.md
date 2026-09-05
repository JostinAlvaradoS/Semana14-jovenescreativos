# S14 · Asincronía, API pública y Node.js — Recorrido guiado
**Jóvenes creaTIvos 2026 · Track Avanzado · 120 min · Kit del mentor**

Archivos numerados en el orden del recorrido, con TODA la explicación en comentarios. Cada archivo abre con un banner que dice **DÓNDE corre** (🟢 terminal · 🔵 navegador · 🟣 servidor+navegador) y termina con un "→ Siguiente".

## 🗺️ EL MAPA DE ENTORNOS (la idea que ordena toda la sesión)

```
 PASOS 00-03 · JavaScript "puro"
 ┌─────────────────────────────┐
 │  🟢 TERMINAL: node paso.js  │   Node aquí SOLO ejecuta el archivo
 │  (correría igual en la      │   y termina. Aún no es servidor.
 │   consola del navegador)    │   Aprendemos: hilo, event loop,
 └─────────────────────────────┘   promesas, async/await.

 PASO 04 · fetch — somos EL CLIENTE
 ┌──────────────┐   petición    ┌──────────────────┐
 │ 🔵 NAVEGADOR │ ────────────► │ SERVIDOR DE OTRO │
 │  (tu página, │ ◄──────────── │    (PokéAPI,     │
 │  Live Server)│   respuesta   │   en internet)   │
 └──────────────┘               └──────────────────┘

 PASO 05 · el mundo file:// — NO HAY servidor
 ┌──────────────────────────────┐
 │ 🔵 NAVEGADOR lee un ARCHIVO  │   Nadie responde. Nadie más
 │ del disco (file:///...)      │   puede verla. La bisagra.
 └──────────────────────────────┘

 PASOS 06-07 · somos EL SERVIDOR (dos programas a la vez)
 ┌──────────────┐   petición    ┌─────────────────────┐
 │ 🔵 NAVEGADOR │ ────────────► │ 🟣 TU TERMINAL      │
 │  (cliente:   │ ◄──────────── │ node server.js      │
 │  localhost:  │   respuesta   │ Node queda VIVO,    │
 │  3000)       │               │ escuchando y        │
 └──────────────┘               │ respondiendo        │
                                └─────────────────────┘
```

**La frase que lo amarra:** en el paso 04 fuimos el cliente que pide (a PokéAPI); en el 06 nos pasamos al otro lado: somos el servidor que responde. Node es el mismo en ambos mundos — lo que cambia es su ROL: de "ejecutar y terminar" (00-03) a "quedarse vivo escuchando" (06-07).

## La ruta

| # | Archivo | Entorno | Idea central | Minuto | Cómo correr |
|---|---------|---------|--------------|--------|-------------|
| 0 | `00-sincrono-y-el-problema.js` | 🟢 terminal | Un solo hilo + analogía del restaurante | 00:15 | `node 00-sincrono-y-el-problema.js` |
| 1 | `01-event-loop.js` | 🟢 terminal | Event loop y el reto 1, 3, 2 | 00:20 | Predicción al chat → `node 01-event-loop.js` |
| 2 | `02-promesa.js` | 🟢 terminal | Promesas: estados, .then/.catch/.finally | 00:25 | `node 02-promesa.js` (luego `exito=false`) |
| 3 | `03-async-await.js` | 🟢 terminal | Refactor legible + 3 reglas + Promise.all | 00:40 | `node 03-async-await.js` |
| 4 | `04-fetch/` | 🔵 navegador | Somos el CLIENTE: dos awaits (sobre 📬 y carta), DOM | 00:53 | `index.html` con Live Server, consola F12 |
| 5 | `05-sin-node/` | 🔵 navegador (file://) | 🌉 BISAGRA: nadie responde, nadie más la ve | 01:23 | `index.html` con DOBLE CLIC, mirar la barra de direcciones |
| 6 | `06-servidor/` | 🟣 terminal + navegador | Somos el SERVIDOR: Node escucha y responde | 01:27 | `cd 06-servidor` → `npm init -y` → `node server.js` → localhost:3000 |
| 7 | `07-servidor-html/` | 🟣 terminal + navegador | Content-Type: responder HTML + mapa de cierre | 01:44 | `node server-html.js` (DEMO, sin entregable) |

## El momento bisagra (paso 5 → 6)
1. Abrir `05-sin-node/index.html` con **doble clic** → barra de direcciones: `file:///...` — "el navegador lee un archivo de MI disco".
2. Las tres verdades: todo corre en tu máquina · nadie más la ve · nadie responde.
3. Pregunta puente: *"¿Y si mi cliente necesita verla desde SU celular?"* → falta un programa encendido que RESPONDA: un servidor.
4. Construir `06-servidor/server.js`. Cierre visual: la barra pasa de `file:///...` a `http://localhost:3000` — de "leer un archivo" a "recibir una respuesta".

En `04-fetch/soluciones/` están los 3 niveles del reto (mínimo/medio/extendido). Para probarlos, cambiar el `src` del `<script>` en `04-fetch/index.html`.

## Antes de la sesión
- [ ] `node -v` funciona donde compartes pantalla
- [ ] Recorrer los 8 pasos completos una vez
- [ ] https://pokeapi.co/api/v2/pokemon/pikachu responde en el navegador
- [ ] Puerto 3000 libre · Live Server instalado en VS Code

## Chuleta de errores
| Error | Causa | Solución |
|---|---|---|
| `Cannot read properties of undefined` | Falta un `await` | Revisar cada llamada asíncrona |
| `Promise {pending}` en consola | Miras la promesa, no su valor | Falta `await` |
| `Unexpected token 'await'` | `await` fuera de función `async` | Marcar la función como `async` |
| `Failed to fetch` | URL mal escrita o CORS | Probar la URL directo en el navegador |
| `EADDRINUSE` | Puerto 3000 ocupado | Ctrl+C al proceso anterior o usar 3001 |
| `document is not defined` (en Node) | Corriste código de navegador con `node` | Los pasos 🔵 se abren en el navegador, no en terminal |

## Recordatorios críticos
1. Solo track **Avanzado**. 2. Bloqueos de Git → mentoría entre semana. 3. Bloque 2 no es repaso de S13. 4. Error #1: el segundo `await` en `respuesta.json()`. 5. **NO Express** (S15). 6. Paso 7 es demo sin entregable. 7. Pausa activa = detectar rezagados de fetch.
