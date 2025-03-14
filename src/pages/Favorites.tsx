import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {FavouriteDealIdsContext, UserContext} from "../domain/context.ts";
import {supabase} from "../lib/supabase.ts";
import {DealComponent} from "../components/DealComponent.tsx";

function Favorites() {
  const {user} = useContext(UserContext);
  const [deals, setFavoriteDeals] = useState<any[]>([]);
  const {favouriteDealIds} = useContext(FavouriteDealIdsContext);

  useEffect(() => {
    console.log({favouriteDeals: deals.map(({id}) => id)})
  }, [deals]);
  useEffect(() => {
    console.log({favouriteDealIds: (favouriteDealIds ?? [] as any[]).map(({id}) => id)})
  }, [favouriteDealIds]);
  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from('favorites')
      .select('deals(*)')
      .eq('user_id', user.id)
      .in('deal_id', favouriteDealIds ?? [])
      .then(({data}) => setFavoriteDeals(data?.map(_ => _.deals) ?? []), console.error);
  }, [user, favouriteDealIds]);

  if (!favouriteDealIds?.length) return <div className="text-center py-16">
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
  </div>;

  return <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-800">Mes Favoris</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => <DealComponent deal={deal} key={deal.id}/>)}
    </div>
  </div>;
}

export default Favorites;
