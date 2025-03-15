import {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Facebook, Heart, Instagram, Mail, Phone, Power, Search, Sparkles, Twitter} from 'lucide-react';
import {Category} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";
import {FavouriteDealIdsContext, SessionContext, UserContext} from "../domain/context.ts";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const userContext = useContext(UserContext);
  const sessionContext = useContext(SessionContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const {favouriteDealIds} = useContext(FavouriteDealIdsContext);

  useEffect(() => {
    supabase.from('categories')
      .select()
      .order('name', {ascending:true})
      .then(({data}) => setCategories(data as any as Category[]))
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="logo-container">
                <Sparkles className="text-[#E6A4B4] absolute -left-1 -top-1" size={16}/>
                <span className="logo-text text-2xl relative">
                  Velvès
                </span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/offres?category=${cat.slug}`}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                      ${location.pathname.startsWith('/offres') && location.search.includes(cat.slug)
                      ? 'bg-[#F4C2C2] text-white shadow-md'
                      : 'text-gray-600 hover:bg-[#F4C2C2]/10'}`}
                  >
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                <input
                  type="text"
                  placeholder="Rechercher une offre..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E6A4B4] w-64 font-light"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Link to="/favoris"
                        className="relative p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300">
                    <Heart size={24} className="text-[#E6A4B4]"/>
                    <span
                      className="absolute -top-1 -right-1 bg-[#DA70D6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {favouriteDealIds?.length ?? 0}
                    </span>
                  </Link>
                  <span className="text-gray-300">|</span>
                  {userContext?.user
                    ? <button type="button"
                              onClick={() => supabase.auth.signOut().then(() => {
                                sessionContext.$set?.(null);
                                userContext.$set?.(null);
                                navigate('/');
                              })}
                              className="relative p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300">
                      <Power size={24} className="text-[#E6A4B4]"/>
                    </button>
                    : <>
                      <Link to="/inscription"
                            className="px-4 py-2 text-[#E6A4B4] hover:text-[#DA70D6] font-medium transition-colors">
                        Je m'inscris
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link to="/connexion"
                            className="px-4 py-2 bg-[#E6A4B4] text-white rounded-full hover:bg-[#DA70D6] transition-colors font-medium">
                        Je me connecte
                      </Link>
                    </>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Outlet/>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">À propos</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/vision" className="hover:text-[#E6A4B4] transition-colors">Notre Vision</Link></li>
                <li><Link to="/mission" className="hover:text-[#E6A4B4] transition-colors">Notre mission</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Aide</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Contact</li>
                <li>Conditions d'utilisation</li>
                <li>Politique de confidentialité</li>
                <li>Cookies</li>
                <li>Mentions légales</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Phone size={18} className="mr-2 text-[#E6A4B4]"/>
                  <a href="tel:+33123456789" className="hover:text-[#E6A4B4] transition-colors">
                    01 23 45 67 89
                  </a>
                </li>
                <li className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-2 text-[#E6A4B4]"/>
                  <a href="mailto:contact@velves.fr" className="hover:text-[#E6A4B4] transition-colors">
                    contact@velves.fr
                  </a>
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                  <Instagram size={24}/>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                  <Facebook size={24}/>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                  <Twitter size={24}/>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-4">Restez informé des meilleures offres</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:border-[#E6A4B4]"
                />
                <button
                  className="px-6 py-2 bg-[#E6A4B4] text-white rounded-r-full hover:bg-[#DA70D6] transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
