import {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {PageSizeContext} from "../domain/context.ts";

export interface PagingComponentProps {
  setPageSize(pageSize: number): void;
  setPage(page: number): void;
  count: number;
}
export function PagingComponent({count, setPage, setPageSize}: PagingComponentProps) {
  const page = +(useSearchParams()[0].get('page') ?? 0) || 0;
  const {pageSize} = useContext(PageSizeContext);

  useEffect(() => setPageSize(pageSize), [pageSize]);
  useEffect(() => setPage(page), [page]);

  return <>x/{count}</>;
}
