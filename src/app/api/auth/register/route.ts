import {is, withPayload} from "@velz/common/lib/middleware/with-payload.ts";
import {compose} from "@velz/common/lib/middleware/compose.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const POST = compose([withPayload({email: is.string, password: is.string})], async req => {
  const {payload: {email, password}} = req;
  const {data: content, error} = await supabase
    .auth
    .signUp({email, password});

  if (error) throw error;
  return Response.json({
    meta: {links: {self: req.url}},
    status: 'SUCCESS',
    content,
  }, { status: 200 });
});
