import {useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Filter} from 'lucide-react';
import {Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";
import {DealComponent} from "../components/DealComponent.tsx";
import {PageSizeContext} from "../domain/context.ts";
import {PagingComponent} from "../components/PagingComponent.tsx";

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

function Offers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [searchParams] = useSearchParams();
  const [deals, setDeals] = useState<Deal[]>([]);
  const {pageSize} = useContext(PageSizeContext);
  const [sortField, category_slug, sortAscending] = [
    searchParams.get('sort'), searchParams.get('category'), 'true' === searchParams.get('ascending')];

  useEffect(() => {
    let query = supabase.from('deals').select('*, categories!inner(slug), reviews(id, rating)')
      .gte('end_date', new Date().toISOString());
    if (category_slug) query = query.eq('categories.slug', category_slug);
    query
      .order(sortField ?? 'end_date', {ascending: sortField ? sortAscending : false})
      .range(pageSize * page, pageSize * (page + 1) - 1)
      .then(({data}) => setDeals(data as any as Deal[]), console.error);
  }, [sortField, sortAscending, category_slug]);

  return <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-800">Toutes les offres</h2>
      <div className="flex items-center space-x-4">
        <Filter className="text-[#E6A4B4]" size={20}/>
        <select
          className="border border-gray-200 rounded-full px-4 py-2 text-gray-600 focus:outline-none focus:border-[#E6A4B4]"
          onChange={(e) => navigate(['/offres', search(e.target.value)].filter(Boolean).join('?'))}
          value={(SORTS.find(_ => _.field === sortField) ?? SORTS[0]).label}>
          {SORTS.map(({label}) =>
            <option value={label} key={label}>{label}</option>)}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals?.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
    </div>

    <PagingComponent setPage={setPage}/>
  </div>;

  function search(label = 'Trier') {
    const sort = SORTS.find(_ => label === _.label);
    return [
      category_slug && `category=${category_slug}`,
      sort?.field && `ascending=${sort.ascending}`,
      sort?.field && `sort=${sort.field}`,
    ].filter(Boolean).join('&');
  }
}

export default Offers;
