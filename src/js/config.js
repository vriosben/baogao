/**
 * =============================================================
 *  GAME CONFIG - config.js
 *  ← EDITA ESTE ARCHIVO para personalizar todo el contenido
 * =============================================================
 */

const GAME_CONFIG = {

  // ─────────────────────────────────────────────
  //  一般設定 GENERAL
  // ─────────────────────────────────────────────
  title:         "尋藥記",
  titlePinyin:   "Xún Yào Jì",
  timerDuration: 180,           // segundos totales (180 = 3 min)

  // ─────────────────────────────────────────────
  //  第一關 STAGE 1 — Imagen + texto tipeado
  // ─────────────────────────────────────────────
  stage1: {
    image:    "assets/images/stage1-scene.png",  // ← .jpg/.png/.svg
    imageAlt: "第一關場景",
    typingText: `白如玉病了！(Bái Rúyù bìng le！)

她發高燒，需要藥。
Tā fā gāoshāo，xūyào yào。

你必須穿越城市，找到藥局。
Nǐ bìxū chuānyuè chéngshì，zhǎodào yàojú。

首先，去找房東拿地址。
Shǒuxiān，qù zhǎo fángdōng ná dìzhǐ。

加油！(Jiā yóu！) 出發吧！`,
    typingSpeed: 40,
  },

  // ─────────────────────────────────────────────
  //  第二關 STAGE 2 — Mapa / dos objetivos
  // ─────────────────────────────────────────────
  stage2: {
    mapImage:       "assets/images/city-map.svg",
    characterImage: "assets/images/character.svg",

    // Posición inicial (coordenadas SVG del mapa 1000×580)
    characterStartX: 40,
    characterStartY: 462,
    characterSpeed:  5,

    // ── OBJETIVO 1: llegar al 房東 ──────────────
    // Coordenadas del bloque 房東 en el SVG (group translate + tamaño)
    goal1Zone: { x: 390, y: 225, width: 390, height: 185 },  // bloque 房東 centro

    // ── Diálogo del 房東 (edita libremente) ─────
    landlordDialog: {
      // Texto principal — puede ser tan largo como quieras
      text: `熱水壞了！
Rèshuǐ huài le！

明天我會來修。
Míngtiān wǒ huì lái xiū。

藥局在右上角！
Yàojú zài yòu shàngjiǎo！`,
      // Botón de continuar
      continueLabel:  "繼續",
      continuePinyin: "Jìxù",
    },

    // ── OBJETIVO 2: llegar a la 藥局 ────────────
    goal2Zone: { x: 800, y: 10, width: 190, height: 185 },  // bloque 藥局 top-right
  },

  // ─────────────────────────────────────────────
  //  第三關 STAGE 3 — Trivia 問答
  //
  //  ══ CÓMO AGREGAR MÁS PREGUNTAS ══
  //  Solo añadí un objeto más al array `questions`.
  //  Cada pregunta tiene:
  //    image        → ruta a la imagen (.svg/.jpg/.png)
  //    imageAlt     → texto alternativo
  //    typingText   → texto que se tipea (hanzi, pinyin, lo que quieras)
  //    typingSpeed  → ms por caracter (30=rápido, 60=lento)
  //    optionA      → texto del botón A (甲)
  //    optionB      → texto del botón B (乙)
  //    correctAnswer→ "A" o "B"
  //
  //  Ejemplo de pregunta extra:
  //  {
  //    image: "assets/images/stage3-question4.jpg",
  //    imageAlt: "問題四",
  //    typingText: `這個字怎麼讀？\n...`,
  //    typingSpeed: 45,
  //    optionA: "水 shuǐ",
  //    optionB: "火 huǒ",
  //    correctAnswer: "A",
  //  },
  // ─────────────────────────────────────────────
  stage3: {
    questions: [
      {
        image:         "assets/images/stage3-question1.svg",
        imageAlt:      "問題一",
        typingText:    `你 (nǐ) 這個字有幾畫？\nZhège zì yǒu jǐ huà？\n\n這個字的意思是「你」。`,
        typingSpeed:   45,
        optionA:       "五畫  wǔ huà",
        optionB:       "七畫  qī huà",
        correctAnswer: "B",
      },
      {
        image:         "assets/images/stage3-question2.svg",
        imageAlt:      "問題二",
        typingText:    `謝謝 (xièxiè) 是什麼意思？\nShì shénme yìsi？`,
        typingSpeed:   45,
        optionA:       "請  Qǐng",
        optionB:       "謝謝  Xièxiè",
        correctAnswer: "B",
      },
      {
        image:         "assets/images/stage3-question3.svg",
        imageAlt:      "問題三",
        typingText:    `「媽 mā」是第幾聲？\n"Mā" shì dì jǐ shēng？\n\n媽 mā — 麻 má — 馬 mǎ — 罵 mà`,
        typingSpeed:   45,
        optionA:       "第一聲（陰平）Dì yī shēng",
        optionB:       "第四聲（去聲）Dì sì shēng",
        correctAnswer: "A",
      },
      // ← AGREGA MÁS PREGUNTAS AQUÍ (copia el bloque de arriba)
    ],
  },

  // ─────────────────────────────────────────────
  //  最終畫面 FINAL SCREEN
  // ─────────────────────────────────────────────
  finalScreen: {
    image:       "assets/images/congratulations.svg",
    imageAlt:    "恭喜",
    typingText:  `恭喜！(Gōng xǐ！)\n\n你成功找到了藥局！\nNǐ chénggōng zhǎodào le yàojú！\n\n白如玉現在感覺好多了。\nBái Rúyù xiànzài gǎnjué hǎo duō le。\n\n繼續學習中文！(Jìxù xuéxí zhōngwén！)`,
    typingSpeed: 50,
  },
};

if (typeof module !== "undefined") module.exports = GAME_CONFIG;
