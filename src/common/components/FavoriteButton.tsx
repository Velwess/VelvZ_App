import {FavouriteDealIdsContext, SessionContext, UserContext} from "@velz/common/domain/context.ts";
import {ApiResponse} from "@velz/common/lib/database.types.ts";
import {Heart} from 'lucide-react';
import {useContext} from "react";

interface FavoriteButtonProps {
  id: string;
  className?: string;
}

export function FavoriteButton({id, className = ''}: FavoriteButtonProps) {
  const {favouriteDealIds, $set: setFavouriteDealIds} = useContext(FavouriteDealIdsContext);
  const {session} = useContext(SessionContext);
  const {user} = useContext(UserContext);

  return <button
    className={`p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300 ${className}`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      favouriteDealIds?.includes(id)
        ? remove(id, favouriteDealIds!.filter(_ => id !== _))
        : add(id, [...favouriteDealIds ?? [], id]);
    }}
    aria-label={favouriteDealIds?.includes(id) ? "Retirer des favoris" : "Ajouter aux favoris"}>
    <Heart
      size={24}
      className={`${favouriteDealIds?.includes(id) ? 'fill-secondary' : ''} text-secondary`}
    />
  </button>;

  async function add(favouriteDealId: string, favouriteDealIds: string[]) {
    if (user?.id && session?.access_token) {
      ({content: favouriteDealIds} = await (await fetch('/api/favourites', {
        headers: {Authorization: `Bearer ${session.access_token}`},
        body: JSON.stringify([favouriteDealId]),
        credentials: 'same-origin',
        redirect: 'follow',
        method: 'PATCH',
      })).json() as ApiResponse<string[]>);
    }
    setFavouriteDealIds!(favouriteDealIds);
  }

  async function remove(favouriteDealId: string, favouriteDealIds: string[]) {
    if (user?.id && session?.access_token) {
      ({content: favouriteDealIds} = await (await fetch(`/api/favourites/${favouriteDealId}`, {
        headers: {Authorization: `Bearer ${session.access_token}`},
        body: JSON.stringify(favouriteDealIds),
        credentials: 'same-origin',
        redirect: 'follow',
        method: 'DELETE',
      })).json() as ApiResponse<string[]>);
    }
    setFavouriteDealIds!(favouriteDealIds);
  }
}
