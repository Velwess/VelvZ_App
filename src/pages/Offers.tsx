import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../components/FavoriteButton';

const allDeals = [
  {
    id: 1,
    title: "Séance Spa Luxe",
    category: "bien-etre",
    discount: "-50%",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    endDate: "2024-04-01",
    rating: 4.8
  },
  {
    id: 2,
    title: "Box Nutrition Bio",
    category: "nutrition",
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800",
    endDate: "2024-03-25",
    rating: 4.5
  },
  {
    id: 3,
    title: "Cours de Yoga",
    category: "sport",
    discount: "-40%",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    endDate: "2024-03-30",
    rating: 4.9
  },
  {
    id: 4,
    title: "Soin du Visage Premium",
    category: "beaute",
    discount: "-35%",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    endDate: "2024-04-15",
    rating: 4.7
  },
  {
    id: 5,
    title: "Concert Jazz Club",
    category: "culture",
    discount: "-25%",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
    endDate: "2024-03-28",
    rating: 4.6
  }
];

function Offers() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredDeals = categoryFilter
    ? allDeals.filter(deal => deal.category === categoryFilter)
    : allDeals;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Toutes les offres</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <Link
            to={`/offre/${deal.id}`}
            key={deal.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
              <span className="absolute top-4 right-4 bg-[#DA70D6] text-white px-3 py-1 rounded-full font-semibold">
                {deal.discount}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#E6A4B4] capitalize">{deal.category.replace('-', ' ')}</span>
                <div className="flex items-center">
                  <Star className="text-[#FFD700] mr-1" size={16} />
                  <span className="text-sm text-gray-600">{deal.rating}</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{deal.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Expire le {new Date(deal.endDate).toLocaleDateString()}
                </span>
                <FavoriteButton id={deal.id} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Offers;