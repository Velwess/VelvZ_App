import DealDetailClientPage from "@velz/app/offres/[dealId]/page.client.tsx";
import {Params} from "next/dist/server/request/params";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";

export default async function DealDetailPage({params}: { params: Promise<Params> }) {
  const {dealId} = await params;
  const {PORT = 3000} = process.env;
  const {content: [deal] = []} = await fetch(
    `http://0.0.0.0:${PORT}/api/deals/${dealId}?page=0&pageSize=1`, {
      method: 'GET',
    })
    .then(res => res.json() as Promise<ApiResponse<[Deal]>>);

  return <DealDetailClientPage {...{deal}}/>;
}
