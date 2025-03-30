'use client';
import {ReviewComponent} from "@velz/common/components/ReviewComponent.tsx";
import {FavoriteButton} from '@velz/common/components/FavoriteButton.tsx';
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {ShareButton} from '@velz/common/components/ShareButton.tsx';
import {Clock, MapPin, Star} from 'lucide-react';
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";

export interface DealDetailClientPage {
  deal?: Deal;
}
export default function DealDetailClientPage(props: DealDetailClientPage) {
  const {dealId} = useParams();
  const [deal, setDeal] = useState(props.deal);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => refresh(), [dealId]);

  if (!deal) return <div className="text-center py-12">
    Offre non trouvée
  </div>;

  return <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <img src={deal.image_url} alt={deal.title} className="w-full h-[400px] object-cover"/>
        <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
          {deal.discount_percentage ? `-${deal.discount_percentage}%` : 'Bon Plan'}
        </span>

        <ReviewComponent dealId={deal.id} onUpdate={refresh}/>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <Link href={`/offres?categorie=${deal.categories?.slug}`}
                className="text-sm text-[#E6A4B4] font-medium">
            {deal.categories?.name}
          </Link>
          <div className="flex items-center space-x-4">
            <FavoriteButton id={deal.id}/>
            <ShareButton title={deal.title}/>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{deal.title}</h1>

        <div className="flex mb-6 gap-2 flex-col">
          <div className="flex gap-2 text-gray-600 text-nowrap">
            <MapPin size={20}/>
            {deal.location ? <span>{deal.location}</span> : null}
          </div>
          <div className="flex items-start">
            {(rating => [...Array(5)].map((_, i) => 1 + i).map(i => <Star
              className={['text-[#FFD700]', i <= rating ? 'fill-[#FFD700]' : ''].join(' ')}
              size={20}
              key={i}/>))(
              (deal.reviews?.reduce((_, {rating}) => _ + rating, 0) ?? 0) / (deal.reviews?.length ?? 1))}
            <span className="text-nowrap text-gray-500 pl-2">({deal.reviews?.length ?? 0} avis)</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline space-x-3 mb-2">
            <span className="text-3xl font-bold text-[#DA70D6]">{deal.final_price}€</span>
            <span className="text-xl text-gray-400 line-through">{deal.original_price}€</span>
          </div>
          {deal.end_date ? <div className="flex items-center text-gray-600">
            <Clock size={20} className="mr-2"/>
            <span>Valable: {new Date(deal.end_date).toLocaleDateString()}</span>
          </div> : null}
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

  function refresh() {
    if (!dealId) return setDeal(void 0);
    fetch(`/api/deals/${dealId}?page=0&pageSize=1`, {method: 'GET'})
      .then(res => res.json() as Promise<ApiResponse<[Deal]>>)
      .then(({content: [deal]}) => setDeal(deal));
  }
}
