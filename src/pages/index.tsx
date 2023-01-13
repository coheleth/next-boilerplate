import fs from "fs";
import matter from "gray-matter";

import styles from "../styles/Home.module.scss";
import siteinfo from "../siteinfo";

import PageHead from "../components/Head";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";

export async function getStaticProps() {
  const files = fs.readdirSync("src/blog");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`src/blog/${fileName}`, "utf-8");

    const { data: frontmatter } = matter(readFile);

    return {
      slug,

      frontmatter,
    };
  });
  return {
    props: {
      posts: posts.slice(0, siteinfo.home.topPosts),
    },
  };
}

export default function Home({ posts }: any) {
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
                path="/blog/post"
                key={slug}
                slug={slug}
                frontmatter={frontmatter}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
