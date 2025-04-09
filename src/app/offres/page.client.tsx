'use client';
import {ApiResponse, Category, Deal} from "@velz/common/lib/database.types.ts";
import {PagingComponent} from "@velz/common/components/PagingComponent.tsx";
import {DealComponent} from "@velz/common/components/DealComponent.tsx";
import {useRouter, useSearchParams} from "next/navigation";
import {Header} from "@velz/common/components/header.tsx";
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

export interface OffresClientPageProps {
  category?: Category;
  ascending?: boolean;
  pageSize?: number;
  deals?: Deal[];
  count?: number;
  slug?: string;
  sort?: string;
  page?: number;
}

export default function OffresClientPage(props: OffresClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState(props.slug!);
  const [sort, setSort] = useState(props.sort!);
  const [page, setPage] = useState(props.page ?? 0);
  const [count, setCount] = useState(props.count ?? 0);
  const [category, setCategory] = useState(props.category);
  const [ascending, setAscending] = useState(props.ascending!);
  const [pageSize, setPageSize] = useState(props.pageSize ?? 0);
  const [deals, setDeals] = useState<Deal[]>(props.deals ?? []);

  useEffect(() => {
    const slug = searchParams.get('categorie') ?? props.slug!;

    setSlug(slug);
    setAscending('true' === searchParams.get('ordre'));
    setSort((searchParams.get('tri') ?? props.sort) || 'end_date');
    fetch(`/api/categories/${slug}`, {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Category>>)
      .then(({content, status}) => 'SUCCESS' === status && setCategory(content))
  }, [searchParams]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pageSize) return;
    fetch([`/api/deals?sort=${sort || 'end_date'}&ascending=${ascending}&page=${page}&pageSize=${pageSize}`,
      slug && `slug=${slug}`,
    ].filter(Boolean).join('&'), {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<Deal[]>>)
      .then(({content, paging: {count = 0} = {}}) => {
        setDeals(content);
        setCount(count);
      });
  }, [page, pageSize, sort, ascending, slug]);

  return <section>
    <Header title={category ? `Offres ${category.name}` : 'Toutes les offres'}/>

    <article className="mb-6 flex items-center justify-between place-self-end">
      <div className="flex items-center space-x-4">
        <Filter className="text-secondary" size={20}/>
        <select
          className="border border-gray-200 rounded-full px-4 py-2 text-gray-600 focus:outline-none focus:border-secondary"
          onChange={(e) => router.push(['/offres', search(e.target.value)].filter(Boolean).join('?'))}
          value={(SORTS.find(_ => _.field === sort) ?? SORTS[0]).label}>
          {SORTS.map(({label}) =>
            <option value={label} key={label}>{label}</option>)}
        </select>
      </div>
    </article>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals?.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
    </div>

    <PagingComponent {...{count, setPage, setPageSize}} />
  </section>;

  function search(label = 'Trier') {
    const sort = SORTS.find(_ => label === _.label);
    return [
      slug && `categorie=${slug}`,
      sort?.field && `ordre=${sort.ascending}`,
      sort?.field && `tri=${sort.field}`,
    ].filter(Boolean).join('&');
  }
}
