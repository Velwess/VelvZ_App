import {is, withPayload} from "@velz/common/lib/middleware/with-payload.ts";
import {withJwt} from "@velz/common/lib/middleware/with-jwt.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const GET = compose([withJwt], async req => {
  const {data: content = [], error} = await supabase
    .from('favorites')
    .select('deal_id')
    .eq('user_id', req.jwt.claims.sub)
    .setHeader('Authorization', `Bearer ${req.jwt.token}`)
    .then(({data, error}) => {
      if (error) return {error};
      return {data: (data as { deal_id: string }[]).map(({deal_id}) => deal_id)};
    });

  if (error) throw error;
  return Response.json({status: 'SUCCESS', meta: {links: {self: req.url}}, content}, {status: 200});
});

export const POST = compose([withJwt, withPayload(is.arrayOf(is.string))], async req => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let initial: Set<string>, remove: string[] = [], add: string[] = [], error: any;

  // eslint-disable-next-line prefer-const
  ({data: initial = new Set<string>(), error} = await supabase
    .from('favorites')
    .select('deal_id')
    .eq('user_id', req.jwt.claims.sub)
    .setHeader('Authorization', `Bearer ${req.jwt.token}`)
    .then(({data, error}) => {
      if (error) return {error};
      return {data: new Set((data as { deal_id: string }[]).map(({deal_id}) => deal_id))};
    }));

  if (error) throw error;
  const favouriteDealIds = new Set(req.payload);
  [remove, add] = [
    [...initial].filter(_ => !favouriteDealIds.has(_)),
    [...favouriteDealIds].filter(_ => !initial.has(_))];

  if (remove.length) ({error} = await supabase
    .from('favorites')
    .delete()
    .in('deal_id', remove)
    .eq('user_id', req.jwt.claims.sub)
    .setHeader('Authorization', `Bearer ${req.jwt.token}`));

  if (error) throw error;
  if (add.length) ({error} = await supabase
    .from('favorites')
    .upsert(add.map(deal_id => ({deal_id, user_id: req.jwt.claims.sub})),
      {ignoreDuplicates: true, onConflict: 'deal_id, user_id'})
    .setHeader('Authorization', `Bearer ${req.jwt.token}`));

  if (error) throw error;
  return Response.json({
    meta: {links: {self: req.url}},
    content: [...favouriteDealIds],
    status: 'SUCCESS',
  }, {status: 200});
});

export const PUT = POST;

export const PATCH = compose([withJwt, withPayload(is.arrayOf(is.string))], async req => {
  const {error} = await supabase
    .from('favorites')
    .upsert(req.payload.map(deal_id => ({deal_id, user_id: req.jwt.claims.sub})),
      {ignoreDuplicates: true, onConflict: 'deal_id, user_id'})
    .setHeader('Authorization', `Bearer ${req.jwt.token!}`);

  if (error) throw error;
  return new Response(null, {status: 303, headers: {Location: '/api/favourites'}});
});
