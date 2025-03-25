export function pager(page: number, pageSize: number, count: number, current: URLSearchParams):
  Partial<Record<'first' | 'previous' | 'current' | 'next' | 'last', URLSearchParams>> {
  const params: Record<string, string> = [...current.entries()].reduce((_, [k, v]) => ({..._, [k]: v}), {});
  const last = Math.ceil((count - 1) / pageSize);
  return {
    ...1 < page ? {first: new URLSearchParams({...params, page: `0`})} : {},
    current: new URLSearchParams({...params, page: '0', pageSize: `${pageSize}`}),
    ...page < last ? {next: new URLSearchParams({...params, page: `${page + 1}`})} : {},
    ...page + 1 < last ? {last: new URLSearchParams({...params, page: `${last}`})} : {},
    ...0 < page ? {previous: new URLSearchParams({...params, page: `${page - 1}`})} : {},
  };
}
