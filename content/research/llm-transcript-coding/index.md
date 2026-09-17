---
title: LLM Transcript-Coding Pipeline
summary: >-
  A Streamlit platform where a person deliberates with LLM teammates, and an
  OpenAI-powered pipeline that codes ~2000 group discussions, raising hand-coding
  comparative accuracy from 60% to 99%.
description: LLM tooling for group decision-making research at Purdue's Communication and Cognition Lab.
org: Communication and Cognition Lab, Purdue University
orgUrl: https://web.ics.purdue.edu/~treimer/
role: Undergraduate Researcher
dates: Mar 2026 – Present
date: 2026-03-01
weight: 10
featured: 2
stack: [Python, Streamlit, OpenAI API, LLMs]
tags: [Machine Learning, Research, Web]
metrics:
  - value: "60% → 99%"
    label: hand-coding comparative accuracy
  - value: "~2000"
    label: group discussions coded automatically
  - value: "3 + 1"
    label: forthcoming papers and a book chapter with my contributions
links:
  - label: Communication and Cognition Lab
    url: https://web.ics.purdue.edu/~treimer/
---

## Overview

Purdue's Communication and Cognition Lab studies how people make decisions in social settings, including how those decisions change when AI is part of the conversation. I build the software the lab uses to run its experiments and analyze the results.

## The research setting

Much of this work uses the **Hidden Profile Paradigm (HPP)**, a classic group decision-making task. Each group member receives some information that everyone shares and some that only they hold. The best decision only becomes clear when members pool their unique information, so HPP studies measure how well a group actually shares what it knows.

## What I built

### 1. A platform for deliberating with LLMs

I built a full-stack web application in Python with Streamlit that runs the experiment. In each session, one human participant deliberates with two or three LLM group members over three HPP decision-making tasks.

{{< flow "A human participant joins a session" "The Streamlit app presents one of three HPP tasks" "The participant deliberates with 2–3 LLM group members" >}}

### 2. Automated transcript coding

HPP research depends on **coding** each discussion: identifying every moment where a group member shares a piece of information. Doing that by hand for about 2,000 discussions is slow, so I automated it with an LLM extraction pipeline that uses the OpenAI API to classify information-sharing events.

{{< flow "Discussion transcripts" "LLM extraction via the OpenAI API" "Classified information-sharing events" "Compared against hand-coding" >}}

Across ~2000 HPP discussions, the pipeline raised hand-coding comparative accuracy from **60% to 99%**.

## Impact

My contributions appear in **three forthcoming papers and a book chapter**.
