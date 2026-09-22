---
title: Terminal Chef
summary: >-
  A text-adventure esque cooking game that runs entirely in a terminal, written in pure
  Python with no third-party dependencies—and playable here via WebAssembly.
description: A dependency-free Python terminal game, playable in the browser via Pyodide and xterm.js.
kicker: Personal project
weight: 5
stack: [Python, Pyodide, WebAssembly, xterm.js]
tags: [Systems, Web]
metrics:
  - value: "0"
    label: third-party dependencies
  - value: "1,200"
    label: lines of Python across 8 modules
  - value: "4"
    label: "platforms: macOS, Linux, Windows, and browser"
links:
  - label: Source on GitHub
    url: https://github.com/TaydenWhite/terminal-chef
---

## Play

In essence, Terminal Chef is a game of menus and processes. The minimality of visual information means navigating menus and tracking processes will be difficult to start. As your mental model of the kitchen improves, so will your efficiency and speed.

You run a kitchen with seven rooms, a short game asks you to serve six customers, a long game has twelve.

{{< terminal-chef >}}

{{< callout >}}
Runs in your browser through Pyodide (CPython compiled to WebAssembly), so nothing needs to be installed and no server is necessary. High scores live in the page's temporary filesystem, so they will disappear when you reload.
{{< /callout >}}

To play it natively with persistent scores:

```bash
pipx install git+https://github.com/TaydenWhite/terminal-chef
terminal-chef
```

## Kitchen Layout

```text
[SERVICE]
[PLATING]  [STOVES]    [PANTRY]
[COUNTERS] [PREP ROOM] [CLEANING]
```

Navigate between rooms with arrow keys or WASD

## Ingredients

```text
Fridge:
  1. [UNCOOKED] [UNCUT]  Beef
  2. [UNWASHED] [UNCOOKED] [UNCUT] Chicken
  3. [UNWASHED] [UNCUT] Lettuce

Shelf:
  1. [UNWASHED] [UNCUT] [UNCOOKED] Tomato
  2. [UNCUT] [UNCOOKED] Potato
  3. [UNCUT] [RTP] Bread
```

Ingredient tags need to be addressed from left to right, but recipes may not require all processes to be applied to an ingredient before it is ready to plate—denoted by [RTP].

Most recipes also have to be stacked in order, so bread goes down before the patty. Salads are the exception: every ingredient counts as the same step, so lettuce, tomato and any meat can go on in any order.

## Mechanics
Trash Level: Every process increase adds 1 to your trash level. Burning food and letting counter items expire will add 3 to your trash level. Starting at level 8, most processes take an extra 5 seconds; level 9 adds 10 seconds, level 10 adds 15. Burning, counter expiry and the trash disposal are never slowed. Clear your trash level at the trash disposal, which always takes 15 seconds and drops you back to zero.

Plates: Foods can only be combined on plates in the Plating room. When customers finish eating, you must take their dirty plate to receive the next customer. Plates are washed in the dish washer, and must be returned to Plating to begin another dish.


## How it's built


### Reading keypresses on three platforms

Terminals normally hand a program a whole line at a time, only after Enter. A real-time game needs each key the moment it's pressed, and that works differently on every platform:

{{< flow "**macOS / Linux:** `termios` + `tty.setcbreak` turn off line buffering and echo" "`select` waits for input with a timeout, so the game can keep its own clock" "**Windows:** `msvcrt.kbhit` polls, and `ctypes` enables ANSI escape codes in the console" >}}

One subtlety drove the design: arrow keys arrive as three bytes (`ESC [ A`). Reading through `sys.stdin` buffers the rest of that sequence where `select` can't see it, so every arrow key registers as a bare ESC, which pauses the game. Reading the file descriptor directly with `os.read` fixes it. Quitting is just as fussy, so the keyboard restores the old terminal mode with `TCSAFLUSH`, which discards queued keystrokes in the same operation instead of letting the shell echo and beep at them.

### A clock you can inject

`Game` takes both its output object and its clock as parameters, defaulting to the console and `time.monotonic`. Timers aren't threads: each station records when it will be done, and `tick()` fires every due timer in chronological order whenever the game next renders. That means the game state depends only on a number that comes from outside it, which is what makes the browser version possible and the logic testable without waiting in real time.

### Drawing everything as boxes

All of the interface is built from one small rendering engine. A `Box` has a title bar and body sections made of line types: left-aligned, left-plus-right-aligned, centered, and equal-width cells split by `||`. Each line reports its natural width, the box takes the widest, and every line then renders to that width. Menus never need manual padding, and nothing drifts out of alignment when a dish name gets longer.

## Getting it into the browser

The game's own entry point owns a blocking loop: it waits for a key, hands it to the game, and repeats. A browser tab can't block like that without freezing the page. Rather than change the game, I left it untouched and drove it from the outside:

{{< flow "Pyodide loads CPython as WebAssembly, on click only" "The vendored package is written into its in-memory filesystem" "xterm.js captures a keypress and maps it to a key name" "A small adapter calls `Game.press(key)` and writes output to the terminal" >}}

This works because of two decisions in the original code. Output goes through an injectable object, so it can be pointed at a terminal emulator instead of `stdout`, and timers advance lazily inside `press()` rather than on a background thread, so the game only moves when a key arrives. The browser build needs no worker threads, no `SharedArrayBuffer`, and no server.

The copy of the game on this site is vendored at a pinned commit and refreshed with a script, so a change in the game repo can never break this site's build.
