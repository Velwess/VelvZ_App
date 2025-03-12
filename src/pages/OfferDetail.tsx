import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';

const deals = [
  {
    id: 1,
    title: "Séance Spa Luxe",
    category: "Bien-être",
    discount: "-50%",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    endDate: "2024-04-01",
    rating: 4.8,
    price: "80€",
    originalPrice: "160€",
    description: "Profitez d'une séance de spa luxueuse comprenant un massage relaxant de 60 minutes, accès au sauna et au hammam, ainsi qu'une coupe de champagne.",
    conditions: [
      "Valable du lundi au vendredi",
      "Réservation obligatoire",
      "Non cumulable avec d'autres offres",
      "1 bon par personne"
    ],
    location: "Paris 8ème",
    validity: "3 mois",
    reviews: 128
  }
];

function OfferDetail() {
  const { id } = useParams();
  const deal = deals.find(d => d.id === Number(id));

  if (!deal) {
    return <div className="text-center py-12">Offre non trouvée</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img src={deal.image} alt={deal.title} className="w-full h-[400px] object-cover" />
          <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
            {deal.discount}
          </span>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#E6A4B4] font-medium">{deal.category}</span>
            <div className="flex items-center space-x-4">
              <FavoriteButton id={deal.id} />
              <ShareButton title={deal.title} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{deal.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <Star className="text-[#FFD700] mr-1" size={20} />
              <span className="font-medium">{deal.rating}</span>
              <span className="text-gray-500 ml-1">({deal.reviews} avis)</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin size={20} className="mr-1" />
              <span>{deal.location}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-3xl font-bold text-[#DA70D6]">{deal.price}</span>
              <span className="text-xl text-gray-400 line-through">{deal.originalPrice}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={20} className="mr-2" />
              <span>Valable {deal.validity}</span>
            </div>
          </div>
          
          <button className="w-full bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white py-3 rounded-full font-semibold mb-6 transition-colors">
            Profiter de l'offre
          </button>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{deal.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Conditions</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {deal.conditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferDetail;