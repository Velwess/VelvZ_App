import {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {Star} from 'lucide-react';
import {FavoriteButton} from '../components/FavoriteButton';
import {Category, Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";

function Offers() {
  const [searchParams] = useSearchParams();
  const [deals, setDeals] = useState<Deal[]>([]);
  const category_slug = searchParams.get('category');
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    supabase.from('categories').select().eq('slug', category_slug).maybeSingle()
      .then(({data}) => setCategory(data), console.error);
  }, [category_slug]);
  useEffect(() => {
    if (category) supabase
      .from('deals').select()
      .eq('category_id', category.id)
      .gte('end_date', new Date().toISOString())
      .order('end_date', {ascending: false})
      .then(({data}) => setDeals(data as Deal[]), console.error);
  }, [category?.id]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Toutes les offres</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
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
