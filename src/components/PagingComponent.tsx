import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export function PagingComponent({setPage}: { setPage(page: number): void }) {
  const page = +(useSearchParams()[0].get('page') ?? 0) || 0;

  useEffect(() => setPage(page), [page]);

  return <></>;
}
