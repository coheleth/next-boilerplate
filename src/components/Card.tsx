//******************************************************************************
//    Blog post card component, used in the home page, as well as in the blog
//    page. Contains a thumbnail image, the post title, publication date, and
//    a short summary, taken from the post's frontmatter.
//******************************************************************************

import Link from "next/link";
import Image from "next/image";

import siteinfo from "../siteinfo";
import style from "../styles/Card.module.scss";

import { formatDate } from "../utils";

export function Card({
  post_url,
  frontmatter,
  hideDate = false,
  collectionName = "blog",
  children,
}: any) {
  return (
    <div className={style.cardWrapper}>
      <article className={style.card}>
        {siteinfo.blog.thumbnails && (
          <div className={style.thumbnail}>
            <Image
              fetchPriority="high"
              src={frontmatter.thumbnail}
              alt={frontmatter.title}
              fill={true}
            />
          </div>
        )}
        <div className={style.content}>
          <Link href={post_url}>
            <h1>{frontmatter.title}</h1>
          </Link>
          {!hideDate && <p>{formatDate(frontmatter.date)}</p>}
          <p className={style.summary}>{frontmatter.summary}</p>
          <div className={style.tagList}>
            {frontmatter.tags?.map((tag: string) => (
              <Link href={`/${collectionName}?tag=${tag}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
