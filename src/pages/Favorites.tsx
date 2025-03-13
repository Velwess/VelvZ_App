import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareButton } from '../components/ShareButton';

// Using the same deals data structure from other pages
const allDeals = [
  {
    id: 1,
    title: "Séance Spa Luxe",
    category: "Bien-être",
    discount: "-50%",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    endDate: "2024-04-01",
    rating: 4.8,
    price: "80€",
    originalPrice: "160€"
  },
  {
    id: 2,
    title: "Box Nutrition Bio",
    category: "Nutrition",
    discount: "-30%",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800",
    endDate: "2024-03-25",
    rating: 4.5,
    price: "35€",
    originalPrice: "50€"
  }
  // ... other deals
];

function Favorites() {
  const { favorites } = useFavorites();
  const favoriteDeals = allDeals.filter(deal => favorites.includes(deal.id));

  if (favoriteDeals.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mes Favoris</h2>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore de favoris.</p>
          <Link
            to="/offres"
            className="inline-block bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Découvrir les offres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Mes Favoris</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteDeals.map((deal) => (
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
                <span className="text-sm text-[#E6A4B4]">{deal.category}</span>
                <div className="flex items-center">
                  <Star className="text-[#FFD700] mr-1" size={16} />
                  <span className="text-sm text-gray-600">{deal.rating}</span>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{deal.title}</h4>
              <div className="flex items-center justify-between mb-3">
                <div className="space-x-2">
                  <span className="text-lg font-bold text-[#DA70D6]">{deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShareButton title={deal.title} />
                  <FavoriteButton id={deal.id} />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Expire le {new Date(deal.endDate).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Favorites;