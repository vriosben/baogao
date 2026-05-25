/**
 * =============================================================
 *  TYPEWRITER MODULE - typewriter.js
 *  Efecto de texto tipeado, soporta chino / pinyin / español
 * =============================================================
 */

const Typewriter = (() => {

  /**
   * Inicia el efecto de tipeo
   * @param {HTMLElement} element - Elemento donde se muestra el texto
   * @param {string} text - Texto completo a tipear
   * @param {number} speed - Milisegundos por caracter
   * @param {Function} onComplete - Callback al terminar
   * @returns {Function} - Función para cancelar
   */
  function type(element, text, speed = 40, onComplete = () => {}) {
    element.textContent = "";
    element.classList.add("typing-active");

    let i = 0;
    let cancelled = false;
    // Handle unicode chars correctly (includes Chinese)
    const chars = [...text]; // spread handles multi-byte chars

    function typeNext() {
      if (cancelled) return;
      if (i < chars.length) {
        const ch = chars[i];
        if (ch === "\n") {
          element.appendChild(document.createElement("br"));
        } else {
          element.appendChild(document.createTextNode(ch));
        }
        i++;
        // Scroll into view as text grows
        element.scrollTop = element.scrollHeight;
        setTimeout(typeNext, speed);
      } else {
        element.classList.remove("typing-active");
        element.classList.add("typing-done");
        onComplete();
      }
    }

    setTimeout(typeNext, 100); // small initial delay

    return () => { cancelled = true; };
  }

  /**
   * Completa el texto instantáneamente (skip)
   */
  function complete(element, text) {
    element.innerHTML = "";
    const lines = text.split("\n");
    lines.forEach((line, idx) => {
      element.appendChild(document.createTextNode(line));
      if (idx < lines.length - 1) element.appendChild(document.createElement("br"));
    });
    element.classList.remove("typing-active");
    element.classList.add("typing-done");
  }

  return { type, complete };
})();
