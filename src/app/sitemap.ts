import type { MetadataRoute } from 'next'

import fs from "fs";
import matter from "gray-matter";


async function getPosts() {
  const files = fs.readdirSync("blog");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`blog/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const postList = posts.map((post) => ({
      url: `${process.env.PUBLIC_DOMAIN}/blog/${[post.slug]}`,
      lastModified: post.frontmatter.date,
      priority: 0.6,
  }))

  const pageList = [
    {
      url: `${process.env.PUBLIC_DOMAIN}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.PUBLIC_DOMAIN}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]



  return pageList.concat(postList);
}
