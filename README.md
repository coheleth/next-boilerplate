# Coheleth's Next.Js Boilerplate

This is a simple portfolio next.js boilerplate.

Demo: https://coheleths-next-boilerplate.vercel.app

## Features

- SASS/SCSS support
- Typescript support
- Basic SEO
  - Configurable Metadata
  - Sitemap
  - Robots.txt
- Basic components:
  - Card
  - Navigation Bar
  - Footer
  - Search Bar
- Blog:
  - Pagination
  - Markdown posts
  - Syntax Highlighting with Prism
  - Basic Search
  - Tags
- Project portfolio

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
┃ ┣ images/ (static images)
┃ ┗ (other static files)
┣ blog/ (markdown blog posts)
┗ work/ (markdown portfolio projects)
```

## To-do

- [ ] Improve documentation
