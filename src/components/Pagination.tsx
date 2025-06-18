import styles from "../styles/Pagination.module.scss";

function Link({ index, currentPage, children }: any) {
  const className = index === currentPage ? styles.active : "";
  return (
    <a
      href={index !== currentPage ? `/blog/${index}` : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

export function Pagination({ pages, currentPage, settings }: any) {
  const pageArray = Array.from({ length: pages }, (v: any, i) => i + 1);
  const listedPages = pageArray.slice(
    Math.max(currentPage - settings.maxPages - 1, 0),
    Math.min(currentPage + settings.maxPages, pageArray.length)
  );
  return (
    <div className={styles.pagination}>
      {settings.firstLast && currentPage > 1 ? (
        <Link index={1} currentPage={currentPage}>
          &#8676;
        </Link>
      ) : (
        settings.centralised && <span>&nbsp;</span>
      )}

      {settings.prevNext && currentPage > 1 ? (
        <Link index={currentPage - 1} currentPage={currentPage}>
          &larr;
        </Link>
      ) : (
        settings.centralised && <span>&nbsp;</span>
      )}

      {listedPages.map((page: any) => (
        <Link key={page} index={page} currentPage={currentPage}>
          {page}
        </Link>
      ))}

      {settings.prevNext && currentPage < pages ? (
        <Link index={currentPage + 1} currentPage={currentPage}>
          &rarr;
        </Link>
      ) : (
        settings.centralised && <span>&nbsp;</span>
      )}

      {settings.firstLast && currentPage < pages ? (
        <Link index={pages} currentPage={currentPage}>
          &#8677;
        </Link>
      ) : (
        settings.centralised && <span>&nbsp;</span>
      )}
    </div>
  );
}
