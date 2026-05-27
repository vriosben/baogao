/**
 * =============================================================
 *  TIMER MODULE - timer.js
 *  Maneja el temporizador del juego
 * =============================================================
 */

const Timer = (() => {
  let _seconds = 0;
  let _interval = null;
  let _onTick = null;
  let _onExpire = null;
  let _started = false;

  function _format(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function init({ duration, onTick, onExpire }) {
    _seconds = duration;
    _onTick = onTick || (() => {});
    _onExpire = onExpire || (() => {});
    _started = false;
    // Render initial state
    _onTick(_format(_seconds), _seconds);

  }

  function start() {
    if (_interval) stop();
    _started = true;
    _interval = setInterval(() => {
      _seconds--;
      _onTick(_format(_seconds), _seconds);
      if (_seconds <= 0) {
        stop();
        _onExpire();
      }
    }, 1000);
  }

  function stop() {
    if (_interval) {
      clearInterval(_interval);
      _interval = null;
    }
  }

  function reset() {
    stop();
    _seconds = 0;
    _started = false;
  }

  function isRunning() {
    return _interval !== null;
  }

  function getFormatted() {
    return _format(_seconds);
  }

  return { init, start, stop, reset, isRunning, getFormatted };
})();
