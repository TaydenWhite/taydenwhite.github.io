---
title: Fusion of Permutation Defects
linkTitle: Permutation Defects
summary: >-
  I diagnosed and resolved edge cases in an algorithm for fusing permutation
  defects, quasiparticles that can encode qubits in topological quantum
  computing, and produced a revised set of fusion rules for a future publication.
description: Research on fusion rules for permutation defects in topological quantum computing.
org: Department of Mathematics, Purdue University
role: Undergraduate Researcher, advised by Professor Colleen Delaney
dates: May 2025 – Aug 2025 · May 2026 – Present
date: 2025-05-01
weight: 20
featured: 1
stack: [Julia, Group theory, Fusion rings]
tags: [Research, Mathematics]
metrics:
  - value: "529 cases"
    label: of bare defect fusion worked out for four layers
  - value: Revised rules
    label: for permutation defect fusion, to be used in a future publication
cover: braiding-anyons.png
coverAlt: Diagram of three anyons whose worldlines braid around each other between two time slices.
coverCaption: Anyons braiding over time. Topological quantum computing encodes information in how particles like these move and fuse.
childrenTitle: Research reports
aliases:
  - /projects/fusion-of-permutation-defects/
---

## Overview

Topological quantum computing aims to store quantum information in exotic, particle-like excitations of two-dimensional matter. **Permutation defects** are one family of these: point-like objects that couple several layers of anyons together. Understanding how two defects **fuse**, meaning what can result when they combine, matters for using them to build qubits.

Professor Colleen Delaney had previously published work describing the fusion of permutation defects. I work with her in Purdue's Department of Mathematics to analyze and extend the algorithm behind it.

## What I did

- **Found and fixed edge cases.** Through extensive casework and calculation, I diagnosed and resolved edge cases in the fusion algorithm, producing a revised set of fusion rules to be used in a future publication.
- **Enumerated every case for four layers.** I worked out all 529 fusion products of bare defects when n = 4 (see *Fusion Rules in n = 4* below).
- **Contributed to open-source tooling.** I added core fusion-ring operations, the Deligne product and defect fusion, to an open-source Julia package that implements fusion rings.
- **Wrote up the mathematics.** I documented the theory as I learned it in the reports below, from permutations and group theory through fusion rings and Deligne products to worked examples of the algorithm.

## How the algorithm works

For two defects, let *k* be the number of layers their permutations share. Each step of the algorithm falls into one of three cases:

{{< flow "**k ≥ 2:** factor out a shared transposition, leaving a sum of multilayer anyons" "**k = 1:** multiply the two permutations" "**k = 0:** multiply the two disjoint permutations" >}}

The *Fusion Example* report applies these rules step by step to a full calculation.

## Research video

I made this explainer video, which covers permutation defects and Professor Delaney's work on their fusion, as a submission to Purdue's Summer Undergraduate Research Exposition.

{{< embed-video file="research-expo-video.mp4" >}}

{{< callout >}}
I recorded this video partway through the project. My later calculations in *Fusion Rules in n = 4* showed that the backtracking claims near the end of the video are false.
{{< /callout >}}
