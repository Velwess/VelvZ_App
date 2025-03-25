import {is, withPayload} from "@velz/common/lib/middleware/with-payload.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const POST = compose([withPayload({email: is.string, password: is.string})], async req => {
  const {payload: {email, password}} = req;
  const {data, error} = await supabase.auth
    .signInWithPassword({email, password});
  return Response.json({
    status: error ? 'ERROR' : 'SUCCESS',
    meta: {links: {self: req.url}},
    content: error ?? data,
  });
});
