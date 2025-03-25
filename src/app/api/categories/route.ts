import {supabase} from "@velz/common/lib/supabase";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest) {
  const {data: content, error} = await supabase
    .from('categories')
    .select()
    .order('name', {ascending: true});
  if (error) throw error;

  return Response.json({
    meta: {links: {self: req.url}},
    status: 'SUCCESS',
    content,
  });
}
