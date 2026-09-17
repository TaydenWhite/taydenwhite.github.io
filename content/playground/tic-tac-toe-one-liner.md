---
title: Tic-Tac-Toe in One Line of Python
linkTitle: One-Line Tic-Tac-Toe
description: A complete two-player tic-tac-toe game, including input validation and win detection, written as a single Python expression.
weight: 1
stack: [Python]
aliases:
  - /projects/tic-tac-toe/
  - /projects/tic-tac-toe/in-one-line/
  - /projects/tic-tac-toe/using-game-trees/
---

Tic-tac-toe was the first game I ever built, and I've since written it in Python, Java, and C, trying something different each time.

This version came out of a Stanford high school summer program in computer science and data science, where I learned about lambda functions. From there it was only a few experiments away from a fully working game in **one line** of Python. The code is on [GitHub](https://github.com/TaydenWhite/TTT-One-LIne).

```python {class="wrap"}
(lambda game : [(((lambda board : [print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}\nCongrats player {i % 2 + 1}!") if j == 0 else quit() for j in range(2)] if (''.join([str(o) for o in board]) in [line[:-1] for line in open("win.txt", "r").readlines()]) else ([print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}\nIt's a tie.") if j == 0 else quit() for j in range(2)] if i == 10 else [game.append(board) if j == 0 else print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}") for j in range(2)])))((lambda move : [i % 2 + 1 if x == move - 1 else game[i - 1][x] for x in range(9)])(int((lambda list : list + [list.append(input("MOVE (1-9): ")) if len(list) == 0 else (list.pop(0) if list[0] not in [str(p + 1) for p, x in enumerate(game[i-1]) if x == 0] else None) for x in range(100)])([])[0])))) for i in range(2, 11)])([[print("[0, 0, 0]\n[0, 0, 0]\n[0, 0, 0]") for j in range(1)], [0,0,0,0,0,0,0,0,0]])
```

## How it works

Python doesn't allow statements like `for`, `while`, or `if` blocks inside a single expression, so the game replaces each one with an expression:

- **Loops become list comprehensions.** The outer comprehension, `for i in range(2, 11)`, runs the nine turns of the game.
- **Variables become lambda parameters.** Each lambda is defined and called immediately, which binds names like `game`, `board`, and `move` without an assignment statement.
- **Input validation becomes a self-modifying list.** A comprehension prompts for a move and discards it if the square is taken or out of range, until a valid move remains.
- **Branches become conditional expressions.** Each turn either announces a winner, declares a tie after the ninth move, or appends the new board to the game history and prints it.
- **Win detection is a lookup.** The board is encoded as a 9-digit string (`0` for empty, `1` and `2` for the players) and checked against `win.txt`, a precomputed list of winning board states.

## Tic-tac-toe in C

I also wrote [a C version](https://github.com/TaydenWhite/TicTacC) that you can play against a computer opponent. The computer builds a game tree of possible moves, scores each board recursively, and picks the strongest move, with a difficulty setting that controls how deep the tree goes.
