"use client";

import {FavoriteButton} from "@velz/common/components/FavoriteButton.tsx";
import {Deal} from "@velz/common/lib/database.types.ts";
import {useRouter} from "next/navigation";
import {Star} from "lucide-react";
import Link from "next/link";

export function DealComponent({deal}: { deal: Deal }) {
  const router = useRouter();

  return <div onClick={() => router.push(`/offres/${deal.id}`)}
              className="bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative">
      <img src={deal.image_url} alt={deal.title} className="w-full h-48 object-cover"/>
      <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
        {deal.discount_percentage ? `-${deal.discount_percentage}%` : 'Bon Plan'}
      </span>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <Link href={`/offres?categorie=${deal.categories?.slug}`}
              className="text-sm text-[#E6A4B4]">{deal.categories?.name}</Link>
        <div className="flex items-center">
          {(rating => [...Array(5)].map((_, i) => 1 + i).map(i => <Star
            className={['text-[#FFD700] mr-1', i <= rating ? 'fill-[#FFD700]' : ''].join(' ')}
            size={16} key={i}/>))(
            (deal.reviews?.reduce((_, {rating}) => _ + rating, 0) ?? 0) / (deal.reviews?.length ?? 1))}
        </div>
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{deal.title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {deal.end_date && `Expire le ${new Date(deal.end_date).toLocaleDateString()}` || ''}
        </span>
        <FavoriteButton id={deal.id}/>
      </div>
    </div>
  </div>;
}
