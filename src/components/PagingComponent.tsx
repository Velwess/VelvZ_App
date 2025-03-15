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

  useEffect(() => {
    if (pageSize) {
      // const [min, max] = [0, Math.floor(count / pageSize)];
      // const range = [...Array(5)].map((_, i) => page + i - 2)
      //   .filter(_ => 0 <= _ && _ <= max);
      // console.log({min, max, count, page, pageSize});
      // console.warn(range);
    }
    setPageSize(pageSize);
    setPage(page);
  }, [count, page, pageSize]);

  return <></>;
  // return <>x/{count}</>;
}
