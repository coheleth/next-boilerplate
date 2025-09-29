//******************************************************************************
//    Website's homepage, with a short introduction and the latest blog posts.
//    The amount of posts show is set in the siteinfo.ts file.
//******************************************************************************

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "../styles/Home.module.scss";
import siteinfo from "../siteinfo";

import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import Link from "next/link";

const blogPath = path.join(process.cwd(), "blog");
const workPath = path.join(process.cwd(), "work");

export default function Home() {
  const blogFiles = fs.readdirSync(blogPath);
  const posts = blogFiles
    .map((fileName) => {
      const slug = fileName.replace(".md", "");

      const readFile = fs.readFileSync(`${blogPath}/${fileName}`, "utf-8");

      const { data: frontmatter } = matter(readFile);

      return {
        slug,

        frontmatter,
      };
    })
    .slice(0, siteinfo.home.topPosts);

  const workFiles = fs.readdirSync(workPath);
  const projects = workFiles
    .map((fileName) => {
      const slug = fileName.replace(".md", "");

      const readFile = fs.readFileSync(`${workPath}/${fileName}`, "utf-8");

      const { data: frontmatter } = matter(readFile);

      return {
        slug,

        frontmatter,
      };
    })
    .slice(0, siteinfo.home.topWork);

  return (
    <>
      <Navbar url="/" />

      <main className={styles.main}>
        <section>
          <h1>Welcome to {siteinfo.title}!</h1>
          <p>{siteinfo.description}</p>
          <p>
            <Link
              href={"https://github.com/coheleth/next-boilerplate"}
              target="_blank"
            >
              Github repo
            </Link>
            .
          </p>
        </section>
        <section className={styles.unpadded}>
          <h2 className={styles.paddedH}>Latest projects:</h2>
          <div className={styles.topWork}>
            {projects.map(({ slug, frontmatter }: any, index: any) => (
              <Card
                post_url={`/work/${slug}`}
                key={slug}
                frontmatter={frontmatter}
              />
            ))}
          </div>
          <h2 className={styles.paddedH}>Latest posts:</h2>
          <div className={styles.topPosts}>
            {posts.map(({ slug, frontmatter }: any, index: any) => (
              <Card
                post_url={`/blog/${slug}`}
                key={slug}
                frontmatter={frontmatter}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
