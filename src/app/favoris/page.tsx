'use client';
import {PagingComponent} from "@velz/common/components/PagingComponent.tsx";
import {DealComponent} from "@velz/common/components/DealComponent.tsx";
import {FavouriteDealIdsContext} from "@velz/common/domain/context.ts";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";

export default function FavorisPage() {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const {favouriteDealIds} = useContext(FavouriteDealIdsContext);

  useEffect(() => {
    if (!(pageSize && favouriteDealIds?.length)) return;
    fetch(`/api/deals/${favouriteDealIds.join('/')}?page=${page}&pageSize=${pageSize}`, {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Deal[]>>)
      .then(({content, paging: {count = 0} = {}}) => {
        setDeals(content);
        setCount(count);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, favouriteDealIds?.sort().join()]);

  if (!favouriteDealIds?.length) return <div className="text-center py-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Mes Favoris</h2>

    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
      <p className="text-gray-600 mb-4">Vous n'avez pas encore de favoris.</p>
      <Link href="/offres"
            className="inline-block bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white px-6 py-2 rounded-full font-semibold transition-colors">
        Découvrir les offres
      </Link>
    </div>
  </div>;

  return <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-800">Mes Favoris</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
    </div>

    <PagingComponent {...{count, setPage, setPageSize}} />
  </div>;
}
