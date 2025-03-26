import FavorisClientPage from "@velz/app/favoris/page.client.tsx";
import {cookies} from "next/headers";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {Params} from "next/dist/server/request/params";

export default async function FavorisPage(props: { searchParams: Promise<Params> }) {
  const {PORT = 3000} = process.env;
  let favouriteDealIds: string[] = [];
  const searchParams = await props.searchParams;
  const page = is.finite(searchParams.page) ? searchParams.page : 0;
  const pageSize = is.finite(searchParams.taille) ? searchParams.taille : 20;

  try {
    const parsed = JSON.parse((await cookies()).get('favouriteDealIds')?.value ?? '[]');
    if (is(parsed, is.arrayOf(is.string))) favouriteDealIds = parsed as string[];
  } catch (_: any) {// eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  }

  const {content: favouriteDeals = [], paging: {count = 0} = {}} = await fetch(
    `http://0.0.0.0:${PORT}/api/deals/${favouriteDealIds?.sort().join('/')}?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    })
    .then(res => res.json() as Promise<ApiResponse<Deal[]>>);

  return <FavorisClientPage {...{favouriteDeals, pageSize, page, count}} />;
}
