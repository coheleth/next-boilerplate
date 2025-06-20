import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "../styles/Home.module.scss";
import siteinfo from "../siteinfo";

import { PageHead } from "../components/Head";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";


const blogPath = path.join(process.cwd(), 'blog')

export default function Home() {
  const files = fs.readdirSync(blogPath);
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`${blogPath}/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,

      frontmatter,
    };
  }).slice(0, siteinfo.home.topPosts)

  return (
    <>
      <Navbar url="/" />
      <PageHead title={siteinfo.title} description="dse" />

      <main className={styles.main}>
        <section>
          <h1>Welcome to {siteinfo.title}!</h1>
        </section>
        <section className={styles.unpadded}>
          <h2 className={styles.paddedH}>Latest posts:</h2>
          <div className={styles.topPosts}>
            {posts.map(({ slug, frontmatter }: any, index: any) => (
              <Card
                post_url={`/blog/post/${slug}`}
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
