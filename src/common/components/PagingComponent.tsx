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
  const page = +(useSearchParams().get('page') ?? 0) || 0;
  const {pageSize} = useContext(PageSizeContext);

  useEffect(() => {
    setPageSize(pageSize);
    setPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, page, pageSize]);

  return <></>;
}
