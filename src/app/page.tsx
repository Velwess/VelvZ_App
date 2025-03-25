"use client";

import {PagingComponent} from "@velz/common/components/PagingComponent.tsx";
import {DealComponent} from "@velz/common/components/DealComponent.tsx";
import {ApiResponse, Deal} from "@velz/common/lib/database.types.ts";
import {useEffect, useState} from "react";
import Link from "next/link";
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
  Star,
  Users
} from "lucide-react";

export default function HomePage() {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (!pageSize) return;
    fetch(`/api/deals/flash?page=${page}&pageSize=${pageSize}`)
      .then(_ => _.json() as Promise<ApiResponse<Deal[]>>)
      .then(({content, paging: {count = 0} = {}}) => {
        setDeals(content);
        setCount(count);
      });
  }, [page, pageSize]);

  return <>
    {/* Hero Section with Background Image */}
    <section className="relative overflow-hidden rounded-3xl mb-12">
      {/* Background Image */}
      <div style={{backgroundPosition: "30% center", backgroundSize: "120%"}}
           className="bg-cover bg-center absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1683145839395-820a7db1f05b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"/>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4C2C2]/90 to-[#C8A2C8]/90"/>

      {/* Content */}
      <div className="relative p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚧 Velz la plateforme qui facilite l'accès à une vie plus saine 🌿 est en cours de développement ! 🚀
          </h1>

          <h5 className="text-lg text-white/90 mb-4 ">
            Les offres affichées sur la plateforme sont présentées à titre
            d’exemple. Merci pour votre patience et votre soutien ! 🙌
          </h5>

          <p className="text-lg text-white/90 mb-8">
            Vous pouvez vous préinscrire dès à présent 💞
          </p>

          <p className="text-lg text-white/90 mb-8">Soutenir le projet 🤍</p>

          <Link href="/inscription"
                className="bg-white hover:bg-white/90 text-[#DA70D6] px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl inline-flex items-center group">
            Je me préinscris
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
        {deals.map((deal) => (
          <DealComponent deal={deal} key={deal.id}/>
        ))}
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
            backgroundPosition: "center",
            backgroundSize: "120%",
          }}/>

        {/* Gradient Overlay - Further reduced transparency */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-white/40"/>

        {/* Content */}
        <div className="relative px-8 py-16 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Link href="/inscription">
                  <span
                    className="inline-block bg-[#F4C2C2]/20 text-[#E6A4B4] px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Rejoignez l'aventure
                  </span>
              </Link>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Pourquoi nous rejoindre ?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Avec VelZ, une vie saine au meilleur prix 😊
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition-transform">
                  <Percent size={32} className="text-white"/>
                </div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                  Réductions Exclusives
                </h4>
                <p className="text-gray-600">
                  Jusqu'à -50% sur vos essentiels et activités préférées
                </p>
              </div>

              <div
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                  <Gift size={32} className="text-white"/>
                </div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                  Offres Personnalisées
                </h4>
                <p className="text-gray-600">
                  Des recommandations adaptées à vos centres d'intérêt
                </p>
              </div>

              <div
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 group-hover:rotate-6 transition-transform">
                  <Clock3 size={32} className="text-white"/>
                </div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                  Accès Prioritaire
                </h4>
                <p className="text-gray-600">
                  Soyez les premiers à profiter des nouvelles offres
                </p>
              </div>

              <div
                className="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl">
                <div
                  className="w-16 h-16 bg-gradient-to-br from-[#F4C2C2] to-[#E6A4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:-rotate-6 transition-transform">
                  <Sparkles size={32} className="text-white"/>
                </div>
                <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                  Expériences Uniques
                </h4>
                <p className="text-gray-600">
                  Découvrez des expériences exclusives chaque semaine
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/inscription"
                    className="inline-flex items-center bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                Découvrir nos bons plans
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
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Notre Engagement
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chez VelZ, nous nous engageons à créer un impact positif pour nos
          utilisateurs et notre communauté
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
          <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
            <HandHeart size={24} className="text-white"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Accessibilité pour tous
            </h4>
            <p className="text-gray-600">
              Nous croyons que chacun mérite d'accéder à des expériences
              enrichissantes. Nous voulons améliorer la qualité de vie de nos utilisateurs.
            </p>
          </div>
        </div>
        <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
          <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
            <Shield size={24} className="text-white"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Qualité garantie
            </h4>
            <p className="text-gray-600">
              Nous sélectionnons rigoureusement nos partenaires pour vous
              garantir des offres de qualité. Chaque expérience est évaluée et
              validée par notre équipe.
            </p>
          </div>
        </div>
        <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
          <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
            <Leaf size={24} className="text-white"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Engagement durable
            </h4>
            <p className="text-gray-600">
              Nous privilégions les partenaires engagés dans une démarche
              responsable et encourageons les pratiques respectueuses de
              l'environnement.
            </p>
          </div>
        </div>
        <div className="bg-[#F4C2C2]/10 rounded-2xl p-8 flex items-start space-x-6">
          <div className="w-12 h-12 bg-[#E6A4B4] rounded-full flex items-center justify-center flex-shrink-0">
            <Globe size={24} className="text-white"/>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Impact local
            </h4>
            <p className="text-gray-600">
              Nous soutenons les commerces et activités locales pour dynamiser
              les territoires et créer des opportunités au plus près de chez
              vous.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Review section */}
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Ce que disent nos utilisateurs
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            id: 0,
            name: "Sophie L.",
            date: "Il y a 2 jours",
            rating: 5,
            text: "J'adore VelZ! Les offres sont vraiment intéressantes et j'ai pu découvrir plein de nouvelles marques.",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
          },
          {
            id: 1,
            name: "Thomas M.",
            date: "Il y a 1 semaine",
            rating: 3,
            text: "Une super plateforme qui m'a permis de faire de belles économies sur mes activités préférées.",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
          },
          {
            id: 2,
            name: "Emma R.",
            date: "Il y a 2 semaines",
            rating: 4,
            text: "Les offres sont variées et de qualité. Je recommande vivement !",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
          },
        ].map((review) => <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <img alt={review.name}
                 src={review.avatar}
                 className="w-12 h-12 rounded-full object-cover mr-4"/>
            <div>
              <h4 className="font-semibold text-gray-800">{review.name}</h4>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i}
                        size={16}
                        className="text-[#FFD700] fill-[#FFD700]"/>
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-2">{review.text}</p>
          <span className="text-sm text-gray-400">{review.date}</span>
        </div>)}
      </div>
    </section>

    {/* Partner Section */}
    <section className="mb-16 bg-white rounded-3xl p-12">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Devenez partenaire
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Rejoignez notre réseau de partenaires et touchez une audience jeune
          et dynamique. Développez votre activité tout en offrant des
          avantages exclusifs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center">
          <Building2 size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
          <h4 className="font-semibold text-gray-800 mb-2">
            Visibilité accrue
          </h4>
          <p className="text-gray-600">
            Touchez une nouvelle clientèle et augmentez votre visibilité
          </p>
        </div>
        <div className="text-center">
          <Users size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
          <h4 className="font-semibold text-gray-800 mb-2">
            Communauté engagée
          </h4>
          <p className="text-gray-600">
            Accédez à une communauté de jeunes actifs et dynamiques
          </p>
        </div>
        <div className="text-center">
          <ShieldCheck size={48} className="text-[#E6A4B4] mx-auto mb-4"/>
          <h4 className="font-semibold text-gray-800 mb-2">
            Gestion simplifiée
          </h4>
          <p className="text-gray-600">
            Gérez facilement vos offres via notre plateforme dédiée
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link href="/partenaire"
              className="bg-[#E6A4B4] hover:bg-[#DA70D6] text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center">
          Devenir partenaire
          <ArrowRight size={20} className="ml-2"/>
        </Link>
      </div>
    </section>

    {/* Sign Up Section */}
    <section className="bg-gradient-to-r from-[#F4C2C2] to-[#C8A2C8] rounded-3xl p-12 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">
          Rejoignez VelZ aujourd'hui
        </h3>
        <p className="text-lg mb-8">
          Inscrivez-vous gratuitement et accédez à des offres exclusives sur
          vos marques et activités préférées.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <input type="email"
                 placeholder="Votre adresse email"
                 className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DA70D6] md:w-80"/>
          <Link href="/inscription"
                className="bg-[#DA70D6] hover:bg-[#DA70D6]/90 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Je m'inscris
          </Link>
        </div>
        <p className="text-sm mt-4 text-white/80">
          En vous inscrivant, vous acceptez nos conditions d'utilisation et
          notre politique de confidentialité
        </p>
      </div>
    </section>
  </>;
}
