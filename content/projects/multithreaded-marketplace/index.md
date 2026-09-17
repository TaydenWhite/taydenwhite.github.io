---
title: Multithreaded Client-Server Marketplace
summary: >-
  A Java marketplace built by a five-person team: a multithreaded server that
  speaks a custom TCP protocol, and a 1,000-line Swing GUI for storefronts,
  search, cart, and order history.
description: A multithreaded Java client-server marketplace with a custom TCP protocol and Swing GUI.
kicker: Course project, Purdue University
team: 5 engineers
weight: 30
stack: [Java, Swing, TCP sockets, Git]
tags: [Systems]
metrics:
  - value: "150+"
    label: Git commits across a 5-person team
  - value: "1,000 lines"
    label: of Swing GUI code
  - value: "15+"
    label: end-to-end test scenarios
---

## Overview

A desktop marketplace where users sign in, sellers run storefronts, and shoppers search, fill a cart, and review their order history. It runs as a client-server system that my team built directly on raw TCP sockets.

## Architecture

{{< flow "**Swing client:** GUI for users" "**Custom TCP protocol** over raw sockets" "**Server:** one thread per connected client" >}}

- **Networking:** a custom protocol on raw TCP sockets, with no web framework.
- **Concurrency:** a thread-per-client server, so many user sessions run at the same time.
- **Client:** a 1,000-line Swing GUI covering authentication, seller storefronts, search, cart, and order history.

## Teamwork and testing

- Co-developed with a team of five engineers across **150+ Git commits**.
- Wrote and executed an **end-to-end test plan with 15+ scenarios**.

## Source code

This was a Purdue course project, so its source isn't public under Purdue's academic-integrity policy. I'm happy to walk through the code on request.
