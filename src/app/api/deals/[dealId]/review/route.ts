import {is, withPayload} from "@velz/common/lib/middleware/with-payload.ts";
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

export const PATCH = compose([
  withJwt,
  withPath({dealId: is.string}),
  withPayload({comment: is.string, rating: is.finite})], async req => {

  const {path: {dealId}, payload: {comment, rating}, jwt: {claims: {sub}}} = req;
  const {error} = await supabase
    .from('reviews')
    .upsert({rating, comment, deal_id: dealId, user_id: sub}, {onConflict: 'user_id, deal_id'})
    .maybeSingle()
    .setHeader('Authorization', `Bearer ${req.jwt.token}`);

  if (error) throw error;
  return Response.redirect(`${new URL(req.url!).origin}/api/deals/${dealId}/review`, 303);
});
