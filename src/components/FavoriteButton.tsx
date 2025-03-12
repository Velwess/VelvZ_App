import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface FavoriteButtonProps {
  id: number;
  className?: string;
}

export function FavoriteButton({ id, className = '' }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className={`p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300 ${className}`}
      aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        size={24}
        className={`${isFav ? 'fill-[#E6A4B4]' : ''} text-[#E6A4B4]`}
      />
    </button>
  );
}