import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Offers from './pages/Offers';
import OfferDetail from './pages/OfferDetail';
import Vision from './pages/Vision';
import Favorites from './pages/Favorites';
import Register from './pages/Register';
import Partner from './pages/Partner';
import Login from './pages/Login';
import {FavouriteDealIdsContext, SessionContext, UserContext} from "./domain/context.ts";
import {useEffect, useState} from "react";
import {Session, User} from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null | undefined>(
    JSON.parse(localStorage.getItem('user') ?? 'null') as User);
  const [session, setSession] = useState<Session | null | undefined>(
    JSON.parse(localStorage.getItem('session') ?? 'null') as Session);
  const [favouriteDealIds, setFavouriteDealIds] = useState<string[] | null | undefined>(
    JSON.parse(localStorage.getItem('favouriteDealIds') ?? 'null') as string[]);

  useEffect(() => localStorage.setItem('user', JSON.stringify(user ?? null)), [user]);
  useEffect(() => localStorage.setItem('session', JSON.stringify(session ?? null)), [session]);

  return <UserContext.Provider value={{user, $set: setUser}}>
    <SessionContext.Provider value={{session, $set: setSession}}>
      <FavouriteDealIdsContext.Provider value={{favouriteDealIds, $set: setFavouriteDealIds}}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="offres" element={<Offers/>}/>
              <Route path="offre/:id" element={<OfferDetail/>}/>
              <Route path="vision" element={<Vision/>}/>
              <Route path="favoris" element={<Favorites/>}/>
              <Route path="inscription" element={<Register/>}/>
              <Route path="connexion" element={<Login/>}/>
              <Route path="partenaire" element={<Partner/>}/>
            </Route>
          </Routes>
        </Router>
      </FavouriteDealIdsContext.Provider>
    </SessionContext.Provider>
  </UserContext.Provider>;
}

export default App;
