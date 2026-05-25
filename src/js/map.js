/**
 * MAP MODULE - map.js
 *
 * Dos objetivos:
 *   Goal 1 → 房東 (白如玉的家): muestra diálogo → jugador continúa
 *   Goal 2 → 藥局 終點: fin del mapa, va a trivia
 *
 * El personaje (character.svg) se posiciona sobre el mapa via CSS absolute.
 * Las coordenadas son en el espacio del SVG viewBox (1000×580).
 */

const MapGame = (() => {
  let _config       = null;
  let _character    = null;
  let _mapContainer = null;
  let _posX = 0, _posY = 0;
  let _keys         = {};
  let _animFrame    = null;
  let _active       = false;
  let _goal1Done    = false;   // true after landlord dialog dismissed
  let _goal2Done    = false;
  let _onGoal1      = null;
  let _onGoal2      = null;

  // SVG viewBox size — must match city-map.svg viewBox
  const MAP_W = 1000;
  const MAP_H = 580;

  let _scaleX = 1;
  let _scaleY = 1;

  function _updateScale() {
    const img = _mapContainer && _mapContainer.querySelector(".map-svg");
    if (!img) return;
    const r = img.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    _scaleX = r.width  / MAP_W;
    _scaleY = r.height / MAP_H;
  }

  function _renderCharacter() {
    if (!_character) return;
    _character.style.left = Math.round(_posX * _scaleX) + "px";
    _character.style.top  = Math.round(_posY * _scaleY) + "px";
  }

  function _inZone(zone) {
    // Check if character centre overlaps with zone rectangle
    const cx = _posX + 20; // half of 40px character
    const cy = _posY + 20;
    return cx >= zone.x && cx <= zone.x + zone.width &&
           cy >= zone.y && cy <= zone.y + zone.height;
  }

  function _gameLoop() {
    if (!_active) return;

    const speed = _config.characterSpeed || 5;
    let moved = false;

    if (_keys["ArrowUp"]    || _keys["w"] || _keys["W"]) { _posY -= speed; moved = true; }
    if (_keys["ArrowDown"]  || _keys["s"] || _keys["S"]) { _posY += speed; moved = true; }
    if (_keys["ArrowLeft"]  || _keys["a"] || _keys["A"]) { _posX -= speed; moved = true; }
    if (_keys["ArrowRight"] || _keys["d"] || _keys["D"]) { _posX += speed; moved = true; }

    // Clamp inside map
    _posX = Math.max(0, Math.min(MAP_W - 40, _posX));
    _posY = Math.max(0, Math.min(MAP_H - 40, _posY));

    if (moved) {
      _updateScale();
      _renderCharacter();

      // Goal 1: reach landlord (only if not visited yet)
      if (!_goal1Done && _inZone(_config.goal1Zone)) {
        _active = false;
        cancelAnimationFrame(_animFrame);
        setTimeout(() => _onGoal1(), 200);
        return;
      }

      // Goal 2: reach pharmacy (only after goal 1 was visited)
      if (_goal1Done && !_goal2Done && _inZone(_config.goal2Zone)) {
        _goal2Done = true;
        _active = false;
        cancelAnimationFrame(_animFrame);
        setTimeout(() => _onGoal2(), 200);
        return;
      }
    }

    _animFrame = requestAnimationFrame(_gameLoop);
  }

  function init({ config, mapContainer, character, onGoal1, onGoal2 }) {
    _config       = config;
    _mapContainer = mapContainer;
    _character    = character;
    _onGoal1      = onGoal1 || (() => {});
    _onGoal2      = onGoal2 || (() => {});
    _goal1Done    = false;
    _goal2Done    = false;
    _posX = config.characterStartX;
    _posY = config.characterStartY;
    _updateScale();
    _renderCharacter();
  }

  function start() {
    _active = true;
    _keys   = {};
    document.addEventListener("keydown", _onKeyDown);
    document.addEventListener("keyup",   _onKeyUp);
    window.addEventListener("resize",    _onResize);
    _animFrame = requestAnimationFrame(_gameLoop);
  }

  /** Called after landlord dialog is closed — mark goal1 done and resume */
  function resumeAfterGoal1() {
    _goal1Done = true;
    _active    = true;
    _animFrame = requestAnimationFrame(_gameLoop);
  }

  function stop() {
    _active = false;
    cancelAnimationFrame(_animFrame);
    document.removeEventListener("keydown", _onKeyDown);
    document.removeEventListener("keyup",   _onKeyUp);
    window.removeEventListener("resize",    _onResize);
  }

  function _onResize() { _updateScale(); _renderCharacter(); }
  function _onKeyDown(e) {
    _keys[e.key] = true;
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
  }
  function _onKeyUp(e) { _keys[e.key] = false; }

  return { init, start, stop, resumeAfterGoal1 };
})();
