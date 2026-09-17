---
title: FDA Compliance Dashboards & Text-to-SQL Agent
linkTitle: J&J Compliance Dashboards
summary: >-
  At Johnson & Johnson, I scaled static Hugo compliance dashboards to 60k+
  records while cutting build time from ~30 to ~5 minutes, and designed an
  agentic text-to-SQL workflow over Delta tables.
description: Data pipeline optimization and an agentic text-to-SQL workflow built during my software engineering co-op at Johnson & Johnson.
org: Johnson & Johnson Innovative Medicine
role: Software Engineer Co-op
dates: Aug 2025 – Dec 2025
date: 2025-08-01
weight: 10
featured: 3
stack: [Hugo, Delta Lake, SQL, LLM agents]
tags: [Data, Machine Learning, Web]
metrics:
  - value: "~30 → ~5 min"
    label: site build time
  - value: "60k+"
    label: records supported in static dashboards
note: Details stay at a high level because this is internal Johnson & Johnson work.
aliases:
  - /projects/hugo-optimization/
---

## Overview

During my co-op at Johnson & Johnson Innovative Medicine, I worked on the systems behind FDA compliance analytics. The analytics are published as static Hugo sites backed by Delta tables.

## Scaling the dashboard pipeline

Static sites are fast, secure, and simple to host, but build time grows with the amount of data rendered into pages. I optimized the FDA compliance analytics pipeline so its static Hugo dashboards support **more than 60,000 records**, and cut site build time **from about 30 minutes to about 5**.

## Agentic text-to-SQL

I designed an agentic text-to-SQL workflow for the Delta tables behind these Hugo sites. The agent decomposes a natural-language question into **parallel queries** across those tables.

{{< flow "A natural-language question" "The agent decomposes it into parallel SQL queries" "Queries run across the Delta tables behind the Hugo sites" >}}

## Related

Before this co-op, I spent summer 2024 at J&J as a data science intern, where I led the [Hugo website tutorials](/projects/hugo-website-tutorials/) initiative.
