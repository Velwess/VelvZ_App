import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {withPath} from "@velz/common/lib/middleware/with-path.ts";
import {withJwt} from "@velz/common/lib/middleware/with-jwt.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {ApiStatus} from "@velz/common/lib/database.types.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([withJwt, withPath({dealId: is.string})], async req => {
  const {path: {dealId}} = req
  const {data: content, error} = await supabase
    .from('reviews')
    .select()
    .match({deal_id: dealId, user_id: req.jwt.claims.sub})
    .maybeSingle();

  if (error) throw error;
  const code = content ? 200 : 404;
  const status: ApiStatus = content ? 'SUCCESS' : 'ERROR';

  return Response.json({
    content: content && content || undefined,
    meta: {links: {self: req.url}},
    status: status,
  }, {status: code});
});
