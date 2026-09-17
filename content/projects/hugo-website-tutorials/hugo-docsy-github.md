---
title: Hugo, Docsy, & GitHub
description: The three building blocks for building and deploying your website, and what each one does.
weight: 1
aliases:
  - /projects/website/hugo-docsy--github/
---

{{< youtube id="TmGpbRX0kD4" title="Hugo, Docsy, and GitHub overview" >}}

Every site in this series is built from the same three pieces.

## Hugo

[Hugo](https://gohugo.io/) is a static site generator written in Go. You write content in Markdown, and Hugo combines it with templates to produce plain HTML, CSS, and JavaScript files. Because the output is static, the site is fast, inexpensive to host, and has no server or database to maintain. Hugo is also known for very fast builds, so you can preview changes locally almost instantly with `hugo server`.

## Docsy

[Docsy](https://www.docsy.dev/) is a Hugo theme from Google. A theme provides the layouts and styling, so you can focus on content. Docsy comes with navigation, a sidebar, search, and responsive design out of the box, which makes it a quick way to get a polished site running.

## GitHub

[GitHub](https://github.com/) stores your site's source code with Git version control, so every change is tracked and reversible. It also hosts the finished site for free through **GitHub Pages**, and **GitHub Actions** can rebuild and redeploy the site automatically every time you push a change.
