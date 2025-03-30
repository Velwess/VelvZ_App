import {compose} from "@velz/common/lib/middleware/compose.ts";
import {is, withPayload} from "@velz/common/lib/middleware/with-payload.ts";
import {supabase} from "@velz/common/lib/supabase.ts";

export const PATCH = compose([withPayload({email: is.string})], async req => {
  const {error} = await supabase
    .from('newsletter_subscribers')
    .upsert({email: req.payload.email}, {ignoreDuplicates: true, onConflict: 'email'});

  if (error) {
    console.log(error)
    throw error;
  }
  return Response.json({status: 'SUCCESS', meta: {links: {self: req.url}}}, {status: 200});
});
