---
title: "Deploy a Docsy-themed Hugo website"
linkTitle: Docsy & Hugo Website
menu: {main: {weight: 10}}
---

## Building a Hugo Website

<p style="font-size: 1.2em; margin-top: 1em;">This is a simple up-to-date tutorial on how to deploy a Docsy-themed Hugo website on GitHub Pages.</p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/rP2sL4pkhhM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Step 1: Prerequisites**

Go to the [Docsy: Before You Begin](https://www.docsy.dev/docs/get-started/docsy-as-module/installation-prerequisites/) page to download the necessary prerequisites.

---

**Step 2: Run Your Website Locally**

Go to the [Docsy example-site repository](https://github.com/google/docsy-example) and click “Use this template” to create your own Docsy repository. Clone your repository into VS Code or any other IDE. Open the terminal in the root folder of your project and run:

hugo server

---

## Step 3: Deploy on GitHub Pages

Follow the instructions in Hugo’s Host on GitHub Pages. At Step 6, instead of using the YAML file provided, use the one below.

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.127.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb                    
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Install Docsy
        run: npm install --save-dev docsy
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
          TZ: America/Los_Angeles
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"                    
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4