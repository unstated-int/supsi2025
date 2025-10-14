(function () {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;

  /** Crea la griglia 24×60 e restituisce un Array di 1440 celle in ordine cronologico */

  function buildGrid() {
    const cells = [];
    for (let h = 0; h < 24; h++) {
      const row = document.createElement("div");
      row.className = "row";
      clockEl.appendChild(row);

      for (let m = 0; m < 60; m++) {
        const idx = h * 60 + m;
        const cell = document.createElement("div");
        cell.className = "cell";
        row.appendChild(cell);
        cells.push(cell);
      }
    }
    return cells;
  }

  const cells = buildGrid();
  const TOTAL_MIN = 24 * 60; // 1440

  /** Minuti trascorsi dall'inizio della giornata locale */
  function minutesSinceStartOfDay(d = new Date()) {
    return d.getHours() * 60 + d.getMinutes();
  }

  /** Aggiorna lo stato delle celle in base all’ora corrente */
  function paintNow() {
    const now = new Date();
    const elapsed = minutesSinceStartOfDay(now); // 0..1439 (minuto corrente)
    // Se è dopo mezzanotte (es. 00:05) e ieri avevamo celle piene, pulisci tutto
    for (let i = 0; i < TOTAL_MIN; i++) {
      const c = cells[i];
      if (!c) continue;
      if (i < elapsed) {
        c.classList.add("filled");
      } else {
        c.classList.remove("filled");
      }
    }
    //remove aria-current="true" from all cells
    for (const c of cells) c.removeAttribute("aria-current");
    //add aria-current="true" to the current cell
    // Evidenzia il minuto corrente (l’indice "elapsed")
    const current = cells[Math.min(elapsed, TOTAL_MIN - 1)];
    if (current) current.setAttribute("aria-current", "true");
  }

  /** Re-sync quando torni in foreground o cambi visibilità della pagina */
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) paintNow();
  });

  /** Reset a mezzanotte: calcola i ms fino alla prossima mezzanotte locale */
  function scheduleMidnightReset() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const ms = midnight - now;
    setTimeout(() => {
      // A mezzanotte pulisci e riparti
      for (const c of cells) c.classList.remove("filled", "aria-current");
      paintNow();
      scheduleMidnightReset(); // programma il prossimo
    }, ms);
  }

  function showClock() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell, i) => {
      setTimeout(() => {
        cell.style.opacity = "1";
      }, 5 * i);
    });
  }

  //dati ricevuti da render.js
  window.addEventListener("batteryUpdate", (e) => {
    // const data = e.detail;
    // let cells = document.querySelectorAll(".cell");
  });

  window.addEventListener("cpuLoadUpdate", (e) => {
    const data = e.detail;
    let cells = document.querySelectorAll(".cell");
    let dataValue = map(data.currentLoad, 0, 100, 0, 360);
    cells.forEach((cell, i) => {
      cell.style.transform = `rotate(${dataValue}deg)`;
    });
  });

  //create a map function from 0 to 360 
  function map(value, min, max, minOut, maxOut) {
    return (value - min) / (max - min) * (maxOut - minOut) + minOut;
  }

  // Avvio
  paintNow();
  setTimeout(() => {
    showClock();
  }, 1000);
  scheduleMidnightReset();
})();
