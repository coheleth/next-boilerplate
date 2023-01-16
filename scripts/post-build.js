require("dotenv").config({ path: `.env.local`, override: true });
const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");
const path = require("path");

if (process.env.PUBLIC_DOMAIN !== undefined) {
  sitemap({
    baseUrl: process.env.PUBLIC_DOMAIN,
    pagesDirectory: path.resolve(__dirname, "../out/"),
    targetDirectory: path.resolve(__dirname, "../out/"),
    ignoredExtensions: [
      "js",
      "map",
      "json",
      "xml",
      "png",
      "jpg",
      "jpeg",
      "svg",
    ],
    ignoredPaths: ["[fallback]", "404.html"],
    allowFileExtensions: true,
  });
  console.log("sitemap.xml generated successfully");
} else {
  console.log(
    "sitemap.xml generation FAILED: PUBLIC_DOMAIN environment variable missing!"
  );
}
