import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {withQuery} from "@velz/common/lib/middleware/with-query.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([withQuery({
  sort: is.optional.enum(['final_price', 'end_date', 'start_date', 'discount_percentage']),
  ascending: is.optional.enum(['true', 'false']),
  slug: is.optional.string,
  pageSize: is.finite,
  page: is.finite,
})], async req => {
  const {query: {slug, sort = 'end_date', page, pageSize, ascending = 'false'}} = req;
  const query = supabase.from('deals')
    .select('*, reviews(id, rating), categories!inner(slug, name)', {count: 'exact'});
  if (slug) query.eq('categories.slug', slug);
  query
    // .gte('end_date', new Date().toISOString())
    .or(`end_date.gte.${new Date().toISOString()},end_date.is.null`)
    .order(sort, {ascending: 'true' === ascending})
    .range(+pageSize * +page, +pageSize * (+page + 1) - 1);

  const {data: content, count, error} = await query;

  if (error) throw error;
  // TODO: Fill in pager links
  return Response.json({
    meta: {links: {self: req.url!}},
    paging: {count: count!},
    content: content,
    status: 'SUCCESS',
  } satisfies ApiResponse<Deal[]>, {status: 200});
});
