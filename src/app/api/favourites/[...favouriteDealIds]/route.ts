import {withPath} from "@velz/common/lib/middleware/with-path.ts";
import {withJwt} from "@velz/common/lib/middleware/with-jwt.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const DELETE = compose([withJwt, withPath({favouriteDealIds: is.arrayOf(is.string)})], async req => {
  const {error} = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', req.jwt.claims.sub)
    .in('deal_id', req.path.favouriteDealIds)
    .setHeader('Authorization', `Bearer ${req.jwt.token}`);

  if (error) throw error;
  return new Response(null, {status: 303, headers: {Location: '/api/favourites'}});
});
