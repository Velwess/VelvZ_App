import {withPath} from "@velz/common/lib/middleware/with-path.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([withPath({slug: is.string})], async req => {
  const {data: content, error} = await supabase
    .from('categories')
    .select()
    .eq('slug', req.path.slug)
    .maybeSingle();

  if (error) throw error;

  return Response.json({
    content: content && content || undefined,
    status: content ? 'SUCCESS' : 'ERROR',
    meta: {links: {self: req.url}},
  }, {status: content ? 200 : 404});
});
