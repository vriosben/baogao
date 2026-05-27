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

  // ─────────────────────────────────────────────
  //  第一關 STAGE 1 — Imagen + texto tipeado
  // ─────────────────────────────────────────────
  stage1: {
    image:    "assets/images/stage1-room.png",  
    imageAlt: "第一關場景",
    typingText: 
    `妹妹放假到花蓮去玩 。 
    Mèimei fàngjià dào Huālián qù wán. 

可是，她現在很不舒服，頭痛得非常厲害，也發燒了 。
Kěshì, tā xiànzài hěn bù shūfú, tóu tòng de fēicháng lìhài, yě fāshāo le. 

因為她生病了，所以她把火車票弄丟了，也沒辦法給房東付房租 。
Yīnwèi tā shēngbìng le, suǒyǐ tā bǎ huǒchēpiào nòngdiū le, yě méi bànfǎ gěi fángdōng fù fángzū.

我是她的哥哥 ，我應該幫助她。
Wǒ shì tā de gēge, wǒ yīnggāi bāngzhù tā. 

我先在臺北幫她付房間的房租 ，再到藥局去幫她買藥 。
Wǒ xiān zài Táiběi bāng tā fù fángjiān de fángzū , zài dào yàojú qù bāng tā mǎi yào. 

然後，我要坐火車到花蓮去接她 ，帶她平平安安地回臺北來 。
Ránhòu, wǒ yào zuò huǒchē dào Huālián qù jiē tā , dài tā píngpíng-ān'ān de huí Táiběi lái.

加油！(Jiā yóu！) 出發吧！`,
    typingSpeed: 100,
  },

  // ─────────────────────────────────────────────
  //  第二關 STAGE 2 — Mapa / dos objetivos
  // ─────────────────────────────────────────────
  stage2: {
    mapImage:       "assets/videos/mapa-animado.mp4", 
    characterImage: "assets/images/character.svg",

    // Posición inicial — círculo START (video 1280×720)
    characterStartX: 422,
    characterStartY: 626,
    characterSpeed:  6,

    // ── OBJETIVO 1: casa naranja del 房東 ────────
    goal1Zone: { x: 675, y: 310, width: 120, height: 130 },

    // ── Diálogo del 房東 (edita libremente) ─────
    landlordDialog: {
      text: `熱水騎器壞了！
Rèshuǐqì huài le！

明天我會來修。
Míngtiān wǒ huì lái xiū。

藥局在右上角！
Yàojú zài yòu shàngjiǎo！`,
      continueLabel:  "繼續",
      continuePinyin: "Jìxù",
    },

    // ── OBJETIVO 2: 藥局 esquina superior derecha
    goal2Zone: { x: 838, y: 25, width: 250, height: 170 },
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
        image:         "assets/images/stage3-question1.png",
        imageAlt:      "問題一",
        typingText:    `你妹妹哪裡不舒服？她哪裡痛？\nNǐ mèimei nǎlǐ bù shūfú？ Tā nǎlǐ tòng？\n`,
        typingSpeed:   45,
        optionA:       "頭痛  tóu tòng",
        optionB:       "肚子痛  dùzi tòng",
        correctAnswer: "A",
      },
      {
        image:         "assets/images/stage3-question2.png",
        imageAlt:      "問題二",
        typingText:    `她還有什麼生病的症狀？\nTā hái yǒu shéme shēngbìng de zhèngzhuàng？\n`,
        typingSpeed:   45,
        optionA:       "流鼻水  liú bíshuǐ",
        optionB:       "發燒  fāshāo",
        correctAnswer: "B",
      },
      {
        image:         "assets/images/stage3-question3.png",
        imageAlt:      "問題三",
        typingText:    `我建議她多喝水，每八個鐘頭吃這個藥。\nWǒ jiànyì tā duō hē shuǐ, měi bā ge zhōngtóu chī zhège yào.\n
        為了保護喉嚨，只能吃流質食物。
        Wèile bǎohù hóulóng, zhǐ chī liúzhì shíwù.\n

        Duìle, nǐ yào zěnme qù Huālián？\n
        對了，你要怎麼去花蓮？\n`,

        
        typingSpeed:   45,
        optionA:       "坐火車  zuò huǒchē",
        optionB:       "坐高鐵  zuò gāotiě",
        correctAnswer: "A", 
      },
      // ← AGREGA MÁS PREGUNTAS AQUÍ (copia el bloque de arriba)
    ],
  },

  // ─────────────────────────────────────────────
  //  最終畫面 FINAL SCREEN
  // ─────────────────────────────────────────────
  finalScreen: {
    image:       "assets/images/congratulations.png",
    imageAlt:    "恭喜",
    typingText:  `恭喜！(Gōngxǐ!)\n\n你已經準備好去接妹妹了！快一點！\nNǐ yǐjīng zhǔnbèi hǎo qù jiē mèimei le! Kuài yìdiǎn!\n\n這樣妹妹才能早點好。\nZhèyàng mèimei cáinéng zǎodiǎn hǎo.`,
    typingSpeed: 70,
  },
};

if (typeof module !== "undefined") module.exports = GAME_CONFIG;
