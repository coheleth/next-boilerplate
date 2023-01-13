import Image from "next/image";

import { Inter } from "@next/font/google";

import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import style from "../../../styles/Blog.module.scss";
import siteinfo from "../../../siteinfo";

import PageHead from "../../../components/Head";
import { Navbar } from "../../../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticPaths() {
  const files = fs.readdirSync("src/blog");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
      file: fileName,
    },
  }));
  return {
    paths,

    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`src/blog/${slug}.md`, "utf-8");

  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,

      content,
    },
  };
}

export default function Post({ frontmatter, content }: any) {
  return (
    <>
      <Navbar url="/blog/" />
      <PageHead
        title={`${frontmatter.title} – ${siteinfo.title}`}
        description="dse"
      />
      <main className={style.main}>
        <article>
          {siteinfo.blog.thumbnails && (
            <div className={style.thumbnail}>
              <Image src={frontmatter.thumbnail} alt={frontmatter.title} fill />
            </div>
          )}
          <div className={style.content}>
            <h1>{frontmatter.title}</h1>
            <ReactMarkdown children={content}></ReactMarkdown>
          </div>
        </article>
      </main>
    </>
  );
}
