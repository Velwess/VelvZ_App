import {Heart} from 'lucide-react';
import {useContext} from "react";
import {FavouriteDealIdsContext} from "../domain/context.ts";

interface FavoriteButtonProps {
  id: string;
  className?: string;
}

export function FavoriteButton({id, className = ''}: FavoriteButtonProps) {
  const {favouriteDealIds, $set: setFavouriteDealIds} = useContext(FavouriteDealIdsContext);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFavouriteDealIds?.(favouriteDealIds?.includes(id)
          ? favouriteDealIds?.filter(_ => id !== _)
          : [...favouriteDealIds ?? [], id]);
      }}
      className={`p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300 ${className}`}
      aria-label={favouriteDealIds?.includes(id) ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        size={24}
        className={`${favouriteDealIds?.includes(id) ? 'fill-[#E6A4B4]' : ''} text-[#E6A4B4]`}
      />
    </button>
  );
}
