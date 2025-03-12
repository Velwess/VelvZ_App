import {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Filter, Star} from 'lucide-react';
import {FavoriteButton} from '../components/FavoriteButton';
import {Category, Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";

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
        {deals?.map((deal) => (
          <Link
            to={`/offre/${deal.id}`}
            key={deal.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img src={deal.image_url} alt={deal.title} className="w-full h-48 object-cover"/>
              <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
                {deal.discount_percentage ? `-${deal.discount_percentage}%` : 'Bon Plan'}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E6A4B4] capitalize">{deal.category?.name}</span>
                <div className="flex items-center">
                  <Star className="text-[#FFD700] mr-1" size={16}/>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{deal.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Expire le {new Date(deal.end_date).toLocaleDateString()}
                </span>
                <FavoriteButton id={deal.id}/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Offers;
