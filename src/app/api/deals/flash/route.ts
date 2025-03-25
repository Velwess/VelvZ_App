import {withQuery} from "@velz/common/lib/middleware/with-query.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase";
import {pager} from "@velz/common/lib/pager";

export const GET = compose([withQuery({page: is.finite, pageSize: is.finite})], async req => {
  const {query: {page, pageSize}} = req;
  const {data: content, count, error} = await supabase.from('deals')
    .select('*, reviews(id, rating), categories(slug, name)', {count: 'exact'})
    .or(`end_date.gte.${new Date().toISOString()},end_date.is.null`)
    .eq('flash', true)
    .order('end_date', {ascending: false})
    .range(+pageSize * +page, +pageSize * (+page + 1) - 1);

  if (error) throw error;
  const {origin, pathname} = new URL(req.url!);
  const pagerMetadata = pager(page, pageSize, count ?? 0, new URL(req.url!).searchParams);
  return Response.json({
    content,
    paging: {count},
    status: 'SUCCESS',
    meta: {
      links: {
        self: `${origin}${pathname}?${pagerMetadata.current!.toString()}`,
        ...pagerMetadata.next ? {last: `${origin}${pathname}?${pagerMetadata.next.toString()}`} : {},
        ...pagerMetadata.last ? {last: `${origin}${pathname}?${pagerMetadata.last.toString()}`} : {},
        ...pagerMetadata.first ? {first: `${origin}${pathname}?${pagerMetadata.first.toString()}`} : {},
        ...pagerMetadata.previous ? {first: `${origin}${pathname}?${pagerMetadata.previous.toString()}`} : {},
      },
    },
  });
});
