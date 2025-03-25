'use client';
import {PagingComponent} from "@velz/common/components/PagingComponent.tsx";
import {DealComponent} from "@velz/common/components/DealComponent.tsx";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from 'react';
import {Filter} from 'lucide-react';

interface Sort {
  field: string;
  label: string;
  ascending?: boolean;
}

const SORTS: Sort[] = [
  {field: '', label: 'Trier'},
  {field: 'final_price', ascending: true, label: 'Prix Croissant'},
  {field: 'final_price', ascending: false, label: 'Prix Décroissant'},
];

export default function DealsPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [sort, category, ascending] = [
    searchParams.get('tri'), searchParams.get('categorie'), 'true' === searchParams.get('ordre')];

  useEffect(() => {
    if (!pageSize) return;
    fetch([`/api/deals?sort=${sort || 'end_date'}&ascending=${ascending}&page=${page}&pageSize=${pageSize}`,
      category && `slug=${category}`,
    ].filter(Boolean).join('&'), {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Deal[]>>)
      .then(({content, paging: {count = 0} = {}}) => {
        setDeals(content);
        setCount(count);
      });
  }, [page, pageSize, sort, ascending, category]);

  return <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-800">Toutes les offres</h2>
      <div className="flex items-center space-x-4">
        <Filter className="text-[#E6A4B4]" size={20}/>
        <select
          className="border border-gray-200 rounded-full px-4 py-2 text-gray-600 focus:outline-none focus:border-[#E6A4B4]"
          onChange={(e) => router.push(['/offres', search(e.target.value)].filter(Boolean).join('?'))}
          value={(SORTS.find(_ => _.field === sort) ?? SORTS[0]).label}>
          {SORTS.map(({label}) =>
            <option value={label} key={label}>{label}</option>)}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals?.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
    </div>

    <PagingComponent {...{count, setPage, setPageSize}} />
  </div>;

  function search(label = 'Trier') {
    const sort = SORTS.find(_ => label === _.label);
    return [
      category && `categorie=${category}`,
      sort?.field && `ordre=${sort.ascending}`,
      sort?.field && `tri=${sort.field}`,
    ].filter(Boolean).join('&');
  }
}
