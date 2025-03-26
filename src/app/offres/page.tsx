import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import OffresClientPage from "@velz/app/offres/page.client.tsx";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {Params} from "next/dist/server/request/params";

export default async function OffresPage(props: { searchParams: Promise<Params> }) {
  const {PORT = 3000} = process.env;
  const searchParams = await props.searchParams;
  const category = searchParams.categorie as undefined | string;
  const page = is.finite(searchParams.page) ? searchParams.page : 0;
  const pageSize = is.finite(searchParams.taille) ? searchParams.taille : 20;
  const ascending = is(searchParams.ordre, is.enum(['true', 'false'])) ? 'true' === searchParams.trie : false;
  const sort = is(searchParams.tri, is.enum(['final_price', 'end_date', 'start_date', 'discount_percentage'])) ? searchParams.tri : 'end_date';

  const query = new URLSearchParams({ascending: `${ascending}`, pageSize: `${pageSize}`, page: `${page}`, sort});
  if (category) query.set('slug', category);

  const {content: deals = [], paging: {count = 0} = {}} =
    await fetch(`http://0.0.0.0:${PORT}/api/deals?${query.toString()}`, {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Deal[]>>);

  return <OffresClientPage {...{ascending, category, pageSize, deals, page, count}}/>
}
