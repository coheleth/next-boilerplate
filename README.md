# Coheleth's Next.Js Boilerplate

This is a simple portfolio next.js boilerplate.

Demo: https://coheleths-next-boilerplate.vercel.app

## Features

- [x] SASS/SCSS support
- [x] Typescript support
- [x] Basic SEO
  - [x] Configurable Metadata
  - [x] Sitemap
  - [x] Robots.txt
- [x] Basic components:
  - [x] Card
  - [x] Navigation Bar
  - [x] Footer
  - [x] Search Bar
- [x] Blog:
  - [x] Pagination
  - [x] Markdown posts
  - [x] Syntax Highlighting with Prism
  - [x] Basic Search
  - [x] Tags
- [x] Project portfolio

## Getting Started

First, install dependencies:

```bash
$ yarn install
```

Then run in development mode:

```bash
$ yarn dev
```

Visit the [live demo](https://coheleths-next-boilerplate.vercel.app), or clone the repo and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
coheleths-next-boilerplate/
┣ (project config files)
┣ src/
┃ ┣ app/ (page templates)
┃ ┣ styles/ (global scss style files)
┃ ┣ components/ (reusable react components)
┃ ┣ markdown.tsx (markdown renderer config file)
┃ ┣ siteinfo.ts (website config file)
┃ ┗ utils.ts (misc. utility functions)
┣ public/
┃ ┣ (static files)
┃ ┗ images/ (static images)
┗ blog/ (markdown blog posts)
```
