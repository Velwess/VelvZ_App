import {withQuery} from "@velz/common/lib/middleware/with-query.ts";
import {withPath} from "@velz/common/lib/middleware/with-path.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([
  withPath({dealIds: is.arrayOf(is.string)}),
  withQuery({page: is.finite, pageSize: is.finite})], async req => {
  const {path: {dealIds}, query: {page, pageSize}} = req;
  // eslint-disable-next-line prefer-const
  let {data: content = [], count = 0, error} = await supabase
    .from('deals')
    .select('*, reviews(id, rating), favorites(id), categories(slug, name)', {count: 'exact'})
    .in('id', dealIds)
    .order('end_date', {ascending: false})
    .range(+pageSize * +page, +pageSize * (+page + 1) - 1);

  if ('PGRST103' === error?.code) content = [];
  else if (error) throw error;

  // TODO: Insert pager metadata
  return Response.json({
    paging: Number.isFinite(count) ? {count} : undefined,
    meta: {links: {self: req.url}},
    status: 'SUCCESS',
    content: content,
  }, {status: 200});
});
