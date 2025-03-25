"use client";

import {FavouriteDealIdsContext, PageSizeContext, SessionContext, UserContext} from "@velz/common/domain/context.ts";
import {Facebook, Heart, Instagram, Mail, Phone, Power, Search, Sparkles, Twitter} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ApiResponse, Category} from "@velz/common/lib/database.types.ts";
import {ReactNode, useEffect, useState} from "react";
import {Session, User} from "@supabase/supabase-js";
import Link from "next/link";
import "@velz/index.css";

export default function RootLayout({children}: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(20);
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<User | null | undefined>(
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('user') ?? 'null'
      : 'null') as User);
  const [session, setSession] = useState<Session | null | undefined>(
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('session') ?? 'null'
      : 'null') as Session);
  const [favouriteDealIds, setFavouriteDealIds] = useState<string[] | null | undefined>(
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('favouriteDealIds') ?? 'null'
      : 'null')?.sort() as string[]);

  useEffect(() => void fetch('/api/categories')
    .then(_ => _.json() as Promise<ApiResponse<Category[]>>)
    .then(({content}) => setCategories(content)), []);
  useEffect(() =>
    localStorage?.setItem('user', JSON.stringify(user ?? null)), [user]);
  useEffect(() =>
    localStorage?.setItem('session', JSON.stringify(session ?? null)), [session]);
  useEffect(() =>
    localStorage?.setItem('favouriteDealIds', JSON.stringify(favouriteDealIds?.sort() ?? null)), [favouriteDealIds]);

  return <html lang="fr">
  <head>
    <title>Velz - Offres exclusives pour les jeunes</title>
  </head>
  <body className="min-h-screen bg-[#FAF3E0]">
  <UserContext.Provider value={{user, $set: setUser}}>
    <PageSizeContext.Provider value={{pageSize, $set: setPageSize}}>
      <SessionContext.Provider value={{session, $set: setSession}}>
        <FavouriteDealIdsContext.Provider value={{favouriteDealIds, $set: setFavouriteDealIds}}>
          {/* Header */}
          <header className="bg-white shadow-sm fixed w-full top-0 z-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="logo-container">
                    <Sparkles size={16} className="text-[#E6A4B4] absolute -left-1 -top-1"/>
                    <span className="logo-text text-2xl relative">Velz</span>
                  </Link>
                  <nav className="hidden md:flex space-x-2">
                    {categories.map(categorie => (
                      <Link key={categorie.name}
                            href={`/offres?categorie=${categorie.slug}`}
                            className={`flex items-center space-x-1 p-2 rounded-full transition-all duration-300 transform hover:scale-105
                      ${'/offres' === pathname && categorie.slug === searchParams.get('categorie')
                              ? 'bg-[#F4C2C2] text-white shadow-md'
                              : 'text-gray-600 hover:bg-[#F4C2C2]/10'}`}>
                        <span>{categorie.icon}</span>
                        <span className="font-medium">{categorie.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    <input type="text"
                           placeholder="Rechercher une offre..."
                           className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E6A4B4] w-64 font-light"/>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Link href="/favoris"
                            className="relative p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300">
                        <Heart size={24} className="text-[#E6A4B4]"/>
                        <span
                          className="absolute -top-1 -right-1 bg-[#DA70D6] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {favouriteDealIds?.length ?? 0}
                          </span>
                      </Link>
                      <span className="text-gray-300">|</span>
                      {user
                        ? <button type="button"
                                  onClick={() => {
                                    // TODO: Supabase sign-out
                                    router.push("/");
                                    setSession(null);
                                    setUser(null);
                                  }}
                                  className="relative p-2 rounded-full hover:bg-[#F4C2C2]/10 transition-colors duration-300">
                          <Power size={24} className="text-[#E6A4B4]"/>
                        </button>
                        : <>
                          <Link href="/inscription"
                                className="px-4 py-2 text-[#E6A4B4] hover:text-[#DA70D6] font-medium transition-colors">
                            Je m'inscris
                          </Link>
                          <span className="text-gray-300">|</span>
                          <Link href="/connexion"
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
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    À propos
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <Link href="/vision" className="hover:text-[#E6A4B4] transition-colors">
                        Notre Vision
                      </Link>
                    </li>
                    <li>
                      <Link href="/engagement" className="hover:text-[#E6A4B4] transition-colors">
                        Notre engagement
                      </Link>
                    </li>
                    <li>
                      <Link href="/mission" className="hover:text-[#E6A4B4] transition-colors">
                        Notre mission
                      </Link>
                    </li>
                    <li>
                      <Link href="/histoire" className="hover:text-[#E6A4B4] transition-colors">
                        Notre Histoire
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Aide</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <Link href="/cgu" className="hover:text-[#E6A4B4] transition-colors">
                        Conditions générales d'utilisation{" "}
                      </Link>
                    </li>

                    <li>Cookies</li>
                    <li>Mentions légales</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Contact
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <Phone size={18} className="mr-2 text-[#E6A4B4]"/>
                      <a href="tel:+33752081934" className="hover:text-[#E6A4B4] transition-colors">
                        +33 (0)7 52 08 19 34
                      </a>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <Mail size={18} className="mr-2 text-[#E6A4B4]"/>
                      <a href="mailto:contact@velzapp.com" className="hover:text-[#E6A4B4] transition-colors">
                        contact@velzapp.com
                      </a>
                    </li>
                  </ul>
                  <div className="mt-4 flex space-x-4">
                    <a target="_blank"
                       href="https://instagram.com"
                       rel="noopener noreferrer"
                       className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                      <Instagram size={24}/>
                    </a>
                    <a target="_blank"
                       href="https://facebook.com"
                       rel="noopener noreferrer"
                       className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                      <Facebook size={24}/>
                    </a>
                    <a target="_blank"
                       href="https://twitter.com"
                       rel="noopener noreferrer"
                       className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
                      <Twitter size={24}/>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Newsletter
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Restez informé des meilleures offres
                  </p>
                  <div className="flex">
                    <input type="email"
                           placeholder="Votre email"
                           className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:border-[#E6A4B4]"/>
                    <button
                      className="px-6 py-2 bg-[#E6A4B4] text-white rounded-r-full hover:bg-[#DA70D6] transition-colors">
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </FavouriteDealIdsContext.Provider>
      </SessionContext.Provider>
    </PageSizeContext.Provider>
  </UserContext.Provider>
  <script defer data-domain="velzapp.com" src="https://analytics.fabriceyopa.me/js/script.js"/>
  </body>
  </html>;
}
