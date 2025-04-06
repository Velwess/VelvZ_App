"use client";
import { ReviewComponent } from "@velz/common/components/ReviewComponent.tsx";
import { FavoriteButton } from "@velz/common/components/FavoriteButton.tsx";
import { ApiResponse, Deal } from "@velz/common/lib/database.types.ts";
import { ShareButton } from "@velz/common/components/ShareButton.tsx";
import { Clock, HeartHandshake, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export interface DealDetailClientPage {
  deal?: Deal;
}

export default function DealDetailClientPage(props: DealDetailClientPage) {
  const { dealId } = useParams();
  const [deal, setDeal] = useState(props.deal);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => refresh(), [dealId]);

  if (!deal) return <div className="text-center py-12">Offre non trouvée</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 p-4 md:p-0">
        <div className="relative">
          <img
            src={deal.image_url}
            alt={deal.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
          />
          <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
            {deal.discount_percentage
              ? `-${deal.discount_percentage}%`
              : "Bon Plan"}
          </span>

          <ReviewComponent dealId={deal.id} onUpdate={refresh} />
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <Link
              href={`/offres?categorie=${deal.categories?.slug}`}
              className="text-sm text-[#E6A4B4] font-medium break-words"
            >
              {deal.categories?.name}
            </Link>
            <div className="flex items-center space-x-4">
              <FavoriteButton id={deal.id} />
              <ShareButton title={deal.title} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4 break-words">
            {deal.title}
          </h1>

          <div className="flex mb-6 gap-2 flex-col">
            <div className="flex gap-2 text-gray-600 flex-wrap">
              <MapPin size={20} />
              {deal.location ? (
                <span className="break-words">{deal.location}</span>
              ) : null}
            </div>
            <div className="flex items-start flex-wrap">
              {((rating) =>
                [...Array(5)]
                  .map((_, i) => 1 + i)
                  .map((i) => (
                    <Star
                      className={[
                        "text-[#FFD700]",
                        i <= rating ? "fill-[#FFD700]" : "",
                      ].join(" ")}
                      size={20}
                      key={i}
                    />
                  )))(
                (deal.reviews?.reduce((_, { rating }) => _ + rating, 0) ?? 0) /
                  (deal.reviews?.length ?? 1)
              )}
              <span className="text-nowrap text-gray-500 pl-2">
                ({deal.reviews?.length ?? 0} avis)
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline space-x-3 mb-2 flex-wrap">
              <span className="text-3xl font-bold text-[#DA70D6] break-words">
                {0 === deal.final_price ? "Gratuit" : `${deal.final_price}€`}
              </span>
              {null === deal.original_price ? null : (
                <span className="text-md text-gray-400 break-words">
                  {deal.original_price}€
                </span>
              )}
            </div>
            {deal.end_date ? (
              <div className="flex items-center text-gray-600 flex-wrap">
                <Clock size={20} className="mr-2" />
                <span className="break-words">
                  Valable: {new Date(deal.end_date).toLocaleDateString()}
                </span>
              </div>
            ) : null}
            {deal.opinion ? (
              <div className="p-2 shadow rounded-sm">
                <p className="flex mb-3 gap-2 items-center">
                  <HeartHandshake size={18} />
                  <strong className="uppercase">Notre Petit Mot</strong>
                </p>
                <p className="text-gray-600 break-words">{deal.opinion}</p>
              </div>
            ) : null}
          </div>

          <a href={deal.deal_url} target="_blank" className="block w-full">
            <button className="w-full bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white py-3 rounded-full font-semibold transition-colors">
              Profiter de l'offre
            </button>
          </a>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 break-words">
                {deal.description ?? "-"}
              </p>
            </div>

            {(deal.conditions?.length && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Conditions</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {deal.conditions?.map((condition, index) => (
                    <li key={index} className="break-words">
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            )) ||
              null}
          </div>
        </div>
      </div>
    </div>
  );

  function refresh() {
    if (!dealId) return setDeal(void 0);
    fetch(`/api/deals/${dealId}?page=0&pageSize=1`, { method: "GET" })
      .then((res) => res.json() as Promise<ApiResponse<[Deal]>>)
      .then(({ content: [deal] }) => setDeal(deal));
  }
}
