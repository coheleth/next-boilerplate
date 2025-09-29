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

async function getPosts({
  params: { pageNumber, searchQuery, tagFilter },
}: any) {
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
    posts = posts.filter((post) => {
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

  if (tagFilter != "") {
    posts = posts.filter((post) => {
      return (post.frontmatter.tags || []).includes(tagFilter);
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
      tag?: string;
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
      tag?: string;
      page?: string;
    }>;
  }>
) {
  const searchParams = await props.searchParams;
  const pageNumber = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || "";
  const tagFilter = searchParams?.tag || "";

  const { posts, pages, currentPage } = await getPosts({
    params: { pageNumber, searchQuery, tagFilter },
  });
  return (
    <>
      <Navbar url="/blog/" />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>
            {searchQuery.length > 0 && (
              <>Search results for &quot;{searchQuery}&quot; </>
            )}
            {searchQuery.length == 0 && <>Blog posts </>}
            {tagFilter.length > 0 && <>with the tag &quot;{tagFilter}&quot; </>}
            – Page {currentPage}
          </h1>

          <Search placeholder="Search..." />
        </div>

        <div className={styles.postList}>
          {posts?.map(({ slug, frontmatter }: any) => (
            <Card
              post_url={`/blog/${slug}`}
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
