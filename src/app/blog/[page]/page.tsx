import fs from "fs";
import matter from "gray-matter";

import styles from "../../../styles/Blog.module.scss";
import siteinfo from "../../../siteinfo";

import { PageHead } from "../../../components/Head";
import { Navbar } from "../../../components/Navbar";
import { Card } from "../../../components/Card";
import { Pagination } from "../../../components/Pagination";

async function getPosts({ params: { page } }: any) {
  page = parseInt(page);

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

  let pageItems = [];
  for (let i = 0; i < posts.length; i += siteinfo.blog.pagination.items) {
    pageItems.push(posts.slice(i, i + siteinfo.blog.pagination.items));
  }

  return {
    posts: pageItems[page - 1],
    pages: pageItems.length,
    currentPage: page,
  };
}

export async function generateStaticParams() {
  const posts = fs.readdirSync("blog").length;
  const pages = Math.ceil(posts / siteinfo.blog.pagination.items);

  let paths = [];
  for (let i = 0; i < pages; i++) {
    paths.push({
      params: {
        page: (i + 1).toString(),
      },
    });
  }

  return paths
}

export default async function Blog({ params }: {params: Promise<{ page: number }>}) {
  const {page} = await params;
  const {posts, pages, currentPage} = await getPosts({ params: { page } })
  return (
    <>
      <Navbar url="/blog/" />
      <PageHead title={`Blog – ${siteinfo.title}`} description="dse" />

      <main className={styles.main}>
        <h1 className={styles.paddedH}>Blog – Page {currentPage}</h1>
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
          currentPage={currentPage}
          settings={siteinfo.blog.pagination}
        />
      </main>
    </>
  );
}
