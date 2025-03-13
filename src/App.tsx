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

function App() {
  return (
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
  );
}

export default App;
