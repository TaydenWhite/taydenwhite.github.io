---
title: Unix Shell
summary: >-
  A Unix shell written in C/C++ that parses commands into an executable syntax
  tree with Lex and Yacc, with process management, pipes, redirection, signals,
  subshells, and wildcard expansion.
description: A Unix shell built from scratch in C/C++ with Lex and Yacc.
kicker: Course project, Purdue University
weight: 20
stack: [C, C++, Lex, Yacc, Linux]
tags: [Systems]
---

## Overview

I built a working Unix shell from the ground up. Every command line is tokenized with **Lex**, parsed with a **Yacc** grammar into an abstract syntax tree (AST), and then executed by walking that tree.

{{< flow "Command line input" "**Lex** splits it into tokens" "**Yacc** grammar builds an AST" "Executor runs the AST with fork/exec" >}}

## Features

- **Process management:** launches programs with `fork` and `exec`.
- **Pipes:** connects commands so one program's output becomes the next program's input.
- **File-descriptor redirection:** reads input from and writes output to files.
- **Signal handling:** handles signals so the shell behaves correctly while commands run.
- **Subshells:** runs a nested command line in its own shell process.
- **Wildcard expansion:** expands patterns like `*.c` into matching file names.

## What it demonstrates

Building a shell means working directly with the operating system: creating and managing processes, wiring file descriptors between them, and responding to signals. Parsing with Lex and Yacc also meant designing a grammar that turns free-form input into a structure a program can execute.

## Source code

This was a Purdue course project, so its source isn't public under Purdue's academic-integrity policy. I'm happy to walk through the code on request.
