//******************************************************************************
//    Portfolio item, read from the work directory (located at the project
//    root).
//******************************************************************************

import Image from "next/image";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Markdown } from "../../../markdown";

import style from "../../../styles/Work.module.scss";
import siteinfo from "../../../siteinfo";

import { Navbar } from "../../../components/Navbar";
import { formatDate } from "../../../utils";
import Link from "next/link";

const workPath = path.join(process.cwd(), "work");

async function getProject({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`${workPath}/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter: frontmatter,
    content: content,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync("work");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
      file: fileName,
    },
  }));
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await getProject({ params: { slug } });
  return {
    title: frontmatter.title,
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getProject({ params: { slug } });

  return (
    <>
      <Navbar url="/work/" />
      <main className={style.main}>
        <article>
          {siteinfo.work.thumbnails && (
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
              <p className={style.summary}>{frontmatter.summary}</p>
              <div className={style.tagList}>
                {frontmatter.tags?.map((tag: string) => (
                  <Link href={`/blog?tag=${tag}`} key={tag}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            <Markdown>{content}</Markdown>
          </div>
        </article>
      </main>
    </>
  );
}
