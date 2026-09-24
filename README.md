# Portafolio Base de Datos II — Aguirre Osores Piero (tema Dota 2)

## Estructura
```
MI Portafolio/
├── index.html       → Inicio (hero + minijuego)
├── sobreMi.html      → Sobre mí (ficha de héroe)
├── unidades.html      → Unidades del curso (árbol de talentos)
├── login.html         → Inicio de sesión (demo, sin backend)
├── css/style.css       → Todos los estilos
├── js/script.js        → Menú móvil
└── js/game.js          → Lógica del minijuego (canvas)
```

## Cómo verlo en tu PC
1. Abre la carpeta `MI Portafolio` en Visual Studio Code.
2. Instala la extensión **Live Server** (si no la tienes).
3. Clic derecho en `index.html` → **Open with Live Server**.

## Cómo publicarlo en GitHub Pages (igual que los ejemplos que me pasaste)
1. Crea un repositorio en GitHub, por ejemplo `portafolio-bd2`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (no dentro de una subcarpeta, salvo que ajustes las rutas).
3. Ve a **Settings → Pages**, en "Source" elige la rama `main` y carpeta `/root`.
4. Tu sitio quedará publicado en `https://TU-USUARIO.github.io/portafolio-bd2/`.

## Credenciales demo del login
- Usuario: `piero.aguirre`
- Contraseña: `bd2-2026`

(El login es solo una demostración visual, no valida contra un servidor real.)

## Acceso Admin / Invitado
Al abrir cualquier página aparece una pantalla para elegir tu rol:
- **Invitado**: solo puede ver el contenido (un clic, sin contraseña).
- **Administrador**: usuario `piero.aguirre`, contraseña `bd2-2026`. Puede agregar o quitar materiales en Unidades. Se define en `js/auth.js`.

El rol se recuerda mientras la pestaña sigue abierta (o de forma permanente si marcas "Recordarme"). Puedes cambiarlo en cualquier momento desde **Mi cuenta** o con el botón "Cambiar" de la barra de navegación.

## Cómo agregar tus trabajos en PDF a las Unidades (para que TODOS los vean)
1. Copia el archivo PDF dentro de `assets/pdfs/` (por ejemplo `assets/pdfs/unidad1-modelo-er.pdf`).
2. Abre `js/materiales.js` y agrega una línea dentro del arreglo de esa unidad:
   ```js
   1: [
     { titulo: 'Trabajo: Modelo E-R del proyecto', archivo: 'assets/pdfs/unidad1-modelo-er.pdf' }
   ],
   ```
3. Guarda y sube los cambios a GitHub (o revisa con Live Server). El enlace aparecerá automáticamente en `unidades.html`, dentro de la unidad correspondiente.

**Importante:** el botón "+ Agregar PDF" que ves dentro de `unidades.html` cuando entras como **Admin** es solo una vista previa rápida — lo que agregues ahí queda guardado únicamente en tu propio navegador (`localStorage`), no en el sitio publicado. Para que un PDF sea visible para cualquier visitante, siempre debes editar `js/materiales.js` como se explicó arriba.

## Personalizar
- Cambia textos de unidades en `unidades.html`.
- Cambia colores en las variables `:root` de `css/style.css`.
- Agrega tu foto real reemplazando el emoji 🧙 en `sobreMi.html` por una etiqueta `<img>` apuntando a `assets/tu-foto.jpg`.
