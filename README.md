# 尋藥記 — Instrucciones

## Estructura de carpetas
```
xunyaoji/
├── index.html
├── src/
│   ├── css/styles.css
│   └── js/
│       ├── config.js   ← edita aquí el contenido del juego
│       ├── game.js
│       ├── map.js
│       ├── timer.js
│       └── typewriter.js
└── assets/
    ├── images/         ← agrega tus imágenes aquí
    │   ├── character.svg
    │   ├── stage1-scene.png
    │   ├── stage3-question1.svg
    │   ├── stage3-question2.svg
    │   ├── stage3-question3.svg
    │   ├── congratulations.svg
    │   └── image_1.png   (fondo de pantalla principal)
    └── videos/
        └── mapa-animado.mp4  ✅ incluido
```

## Imágenes faltantes
Agrega tus propias imágenes en `assets/images/`.
Los nombres deben coincidir con lo que está en `config.js`.

## Cambios realizados
- ✅ Mapa cambiado a video (mapa-animado.mp4)
- ✅ Temporizador de 3 min eliminado de la trivia
- ✅ Popup "對！正確" al responder correctamente (estilo Mario)
- ✅ Tamaños agrandados para proyección en pantalla grande
- ✅ Pantalla principal con botones grandes y visibles
- ✅ Lógica del mapa: abuelo (房東) primero → farmacia (藥局) segundo

## Cómo abrir
Abre `index.html` en tu navegador.
Para proyectar, conecta a la pantalla y pon el navegador en pantalla completa (F11).
