---
title: In One Line!
linkTitle: In One Line!
description: >
  In my time taking CS/DS classes at Stanford, I learned about lambda functions. From there it was only a few experiments away from programming a fully functional tic-tac-toe in one line of python. 
date: 2017-01-05
weight: 1
cascade:
  - type: "docs"
---

```
(lambda game : [(((lambda board : [print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}\nCongrats player {i % 2 + 1}!") if j == 0 else quit() for j in range(2)] if (''.join([str(o) for o in board]) in [line[:-1] for line in open("win.txt", "r").readlines()]) else ([print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}\nIt's a tie.") if j == 0 else quit() for j in range(2)] if i == 10 else [game.append(board) if j == 0 else print(f"{board[:3]}\n{board[3:6]}\n{board[6:]}") for j in range(2)])))((lambda move : [i % 2 + 1 if x == move - 1 else game[i - 1][x] for x in range(9)])(int((lambda list : list + [list.append(input("MOVE (1-9): ")) if len(list) == 0 else (list.pop(0) if list[0] not in [str(p + 1) for p, x in enumerate(game[i-1]) if x == 0] else None) for x in range(100)])([])[0])))) for i in range(2, 11)])([[print("[0, 0, 0]\n[0, 0, 0]\n[0, 0, 0]") for j in range(1)], [0,0,0,0,0,0,0,0,0]])
```
