"use client";
//******************************************************************************
//    Simple searchbox component with placeholder.
//******************************************************************************

import styles from "../styles/Search.module.scss";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Search({ placeholder }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      className={styles.searchbox}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(
          (
            document.getElementsByClassName(
              styles.searchbar
            )[0] as HTMLInputElement
          ).value
        );
      }}
    >
      <input
        placeholder={placeholder}
        className={styles.searchbar}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <input type="submit" value="Search" className={styles.button} />
    </form>
  );
}
