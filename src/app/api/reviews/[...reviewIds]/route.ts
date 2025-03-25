import {withPath} from "@velz/common/lib/middleware/with-path.ts";
import {withJwt} from "@velz/common/lib/middleware/with-jwt.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([withJwt, withPath({reviewIds: is.arrayOf(is.string)})], async req => {
  const {data: content, error} = await supabase
    .from('reviews')
    .select()
    .in('id', req.path.reviewIds)
    .eq('user_id', req.jwt.claims.sub)
    .setHeader('Authorization', `Bearer ${req.jwt.token}`);

  if (error) throw error;
  return Response.json({
    meta: {links: {self: req.url}},
    content: content,
    status: 'SUCCESS',
  }, {status: 200});
});
