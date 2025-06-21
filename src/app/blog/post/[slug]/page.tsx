//******************************************************************************
//    Blog post, read from the blog directory (located at the project root).
//******************************************************************************

import Image from "next/image";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Markdown } from "../../../../markdown";

import style from "../../../../styles/Blog.module.scss";
import siteinfo from "../../../../siteinfo";

import { Navbar } from "../../../../components/Navbar";
import { formatDate } from "../../../../utils";


const blogPath = path.join(process.cwd(), 'blog')

async function getPost({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`${blogPath}/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter: frontmatter,
    content: content
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync("blog");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
      file: fileName,
    },
  }));
  return paths
}

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const {frontmatter} = await getPost({params: {slug}})
  return {
    title: frontmatter.title,
  };
}

export default async function Post({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const {frontmatter, content} = await getPost({params: {slug}})
  
  return (
    <>
      <Navbar url="/blog/" />
      <main className={style.main}>
        <article>
          {siteinfo.blog.thumbnails && (
            <div className={style.thumbnail}>
              <Image src={frontmatter.thumbnail} alt={frontmatter.title} fill />
            </div>
          )}
          <div className={style.content}>
            <div className={style.meta}>
              <h1>{frontmatter.title}</h1>
              <p>
                {formatDate(frontmatter.date)}
                {frontmatter.updated && (
                  <>; Last Updated: {formatDate(frontmatter.updated)}</>
                )}
              </p>
            </div>
            <Markdown>{content}</Markdown>
          </div>
        </article>
      </main>
    </>
  );
}
