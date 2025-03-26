import HomeClientPage from "@velz/app/page.client.tsx";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {is} from "@velz/common/lib/middleware/with-payload.ts";
import {Params} from "next/dist/server/request/params";

export default async function HomePage(props: { searchParams: Promise<Params> }) {
  const {PORT = 3000} = process.env;
  const searchParams = await props.searchParams;
  const page = is.finite(searchParams.page) ? searchParams.page : 0;
  const pageSize = is.finite(searchParams.taille) ? searchParams.taille : 20;
  const {
    content: deals = [],
    paging: {count = 0} = {},
  } = await fetch(`http://0.0.0.0:${PORT}/api/deals/flash?page=${page}&pageSize=${pageSize}`)
    .then(_ => _.json() as Promise<ApiResponse<Deal[]>>);

  return <HomeClientPage {...{pageSize, deals, page, count}}/>;
}
