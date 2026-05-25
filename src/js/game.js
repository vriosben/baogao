/**
 * GAME CONTROLLER - game.js
 * Flujo: Home → Stage1 → Stage2 (mapa) → Goal → Stage3 (trivia) → Final
 *        En Stage2: Goal1=房東 (diálogo) → Goal2=藥局 (fin mapa)
 */

const Game = (() => {

  let _state = {
    trivia: { index: 0, cancelTyping: null },
    stage1CancelTyping: null,
    finalCancelTyping:  null,
    dialogCancelTyping: null,
  };

  const $ = id => document.getElementById(id);

  // ── Screen switcher ─────────────────────────────────────────
  function _showOnly(id) {
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove("active");
      s.setAttribute("aria-hidden", "true");
    });
    const t = $(id);
    if (t) { t.classList.add("active"); t.setAttribute("aria-hidden", "false"); }
  }

  // ── Timer: update every display that shows the countdown ────
  const TIMER_ELS = ["s1-timer-display", "stage2-timer", "stage3-timer"];
  function _onTick(fmt, sec) {
    TIMER_ELS.forEach(id => {
      const el = $(id); if (!el) return;
      el.textContent = fmt;
      el.classList.toggle("urgent", sec <= 30);
    });
  }

  // ── HOME ────────────────────────────────────────────────────
  function showHome() {
    Timer.stop();
    MapGame.stop();
    _hideDialog();
    _state.trivia.index = 0;
    _showOnly("screen-home");
  }

  // ── STAGE 1 ─────────────────────────────────────────────────
  function showStage1() {
    const cfg = GAME_CONFIG.stage1;
    _showOnly("screen-stage1");

    $("s1-image").src = cfg.image;
    $("s1-image").alt = cfg.imageAlt;
    $("s1-continue").style.display = "none";
    $("s1-back").style.display     = "none";
    $("s1-timer-display").classList.add("visible");

    const textEl = $("s1-text");
    textEl.textContent = "";
    textEl.classList.remove("typing-done", "typing-active");

    // Init & start timer
    Timer.init({
      duration: GAME_CONFIG.timerDuration,
      onTick:   _onTick,
      onExpire: showWrong,
    });
    Timer.start();

    // Typing
    if (_state.stage1CancelTyping) _state.stage1CancelTyping();
    _state.stage1CancelTyping = Typewriter.type(
      textEl, cfg.typingText, cfg.typingSpeed || 40,
      () => {
        $("s1-continue").style.display = "inline-flex";
        $("s1-back").style.display     = "inline-flex";
        $("s1-timer-display").classList.remove("visible");
      }
    );
  }

  // ── STAGE 2 — mapa ──────────────────────────────────────────
  function showStage2() {
    const cfg = GAME_CONFIG.stage2;
    _showOnly("screen-stage2");
    $("stage2-timer").textContent = Timer.getFormatted();

    // Reset & load map image
    const mapImg = $("s2-map-img");
    mapImg.src = ""; void mapImg.offsetWidth;
    mapImg.src = cfg.mapImage;

    const char = $("s2-character");
    char.src = cfg.characterImage;

    MapGame.init({
      config:       cfg,
      mapContainer: $("s2-map-container"),
      character:    char,
      onGoal1:      _onReachLandlord,   // primera parada: 房東
      onGoal2:      _onReachPharmacy,   // segunda parada: 藥局
    });

    // Wait for map image to load before starting (avoids scale=0 glitch)
    if (mapImg.complete) {
      MapGame.start();
    } else {
      mapImg.onload = () => MapGame.start();
    }
  }

  // ── LANDLORD REACHED — show dialog ──────────────────────────
  function _onReachLandlord() {
    const cfg    = GAME_CONFIG.stage2.landlordDialog;
    const dlg    = $("landlord-dialog");
    const textEl = $("dialog-text");

    textEl.textContent = "";
    textEl.classList.remove("typing-done", "typing-active");
    $("dialog-continue").style.display = "none";

    dlg.classList.add("active");
    dlg.setAttribute("aria-hidden", "false");

    if (_state.dialogCancelTyping) _state.dialogCancelTyping();
    _state.dialogCancelTyping = Typewriter.type(
      textEl, cfg.text, 50,
      () => { $("dialog-continue").style.display = "inline-flex"; }
    );
  }

  function _hideDialog() {
    const dlg = $("landlord-dialog");
    if (!dlg) return;
    dlg.classList.remove("active");
    dlg.setAttribute("aria-hidden", "true");
    if (_state.dialogCancelTyping) { _state.dialogCancelTyping(); _state.dialogCancelTyping = null; }
  }

  // ── PHARMACY REACHED — go to goal screen ────────────────────
  function _onReachPharmacy() {
    MapGame.stop();
    _showOnly("screen-goal");
    $("goal-timer").textContent = Timer.getFormatted();
  }

  // ── STAGE 3 — trivia ────────────────────────────────────────
  function showStage3(index) {
    const questions = GAME_CONFIG.stage3.questions;
    if (index >= questions.length) { showFinal(); return; }

    _state.trivia.index = index;
    const q = questions[index];

    if (_state.trivia.cancelTyping) { _state.trivia.cancelTyping(); _state.trivia.cancelTyping = null; }

    _showOnly("screen-stage3");
    $("stage3-timer").textContent = Timer.getFormatted();

    // Force image reload
    const img = $("s3-image");
    img.src = ""; void img.offsetWidth;
    img.src = q.image; img.alt = q.imageAlt;

    const textEl = $("s3-text");
    textEl.innerHTML = "";
    textEl.classList.remove("typing-done", "typing-active");
    $("s3-options").style.display = "none";

    $("s3-btn-a").querySelector(".btn-label").textContent = q.optionA;
    $("s3-btn-b").querySelector(".btn-label").textContent = q.optionB;
    $("s3-btn-a").dataset.answer = "A";
    $("s3-btn-b").dataset.answer = "B";

    requestAnimationFrame(() => {
      _state.trivia.cancelTyping = Typewriter.type(
        textEl, q.typingText, q.typingSpeed || 45,
        () => { $("s3-options").style.display = "flex"; }
      );
    });
  }

  function _handleAnswer(chosen) {
    const q = GAME_CONFIG.stage3.questions[_state.trivia.index];
    if (chosen === q.correctAnswer) showStage3(_state.trivia.index + 1);
    else showWrong();
  }

  // ── FINAL ───────────────────────────────────────────────────
  function showFinal() {
    Timer.stop();
    const cfg = GAME_CONFIG.finalScreen;
    _showOnly("screen-final");

    const img = $("final-image");
    img.src = ""; void img.offsetWidth;
    img.src = cfg.image; img.alt = cfg.imageAlt;

    const textEl = $("final-text");
    textEl.innerHTML = "";
    textEl.classList.remove("typing-done", "typing-active");

    if (_state.finalCancelTyping) _state.finalCancelTyping();
    requestAnimationFrame(() => {
      _state.finalCancelTyping = Typewriter.type(textEl, cfg.typingText, cfg.typingSpeed || 50);
    });
  }

  // ── WRONG ───────────────────────────────────────────────────
  function showWrong() {
    Timer.stop(); MapGame.stop(); _hideDialog();
    _showOnly("screen-wrong");
    const x = $("wrong-x");
    x.classList.remove("animate");
    void x.offsetWidth;
    x.classList.add("animate");
  }

  // ── BIND EVENTS ─────────────────────────────────────────────
  function _bind() {
    $("btn-start").addEventListener("click", showStage1);

    $("s1-back").addEventListener("click", showHome);
    $("s1-continue").addEventListener("click", showStage2);

    $("s2-back").addEventListener("click", () => { MapGame.stop(); showHome(); });

    // Dialog: dismiss → resume map for goal 2
    $("dialog-continue").addEventListener("click", () => {
      _hideDialog();
      MapGame.resumeAfterGoal1();
    });

    $("goal-back").addEventListener("click", showHome);
    $("goal-continue").addEventListener("click", () => showStage3(0));

    $("s3-btn-a").addEventListener("click", () => _handleAnswer("A"));
    $("s3-btn-b").addEventListener("click", () => _handleAnswer("B"));
    $("s3-back").addEventListener("click", () => { Timer.stop(); showHome(); });

    $("final-back").addEventListener("click", showHome);
    $("wrong-back").addEventListener("click", showHome);
  }

  // ── INIT ────────────────────────────────────────────────────
  function init() {
    _bind();
    showHome();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => Game.init());
