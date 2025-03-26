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
    .or(`${sort}.gte.${new Date().toISOString()},${sort}.is.null`)
    .order(sort, {ascending: 'true' === ascending})
    .range(+pageSize * +page, +pageSize * (+page + 1) - 1);

  // eslint-disable-next-line prefer-const
  let {data: content = [], count = 0, error} = await query;

  if ('PGRST103' === error?.code) content = [];
  else if (error) throw error;
  // TODO: Fill in pager links
  return Response.json({
    meta: {links: {self: req.url!}},
    paging: {count: count!},
    status: 'SUCCESS',
    content,
  }, {status: 200});
});
