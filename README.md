# Coheleth's Next.Js Boilerplate

This is a simple portfolio next.js boilerplate.

Demo: https://coheleths-next-boilerplate.vercel.app

## Features

- [x] SASS/SCSS support
- [x] Typescript support
- [ ] Basic SEO
- [ ] Project portfolio
- [ ] Blog:
  - [x] Pagination
  - [x] Markdown posts
  - [x] Syntax Highlighting with Prism
  - [ ] Tags
- [x] Basic components:
  - [x] Card
  - [x] Navigation Bar
  - [x] Footer

## Getting Started

First, install dependencies:

```bash
$ yarn install
```

Then run in development mode:

```bash
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
coheleths-next-boilerplate/
┣ (project config files)
┣ src/
┃ ┣ pages/ (page templates)
┃ ┣ styles/ (global scss style files)
┃ ┣ components/ (reusable react components)
┃ ┣ markdown.tsx (markdown renderer config file)
┃ ┣ siteinfo.ts (website config file)
┃ ┗ utils.ts (misc. utility functions)
┣ public/
┃ ┣ (static files)
┃ ┗ images/ (static images)
┣ blog/ (markdown blog posts)
┣ portfolio/ (markdown portfolio posts) (W.I.P.)
┗ scripts/ (some scripts that run after the yarn build command)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
