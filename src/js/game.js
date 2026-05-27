/**
 * GAME CONTROLLER - game.js
 * Flujo: Home → Stage1 → Stage2 (mapa) → Goal → Stage3 (trivia) → Final
 *        En Stage2: Goal1=房東 (diálogo) → Goal2=藥局 (fin mapa)
 * SIN temporizador en Stage1 ni Stage3
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

  // ── Timer tick: solo para stage2 display ────────────────────
  function _onTick(fmt, sec) {
    const el = $("stage2-timer");
    if (el) {
      el.textContent = fmt;
      el.classList.toggle("urgent", sec <= 30);
    }
  }

  // ── HOME ────────────────────────────────────────────────────
  function showHome() {
    Timer.stop();
    MapGame.stop();
    _hideDialog();
    _hideCorrectPopup();
    _state.trivia.index = 0;
    _showOnly("screen-home");

  }

  // ── STAGE 1 — SIN temporizador ──────────────────────────────
  function showStage1() {
    const cfg = GAME_CONFIG.stage1;
    _showOnly("screen-stage1");

    $("s1-image").src = cfg.image;
    $("s1-image").alt = cfg.imageAlt;
    $("s1-continue").style.display = "none";
    $("s1-back").style.display     = "none";

    const textEl = $("s1-text");
    textEl.textContent = "";
    textEl.classList.remove("typing-done", "typing-active");

    if (_state.stage1CancelTyping) _state.stage1CancelTyping();
    _state.stage1CancelTyping = Typewriter.type(
      textEl, cfg.typingText, cfg.typingSpeed || 40,
      () => {
        $("s1-continue").style.display = "inline-flex";
        $("s1-back").style.display     = "inline-flex";
      }
    );
  }

  // ── STAGE 2 — mapa ──────────────────────────────────────────
  function showStage2() {
    const cfg = GAME_CONFIG.stage2;
    _showOnly("screen-stage2");

    const mapVideo = $("s2-map-video");
    mapVideo.src = cfg.mapImage;

    const char = $("s2-character");
    char.src = cfg.characterImage;

    MapGame.init({
      config:       cfg,
      mapContainer: $("s2-map-container"),
      character:    char,
      onGoal1:      _onReachLandlord,
      onGoal2:      _onReachPharmacy,
    });

    if (mapVideo.readyState >= 3) {
      MapGame.start();
    } else {
      mapVideo.onloadeddata = () => MapGame.start();
    }
    Music.play("map");
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
    Timer.stop();
    _showOnly("screen-goal");
  }

  // ── CORRECT POPUP ────────────────────────────────────────────
  function _showCorrectPopup(onDone) {
    const popup = $("correct-popup");
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      popup.classList.remove("active");
      popup.setAttribute("aria-hidden", "true");
      onDone();
    }, 1600);
  }

  function _hideCorrectPopup() {
    const popup = $("correct-popup");
    if (!popup) return;
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
  }

  // ── STAGE 3 — trivia SIN temporizador ───────────────────────
  function showStage3(index) {
    const questions = GAME_CONFIG.stage3.questions;
    if (index >= questions.length) { showFinal(); return; }

    _state.trivia.index = index;
    const q = questions[index];

    if (_state.trivia.cancelTyping) { _state.trivia.cancelTyping(); _state.trivia.cancelTyping = null; }

    _showOnly("screen-stage3");

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
    if (chosen === q.correctAnswer) {
      $("s3-btn-a").disabled = true;
      $("s3-btn-b").disabled = true;
      _showCorrectPopup(() => {
        $("s3-btn-a").disabled = false;
        $("s3-btn-b").disabled = false;
        showStage3(_state.trivia.index + 1);
      });
    } else {
      showWrong();
    }
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
    Music.play("final");
  }

  // ── WRONG ───────────────────────────────────────────────────
  function showWrong() {
    Timer.stop(); MapGame.stop(); _hideDialog();
    _showOnly("screen-wrong");
    const x = $("wrong-x");
    x.classList.remove("animate");
    void x.offsetWidth;
    x.classList.add("animate");
    Music.stop();
  }

  // ── BIND EVENTS ─────────────────────────────────────────────
function _bind() {
  // Desbloquea audio en el primer click del usuario
 
  $("btn-start").addEventListener("click", showStage1);
  $("s1-back").addEventListener("click", showHome);
  $("s1-continue").addEventListener("click", showStage2);
  $("s2-back").addEventListener("click", () => { MapGame.stop(); showHome(); });
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
