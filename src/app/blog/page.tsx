//******************************************************************************
//    Paginated blog page, dynamically listing posts according to current page.
//    Posts are read from the blog directory (located at the project root).
//******************************************************************************

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "../../styles/Blog.module.scss";
import siteinfo from "../../siteinfo";

import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";
import { Search } from "../../components/Search";

const blogPath = path.join(process.cwd(), "blog");

async function getPosts({ params: { pageNumber, searchQuery } }: any) {
  const page = parseInt(pageNumber);

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

  let posts = allPosts;

  if (searchQuery != "") {
    posts = allPosts.filter((post) => {
      return [
        post.frontmatter.title || "",
        post.frontmatter.summary || "",
        (post.frontmatter.tags || []).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }

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

  return paths;
}

export async function generateMetadata(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }>
) {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || "";
  if (searchQuery == "") {
    return {
      title: `Blog \u2014 page ${pageNumber}`,
    };
  } else {
    return {
      title: `Search results for "${searchQuery}" \u2014 page ${pageNumber}`,
    };
  }
}

export default async function Blog(
  props: Readonly<{
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }>
) {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || "";

  const { posts, pages, currentPage } = await getPosts({
    params: { pageNumber, searchQuery },
  });
  return (
    <>
      <Navbar url="/blog/" />
      <main className={styles.main}>
        <div className={styles.header}>
          {searchQuery.length == 0 && <h1>Blog – Page {currentPage}</h1>}
          {searchQuery.length > 0 && (
            <h1>
              Search results for &quot;{searchQuery}&quot; – Page {currentPage}
            </h1>
          )}

          <Search placeholder="Search..." />
        </div>

        <div className={styles.postList}>
          {posts?.map(({ slug, frontmatter }: any) => (
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
          query={searchQuery}
        />
      </main>
    </>
  );
}
