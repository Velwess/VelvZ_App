"use client";
import {PageSizeContext} from "@velz/common/domain/context.ts";
import {useSearchParams} from "next/navigation";
import {useContext, useEffect} from "react";

export interface PagingComponentProps {
  setPageSize(pageSize: number): void;

  setPage(page: number): void;

  count: number;
}

export function PagingComponent({count, setPage, setPageSize}: PagingComponentProps) {
  const pageSizeContext = useContext(PageSizeContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    setPageSize(+(searchParams.get('taille') ?? 0) || pageSizeContext.pageSize);
    setPage(+(searchParams.get('page') ?? 0) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, searchParams]);

  return <></>;
}
