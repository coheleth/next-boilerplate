//******************************************************************************
//    Paginated portfolio page, dynamically listing items according to current
//    page and search parameters.
//    Items are read from the work directory (located at the project root).
//******************************************************************************

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "../../styles/Work.module.scss";
import siteinfo from "../../siteinfo";

import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { Pagination } from "../../components/Pagination";
import { Search } from "../../components/Search";

const workPath = path.join(process.cwd(), "work");

async function getPosts({
  params: { pageNumber, searchQuery, tagFilter },
}: any) {
  const page = parseInt(pageNumber);

  const files = fs.readdirSync(workPath);

  const allPosts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const readFile = fs.readFileSync(`${workPath}/${fileName}`, "utf-8");

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
  const tagFilter = searchParams?.tag || "";

  let pageName = "Projects";
  let tagName = "";

  if (tagFilter != "") {
    tagName = `with the tag "${tagFilter}"`;
  }

  if (searchQuery != "") {
    pageName = `Search results for "${searchQuery}"`;
  }

  let title = [pageName, tagName, `\u2014 page ${pageNumber}`].join(" ");
  return { title: title };
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
      <Navbar url="/work/" />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>
            {searchQuery.length > 0 && (
              <>Search results for &quot;{searchQuery}&quot; </>
            )}
            {searchQuery.length == 0 && <>Projects </>}
            {tagFilter.length > 0 && <>with the tag &quot;{tagFilter}&quot; </>}
            – Page {currentPage}
          </h1>

          <Search placeholder="Search Projects" />
        </div>

        <div className={styles.projectList}>
          {posts?.map(({ slug, frontmatter }: any) => (
            <Card
              post_url={`/work/${slug}`}
              key={slug}
              frontmatter={frontmatter}
              hideDate={true}
              collectionName={"work"}
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
