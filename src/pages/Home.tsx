import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Clock,
  Clock3,
  Gift,
  Globe,
  HandHeart,
  Leaf,
  Percent,
  Shield,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import {Category, Deal} from "../lib/database.types.ts";
import {supabase} from "../lib/supabase.ts";
import {DealComponent} from "../components/DealComponent.tsx";
import {PagingComponent} from "../components/PagingComponent.tsx";

function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (!pageSize) return;
    supabase.from('deals')
      .select('*, reviews(id, rating)', {count: 'exact'})
      .eq('flash', true).gte('end_date', new Date().toISOString())
      .range(pageSize * page, pageSize * (page + 1) - 1)
      .then(({data, count}) => {
        setDeals(data as any as Deal[])
        setCount(count!);
      }, console.error);
  }, [page, pageSize]);
  useEffect(() => {
    if (0 === deals.length) return
    const categoryIds = deals.map(({category_id}) => category_id).filter((_, i, __) => i === __.indexOf(_));
    supabase.from('categories').select().in('id', categoryIds).maybeSingle()
      .then(({data}) => data as any as Category[])
      .then(categories => {
        for (const deal of deals) deal.category = categories?.find(({id}) => id === deal.id);
      }, console.error);
  }, [deals.length]);

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden rounded-3xl mb-12">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1683145839395-820a7db1f05b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
          bg-cover bg-center"
          style={{backgroundPosition: '30% center', backgroundSize: '120%'}}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4C2C2]/90 to-[#C8A2C8]/90"/>

        {/* Content */}
        <div className="relative p-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">Des offres exclusives pour les jeunes</h2>
            <p className="text-lg text-white/90 mb-8">Découvrez les meilleures réductions sur vos marques préférées</p>
            <Link
              to="/offres"
              className="bg-white hover:bg-white/90 text-[#DA70D6] px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl inline-flex items-center group"
            >
              Découvrir les offres
              <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2 text-[#FFD700]"/> Offres Flash
          </h3>
          {/*<Link*/}
          {/*  to="/offres"*/}
          {/*  className="text-[#E6A4B4] hover:text-[#DA70D6] font-semibold flex items-center"*/}
          {/*>*/}
          {/*  Voir tout <ChevronDown className="ml-1" size={20}/>*/}
          {/*</Link>*/}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map(deal => <DealComponent deal={deal} key={deal.id}/>)}
        </div>
        <PagingComponent {...{count, setPage, setPageSize}} />
      </section>

      {/* Why Join Us Section */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1683145841064-bf22e6fce9eb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
            bg-cover bg-center"
            style={{
              backgroundPosition: 'center', backgroundSize: '120%'
            }}
          />

          {/* Gradient Overlay - Further reduced transparency */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-white/40"/>

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span
                  className="inline-block bg-[#F4C2C2]/20 text-[#E6A4B4] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Rejoignez l'aventure
                </span>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Pourquoi nous rejoindre ?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Velvès vous offre une expérience unique avec des avantages exclusifs pensés pour vous
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition-transform">
                    <Percent size={32} className="text-white"/>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Réductions Exclusives</h4>
                  <p className="text-gray-600">Jusqu'à -50% sur vos marques et activités préférées</p>
                </div>

                <div
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                    <Gift size={32} className="text-white"/>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Offres Personnalisées</h4>
                  <p className="text-gray-600">Des recommandations adaptées à vos centres d'intérêt</p>
                </div>

                <div
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition-transform">
                    <Clock3 size={32} className="text-white"/>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Accès Prioritaire</h4>
                  <p className="text-gray-600">Soyez les premiers à profiter des nouvelles offres</p>
                </div>

                <div
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                  <div
                    className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                    <Sparkles size={32} className="text-white"/>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Expériences Uniques</h4>
                  <p className="text-gray-600">Découvrez des expériences exclusives chaque semaine</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/inscription"
                  className="inline-flex items-center bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Découvrir tous les avantages
                  <ArrowRight className="ml-2" size={20}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="mb-16 bg-white rounded-3xl p-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Notre Engagement</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chez Velvès, nous nous engageons à créer un impact positif pour nos utilisateurs et notre communauté
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
            <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
              <HandHeart size={24} className="text-white"/>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Accessibilité pour tous</h4>
              <p className="text-gray-600">
                Nous croyons que chaque jeune mérite d'accéder à des expériences enrichissantes.
                Notre mission est de rendre les activités culturelles, sportives et de bien-être accessibles au plus
                grand nombre.
              </p>
            </div>
          </div>
          <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
            <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
              <Shield size={24} className="text-white"/>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Qualité garantie</h4>
              <p className="text-gray-600">
                Nous sélectionnons rigoureusement nos partenaires pour vous garantir des offres de qualité.
                Chaque expérience est évaluée et validée par notre équipe.
              </p>
            </div>
          </div>
          <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
            <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf size={24} className="text-white"/>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Engagement durable</h4>
              <p className="text-gray-600">
                Nous privilégions les partenaires engagés dans une démarche responsable et encourageons
                les pratiques respectueuses de l'environnement.
              </p>
            </div>
          </div>
          <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
            <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
              <Globe size={24} className="text-white"/>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Impact local</h4>
              <p className="text-gray-600">
                Nous soutenons les commerces et activités locales pour dynamiser les territoires et
                créer des opportunités au plus près de chez vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/*<section className="mb-16">*/}
      {/*  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Ce que disent nos utilisateurs</h3>*/}
      {/*  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
      {/*    {reviews.map((review) => (*/}
      {/*      <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">*/}
      {/*        <div className="flex items-center mb-4">*/}
      {/*          <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover mr-4"/>*/}
      {/*          <div>*/}
      {/*            <h4 className="font-semibold text-gray-800">{review.name}</h4>*/}
      {/*            <div className="flex items-center">*/}
      {/*              {[...Array(review.rating)].map((_, i) => (*/}
      {/*                <Star key={i} size={16} className="text-[#FFD700] fill-[#FFD700]"/>*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <p className="text-gray-600 mb-2">{review.text}</p>*/}
      {/*        <span className="text-sm text-gray-400">{review.date}</span>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Partner Section */}
      <section className="mb-16 bg-white rounded-3xl p-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Devenez partenaire</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre réseau de partenaires et touchez une audience jeune et dynamique.
            Développez votre activité tout en offrant des avantages exclusifs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <Building2 size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
            <h4 className="font-semibold text-gray-800 mb-2">Visibilité accrue</h4>
            <p className="text-gray-600">Touchez une nouvelle clientèle et augmentez votre visibilité</p>
          </div>
          <div className="text-center">
            <Users size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
            <h4 className="font-semibold text-gray-800 mb-2">Communauté engagée</h4>
            <p className="text-gray-600">Accédez à une communauté de jeunes actifs et dynamiques</p>
          </div>
          <div className="text-center">
            <ShieldCheck size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
            <h4 className="font-semibold text-gray-800 mb-2">Gestion simplifiée</h4>
            <p className="text-gray-600">Gérez facilement vos offres via notre plateforme dédiée</p>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/partenaire')}
            className="bg-[#E6A4B4] hover:bg-[#DA70D6] text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center"
          >
            Devenir partenaire
            <ArrowRight size={20} className="ml-2"/>
          </button>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="bg-gradient-to-r from-[#F4C2C2] to-[#C8A2C8] rounded-3xl p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Rejoignez Velvès aujourd'hui</h3>
          <p className="text-lg mb-8">
            Inscrivez-vous gratuitement et accédez à des offres exclusives sur vos marques et activités préférées.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DA70D6] md:w-80"
            />
            <button
              onClick={() => navigate('/inscription')}
              className="bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Je m'inscris
            </button>
          </div>
          <p className="text-sm mt-4 text-white/80">
            En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
