import {Heart} from 'lucide-react';
import {useContext} from "react";
import {FavouriteDealIdsContext, UserContext} from "../domain/context.ts";
import {supabase} from "../lib/supabase.ts";

interface FavoriteButtonProps {
  id: string;
  className?: string;
}

export function FavoriteButton({id, className = ''}: FavoriteButtonProps) {
  const {user} = useContext(UserContext);
  const {favouriteDealIds, $set: setFavouriteDealIds} = useContext(FavouriteDealIdsContext);

  return (
    <button
      className={`p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        (async () => {
          try {
            if (favouriteDealIds?.includes(id)) {
              if (user?.id) await supabase.from('favorites').delete().match({deal_id: id, user_id: user.id});
              setFavouriteDealIds?.(favouriteDealIds?.filter(_ => _ !== id) ?? []);
            } else {
              if (user?.id)
                await supabase.from('favorites')
                  .upsert({deal_id: id, user_id: user.id}, {ignoreDuplicates: true, onConflict: 'deal_id, user_id'});
              setFavouriteDealIds?.([...favouriteDealIds ?? [], id]);
            }
          } catch (error) {
            console.error(error);
          }
        })();
      }}
      aria-label={favouriteDealIds?.includes(id) ? "Retirer des favoris" : "Ajouter aux favoris"}>
      <Heart
        size={24}
        className={`${favouriteDealIds?.includes(id) ? 'fill-[#E6A4B4]' : ''} text-[#E6A4B4]`}
      />
    </button>
  );
}
