import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "../../styles/Blog.module.scss";
import siteinfo from "../../siteinfo";

import { PageHead } from "../../components/Head";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";


const blogPath = path.join(process.cwd(), 'blog')

export default function Blog() {
  const files = fs.readdirSync(blogPath);
  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`${blogPath}/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    return {
      slug,

      frontmatter,
    };
  });
  const posts = allPosts.slice(0, siteinfo.blog.pagination.items)
  const pages = Math.ceil(allPosts.length / siteinfo.blog.pagination.items);

  return (
    <>
      <Navbar url="/blog/" />
      <PageHead title={`Blog – ${siteinfo.title}`} description="dse" />

      <main className={styles.main}>
        <h1 className={styles.paddedH}>Blog</h1>
        <div className={styles.postList}>
          {posts.map(({ slug, frontmatter }: any) => (
            <Card
              post_url={`/blog/post/${slug}`}
              key={slug}
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
