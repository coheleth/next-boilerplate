import fs from "fs";
import matter from "gray-matter";

import styles from "../../styles/Blog.module.scss";
import siteinfo from "../../siteinfo";

import { PageHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";

export async function getStaticProps() {
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
  const pages = Math.ceil(posts.length / siteinfo.blog.pagination.items);
  return {
    props: {
      posts: posts.slice(0, siteinfo.blog.pagination.items),
      pages,
    },
  };
}

export default function Blog({ posts, pages }: any) {
  return (
    <>
      <Navbar url="/blog/" />
      <PageHead title={`Blog – ${siteinfo.title}`} description="dse" />

      <main className={styles.main}>
        <h1 className={styles.paddedH}>Blog</h1>
        <div className={styles.postList}>
          {posts.map(({ slug, frontmatter }: any) => (
            <Card
              path="/blog/post"
              key={slug}
              slug={slug}
              frontmatter={frontmatter}
            />
          ))}
        </div>
        <Pagination
          pages={pages}
          currentPage={1}
          settings={siteinfo.blog.pagination}
        />
      </main>
    </>
  );
}
