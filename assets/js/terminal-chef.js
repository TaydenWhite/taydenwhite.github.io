// Runs Terminal Chef (a Python terminal game) in the browser: Pyodide compiles
// CPython to WebAssembly, xterm.js provides the terminal, and browser_main.py
// drives the game's own menu state machine one keypress at a time.
//
// Nothing loads until the visitor clicks Play, because the runtime is ~11 MB.
(function () {
  const root = document.querySelector("[data-terminal-chef]");
  if (!root) return;

  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/";
  const CDN = [
    { css: "https://cdn.jsdelivr.net/npm/@xterm/xterm@6.0.0/css/xterm.css", sri: "sha384-n2n7twoohnW+d3myBKaUgl7DSiwidw6MkQy9oesGzkPpMjejKRR3XlnD+5yCdtBD" },
    { js: "https://cdn.jsdelivr.net/npm/@xterm/xterm@6.0.0/lib/xterm.js", sri: "sha384-f/1U6Z9wM4D71a5eRXEZnyOTMOvjqxr2XLwh+Go1OvIl3L3tOcvUrzudnhbECwl4" },
    { js: "https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.11.0/lib/addon-fit.js", sri: "sha384-txoiwu4RR2GD3qySbaj+BbzibkLbSJRcfqGYMu6z1EqHil4A2dyBiBW5dlacG6OR" },
    { js: PYODIDE_URL + "pyodide.js", sri: "sha384-4X7gSPzQ4pHfjTE5aBEPJAQcHu55sciq+NWO3OUOZ3zHSJhn4te9CBjUyRSr+nei" },
  ];

  const screen = root.querySelector("[data-screen]");
  const startButton = root.querySelector("[data-start]");
  const restartButton = root.querySelector("[data-restart]");
  const status = root.querySelector("[data-status]");
  const keypad = root.querySelector("[data-keypad]");
  const files = JSON.parse(root.querySelector("[data-files]").textContent);

  let term;
  let chef;      // the browser_main Python module
  let session;   // the active browser_main.Session
  let booting = false;

  const say = (message) => { status.textContent = message; };

  function load(asset) {
    return new Promise((resolve, reject) => {
      const el = document.createElement(asset.css ? "link" : "script");
      if (asset.css) {
        el.rel = "stylesheet";
        el.href = asset.css;
      } else {
        el.src = asset.js;
      }
      el.integrity = asset.sri;
      el.crossOrigin = "anonymous";
      el.onload = resolve;
      el.onerror = () => reject(new Error("Could not load " + (asset.css || asset.js)));
      document.head.appendChild(el);
    });
  }

  // Translate what xterm reports into the key names terminal_chef expects.
  const ARROWS = { A: "UP", B: "DOWN", C: "RIGHT", D: "LEFT" };
  const LETTERS = { w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT", e: "E", r: "R" };

  function keyName(data) {
    if (data.startsWith("\x1b[")) return ARROWS[data.slice(2)] || null;
    if (data === "\x1b") return "ESC";
    if (data === "\r" || data === "\n") return "ENTER";
    if (data === "\x7f" || data === "\b") return "BACKSPACE";
    if (data.length === 1 && data >= "0" && data <= "9") return data;
    return LETTERS[data.toLowerCase()] || null;
  }

  function press(key) {
    if (!session || !key) return;
    try {
      session.press(key);
    } catch (error) {
      say("The game hit an error: " + error.message);
    }
  }

  async function boot() {
    if (booting) return;
    booting = true;
    startButton.disabled = true;
    say("Loading the Python runtime (about 11 MB, once per visit)…");

    try {
      if (typeof WebAssembly !== "object") throw new Error("this browser has no WebAssembly support");
      for (const asset of CDN) await load(asset);

      // The game's boxes are about 50 columns wide, so shrink the type on
      // narrow screens rather than letting the ASCII art wrap.
      const narrow = window.matchMedia("(max-width: 640px)").matches;
      term = new window.Terminal({
        convertEol: false,
        cursorBlink: true,
        fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: narrow ? 9 : 13,
        scrollback: 2000,
        theme: { background: "#0f130e", foreground: "#e6eae3", cursor: "#768e6f", selectionBackground: "#3a4a36" },
      });
      const fit = new window.FitAddon.FitAddon();
      term.loadAddon(fit);
      screen.replaceChildren();
      term.open(screen);
      // Fit once the browser has settled the layout, then whenever it changes,
      // so the terminal never forces the page wider than the viewport.
      let fitted = "";
      const refit = () => {
        // Only refit when the box actually changed size, so observing our own
        // resize cannot feed back into another resize.
        const size = screen.clientWidth + "x" + screen.clientHeight;
        if (size === fitted || !screen.clientHeight) return;
        fitted = size;
        try { fit.fit(); } catch (error) { /* not laid out yet */ }
      };
      refit();
      requestAnimationFrame(refit);
      if (window.ResizeObserver) new ResizeObserver(refit).observe(screen);
      window.addEventListener("resize", refit);

      say("Starting Python…");
      const pyodide = await window.loadPyodide({ indexURL: PYODIDE_URL });

      // Write the vendored game package into Pyodide's in-memory filesystem.
      pyodide.FS.mkdirTree("/game/terminal_chef");
      await Promise.all(Object.entries(files).map(async ([path, url]) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Could not fetch " + path);
        pyodide.FS.writeFile("/game/" + path, await response.text());
      }));

      pyodide.runPython("import sys; sys.path.insert(0, '/game')");
      chef = pyodide.pyimport("browser_main");
      session = chef.Session((text) => term.write(text));

      root.terminal = term;  // handy when debugging from the console
      term.onData((data) => press(keyName(data)));
      term.focus();
      restartButton.hidden = false;
      keypad.hidden = false;
      say("");
      root.dataset.state = "playing";
    } catch (error) {
      console.error("Terminal Chef failed to start:", error);
      const detail = (error && (error.message || error.toString())) || "unknown error";
      say("The game could not start here (" + detail + "). You can still play it locally: pipx install git+https://github.com/TaydenWhite/terminal-chef");
      startButton.disabled = false;
      booting = false;
    }
  }

  startButton.addEventListener("click", boot);

  restartButton.addEventListener("click", () => {
    if (!chef) return;
    term.reset();
    try {
      if (session) session.destroy();
    } catch (error) { /* proxy already released */ }
    session = chef.Session((text) => term.write(text));
    term.focus();
  });

  // On-screen keys, so the game is playable without a physical keyboard.
  keypad.addEventListener("click", (event) => {
    const button = event.target.closest("[data-key]");
    if (!button) return;
    press(button.dataset.key);
    term.focus();
  });
})();
