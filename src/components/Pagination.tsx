//******************************************************************************
//    Pagination component listing and linking to the different blog pages, when
//    there are more posts than the limit set in the siteinfo file.
//******************************************************************************

import styles from "../styles/Pagination.module.scss";

function Link({ index, currentPage, children, query }: any) {
  const className = index === currentPage ? styles.active : "";
  let target = `/blog?page=${index}`;
  if (query != "") {
    target = `/blog?query=${query}&page=${index}`;
  }
  return (
    <a href={index !== currentPage ? target : undefined} className={className}>
      {children}
    </a>
  );
}

export function Pagination(
  props: Readonly<{
    pages: any;
    currentPage: number;
    query?: string;
    settings: any;
  }>
) {
  const pageArray = Array.from({ length: props.pages }, (v: any, i) => i + 1);
  const listedPages = pageArray.slice(
    Math.max(props.currentPage - props.settings.maxPages - 1, 0),
    Math.min(props.currentPage + props.settings.maxPages, pageArray.length)
  );
  const settings = props.settings;
  const currentPage = props.currentPage;
  const pages = props.pages;
  const query = props.query;

  return (
    <>
      {pageArray.length > 1 && (
        <div className={styles.pagination}>
          {settings.firstLast && currentPage > 1 ? (
            <Link index={1} currentPage={currentPage} query={query}>
              &#8676;
            </Link>
          ) : (
            settings.centralised && <span>&nbsp;</span>
          )}

          {settings.prevNext && currentPage > 1 ? (
            <Link
              index={currentPage - 1}
              currentPage={currentPage}
              query={query}
            >
              &larr;
            </Link>
          ) : (
            settings.centralised && <span>&nbsp;</span>
          )}

          {listedPages.map((page: any) => (
            <Link
              key={page}
              index={page}
              currentPage={currentPage}
              query={query}
            >
              {page}
            </Link>
          ))}

          {settings.prevNext && currentPage < pages ? (
            <Link
              index={currentPage + 1}
              currentPage={currentPage}
              query={query}
            >
              &rarr;
            </Link>
          ) : (
            settings.centralised && <span>&nbsp;</span>
          )}

          {settings.firstLast && currentPage < pages ? (
            <Link index={pages} currentPage={currentPage} query={query}>
              &#8677;
            </Link>
          ) : (
            settings.centralised && <span>&nbsp;</span>
          )}
        </div>
      )}
    </>
  );
}
