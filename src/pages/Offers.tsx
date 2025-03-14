import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {Filter} from 'lucide-react';
import {Category, Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";
import {DealComponent} from "../components/DealComponent.tsx";

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
  const [searchParams] = useSearchParams();
  const [deals, setDeals] = useState<Deal[]>([]);
  const sort_by = searchParams.get('sort_by') ?? '';
  const [category, setCategory] = useState<Category>();
  const category_slug = searchParams.get('category') ?? '';

  useEffect(() => {
    supabase.from('categories').select().eq('slug', category_slug).maybeSingle()
      .then(({data}) => setCategory(data), console.error);
  }, [category_slug]);
  useEffect(() => {
    let query = supabase.from('deals').select();
    const sort = SORTS.find(({label}) => label === sort_by);
    if (category) query = query.eq('category_id', category.id);

    query.gte('end_date', new Date().toISOString())
      .order(sort?.field ?? 'end_date', {ascending: !!sort?.ascending})
      .then(({data}) => setDeals(data as Deal[]), console.error);
  }, [sort_by, category?.id]);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Toutes les offres</h2>
        <div className="flex items-center space-x-4">
          <Filter className="text-[#E6A4B4]" size={20}/>
          <select
            value={sort_by as string}
            onChange={(e) => navigate(`/offres?category=${category_slug}${(_ => 'Trier' === _ ? '' : `&sort_by=${_}`)(e.target.value)}`)}
            className="border border-gray-200 rounded-full px-4 py-2 text-gray-600 focus:outline-none focus:border-[#E6A4B4]"
          >
            {SORTS.map(({label}) => <option value={label} key={label}>{label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals?.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
      </div>
    </div>
  );
}

export default Offers;
