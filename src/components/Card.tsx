import Link from "next/link";
import Image from "next/image";

import siteinfo from "../siteinfo";
import style from "./Card.module.scss";

const formatDate = (date: string) => {
  let dateObject = new Date(date);
  let yyyy = dateObject.getFullYear(),
    mm = `0${dateObject.getMonth() + 1}`.slice(-2),
    dd = `0${dateObject.getDate() + 1}`.slice(-2);
  return `${dd}/${mm}/${yyyy}`;
};

export function Card({ path, slug, frontmatter, children }: any) {
  return (
    <Link href={`${path}/${slug}`} className={style.cardWrapper}>
      <article className={style.card}>
        {siteinfo.blog.thumbnails && (
          <div className={style.thumbnail}>
            <Image src={frontmatter.thumbnail} alt={frontmatter.title} fill />
          </div>
        )}
        <div className={style.content}>
          <h1>{frontmatter.title}</h1>
          <p>{formatDate(frontmatter.date)}</p>
        </div>
      </article>
    </Link>
  );
}
