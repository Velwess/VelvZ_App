import {useParams} from 'react-router-dom';
import {Clock, MapPin, Star} from 'lucide-react';
import {FavoriteButton} from '../components/FavoriteButton';
import {ShareButton} from '../components/ShareButton';
import {useEffect, useState} from "react";
import {Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";
import {ReviewComponent} from "../components/ReviewComponent.tsx";

function OfferDetail() {
  const {id} = useParams();
  const [deal, setDeal] = useState<Deal>();

  useEffect(() => {
    supabase.from('deals').select().eq('id', id!).maybeSingle()
      .then(({data}) => setDeal(data as any), err => {
        console.error(err);
        setDeal(void 0);
      })
  }, [id]);

  useEffect(() => {
    if (deal?.category_id) supabase.from('categories').select().eq('id', deal.category_id).maybeSingle()
      .then(({data}) => setDeal({...deal ?? {}, category: data as any}), console.error);
  }, [deal?.category_id]);

  if (!deal) return <div className="text-center py-12">Offre non trouvée</div>;

  return <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <img src={deal.image_url} alt={deal.title} className="w-full h-[400px] object-cover"/>
        <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
            {deal.discount_percentage ? `-${deal.discount_percentage}%` : 'Bon Plan'}
          </span>

        <ReviewComponent dealId={deal.id}/>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#E6A4B4] font-medium">{deal.category?.name}</span>
          <div className="flex items-center space-x-4">
            <FavoriteButton id={deal.id}/>
            <ShareButton title={deal.title}/>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{deal.title}</h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => <Star className="text-[#FFD700] mr-1" size={20} key={i}/>)}
            <span className="text-gray-500 ml-1">(0 avis)</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={20} className="mr-1"/>
            {deal.location ? <span>{deal.location}</span> : null}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline space-x-3 mb-2">
            <span className="text-3xl font-bold text-[#DA70D6]">{deal.final_price}€</span>
            <span className="text-xl text-gray-400 line-through">{deal.original_price}€</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={20} className="mr-2"/>
            <span>Valable {deal.end_date ? new Date(deal.end_date).toLocaleDateString() : '(non specifie)'}</span>
          </div>
        </div>

        <a href={deal.deal_url} target="_blank">
          <button
            className="w-full bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white py-3 rounded-full font-semibold mb-6 transition-colors">
            Profiter de l'offre
          </button>
        </a>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{deal.description ?? '-'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Conditions</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {deal.conditions?.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default OfferDetail;
