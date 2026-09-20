---
title: Terminal Chef
summary: >-
  A real-time cooking game that runs entirely in a terminal, written in pure
  Python with no third-party dependencies — and playable right here, because
  the same code runs in your browser through WebAssembly.
description: A dependency-free Python terminal game, playable in the browser via Pyodide and xterm.js.
kicker: Personal project
weight: 5
stack: [Python, Pyodide, WebAssembly, xterm.js]
tags: [Systems, Web]
metrics:
  - value: "0"
    label: third-party dependencies
  - value: "1,238"
    label: lines of Python across 8 modules
  - value: "4"
    label: "platforms: macOS, Linux, Windows, and the browser"
links:
  - label: Source on GitHub
    url: https://github.com/TaydenWhite/terminal-chef
---

## Play it

You run a kitchen across seven rooms, cooking and plating what three customers order while the trash piles up behind you. Every timer is real: food burns, plates expire, and the kitchen slows down as the bins fill.

{{< terminal-chef >}}

{{< callout >}}
This is the real Python game, not a recreation. It runs in your browser through Pyodide (CPython compiled to WebAssembly), so nothing is installed and nothing is sent to a server. High scores live in the page's temporary filesystem and disappear when you reload.
{{< /callout >}}

To play it natively, where scores persist in `~/.terminal-chef/scores.json`:

```bash
pipx install git+https://github.com/TaydenWhite/terminal-chef
terminal-chef
```

## The kitchen

```text
[SERVICE]
[PLATING] [STOVES]    [PANTRY]
[COUNTERS][PREP ROOM] [CLEANING]
```

Each of the six ingredients has its own path through the kitchen, and the steps have to happen in order: beef is cooked and then cut, chicken is washed, cooked and cut, tomato is washed, cut and cooked. Stopping early changes what you get. A cooked but uncut piece of beef is a burger patty; cut it too and it becomes a steak. The game silently refuses any step that isn't a legal next move for some recipe, so you learn to read the tags.

Trash is the pressure. Every finished process adds some, burning food adds more, and from level 8 up everything you start runs slower, until you stop and clear the bins.

## How it's built

### No dependencies, anywhere

The whole game is 1,238 lines of Python across 8 modules, using only the standard library. That keeps installation to one `pipx` command, and it's the reason the browser port was possible at all: there are no compiled wheels to find.

### Reading single keypresses on three platforms

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
