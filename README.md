# 项目示例 — Proyecto Ejemplo
## Guía de edición y estructura del proyecto

---

## 📁 Estructura de carpetas

```
proyecto-ejemplo/
│
├── index.html                  ← Página principal (único HTML, todo embebido)
│
├── src/
│   ├── css/
│   │   └── styles.css          ← Todos los estilos (estética Mario Bros)
│   │
│   └── js/
│       ├── config.js           ← ⭐ EDITA AQUÍ todo el contenido del juego
│       ├── timer.js            ← Módulo del temporizador
│       ├── typewriter.js       ← Módulo del efecto de tipeo
│       ├── map.js              ← Módulo del movimiento en el mapa
│       └── game.js             ← Controlador principal del juego
│
└── assets/
    └── images/
        ├── stage1-scene.svg       ← Imagen de la Etapa 1 (escena)
        ├── stage1-intro.svg       ← (reservada)
        ├── city-map.svg           ← Mapa de la ciudad (Etapa 2)
        ├── character.svg          ← Personaje que se mueve en el mapa
        ├── stage3-question1.svg   ← Imagen Pregunta 1 (Etapa 3)
        ├── stage3-question2.svg   ← Imagen Pregunta 2
        ├── stage3-question3.svg   ← Imagen Pregunta 3
        ├── congratulations.svg    ← Pantalla de felicitaciones final
        └── wrong-answer.svg       ← (reservada, la X se anima via CSS)
```

---

## ✏️ Cómo editar el contenido

### 1. Textos que se tipean y preguntas → `src/js/config.js`

Este es el archivo principal de configuración. Allí puedes cambiar:

- **Título** de la pantalla principal (chino + pinyin + español)
- **Duración del temporizador** (`timerDuration`, en segundos)
- **Texto de la Etapa 1** (`stage1.typingText`)
- **Preguntas de la Etapa 3** (`stage3.questions`) — cada pregunta tiene:
  - `image`: ruta a la imagen
  - `typingText`: texto que se tipea
  - `optionA` / `optionB`: texto de los botones
  - `correctAnswer`: `"A"` o `"B"`
- **Texto final** (`finalScreen.typingText`)

### 2. Imágenes → `assets/images/`

Reemplaza cualquier `.svg` por una imagen `.jpg` o `.png`:
- En `config.js`, cambia la ruta: `image: "assets/images/mi-imagen.jpg"`
- Los SVGs incluidos son editables directamente en cualquier editor de texto o Inkscape

### 3. Mapa de la ciudad → `assets/images/city-map.svg`

El SVG del mapa tiene comentarios internos que explican cada zona:
- `id="start-point"` → punto de inicio del personaje
- `id="goal-point"` → zona META (rectángulo dorado)
- En `config.js`, ajusta `stage2.characterStartX/Y` y `stage2.goalZone` para que coincidan con el SVG

### 4. Personaje → `assets/images/character.svg`

SVG de 32×40px. Puedes reemplazarlo por cualquier PNG/SVG del mismo tamaño.
En `config.js`: `characterImage: "assets/images/mi-personaje.png"`

---

## 🎮 Flujo del juego

```
HOME
  ↓ [Comenzar]
ETAPA 1 — Imagen + texto tipeado + timer arranca
  ↓ [Continuar]
ETAPA 2 — Mapa de ciudad, mover personaje con ↑↓←→
  ↓ [Llegar a la META ⭐]
PANTALLA META — ¡Llegaste!
  ↓ [Continuar]
ETAPA 3 — Trivia (N preguntas, configurable)
  ↓ [Respuesta correcta en todas]
PANTALLA FINAL — ¡Felicitaciones! + texto tipeado

--- ERRORES ---
Si el tiempo llega a 0:00  → PANTALLA INCORRECTA
Si se elige respuesta mala → PANTALLA INCORRECTA
[Volver a la página principal] en cualquier pantalla de error/vuelta
```

---

## 🌏 Soporte de tipografía china

El proyecto usa **Noto Serif SC** (Google Fonts), que soporta:
- **Hanzi** (caracteres chinos): 你好、谢谢、项目示例
- **Pinyin con tonos**: nǐ hǎo, xiè xie, pīnyīn
- **Español** y caracteres latinos normales

Para que los tonos del pinyin se vean bien, escríbelos directamente en `config.js`:
`ā á ǎ à / ē é ě è / ī í ǐ ì / ō ó ǒ ò / ū ú ǔ ù / ǖ ǘ ǚ ǜ`

---

## 🖥️ Cómo abrir el juego

**Opción 1 — Servidor local (recomendado):**
```bash
# Con Python:
cd proyecto-ejemplo
python3 -m http.server 8080
# Luego abrir: http://localhost:8080
```

**Opción 2 — Extensión VS Code:**
Usa "Live Server" (ritwickdey.liveserver) y haz clic en "Go Live"

> ⚠️ No abrir `index.html` directo con doble clic (file://) porque
> los navegadores bloquean la carga de SVGs locales por seguridad.

---

## 🎨 Personalizar estética

Los colores y fuentes están en `src/css/styles.css` en la sección `:root`:
```css
:root {
  --color-red:   #e8001c;   /* Mario rojo */
  --color-gold:  #fbd000;   /* Dorado / bloques */
  --color-blue:  #149be0;   /* Azul */
  --color-green: #00a830;   /* Verde */
  --font-pixel:  'Press Start 2P', monospace;
  --font-chinese:'Noto Serif SC', serif;
}
```
