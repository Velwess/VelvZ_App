"use client";

import {FavouriteDealIdsContext, PageSizeContext, SessionContext, UserContext} from "@velz/common/domain/context.ts";
import {Facebook, Heart, Instagram, Mail, Phone, Power, Sparkles, Twitter, UserRoundPlus} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ApiResponse, Category} from "@velz/common/lib/database.types.ts";
import {Navbar} from "@velz/common/components/nav-bar.tsx";
import {ReactNode, useEffect, useState} from "react";
import {Session, User} from "@supabase/supabase-js";
import favicon from "@velz/assets/logo.png";
// import favicon from '@velz/favicon.png';
import Link from "next/link";
import "@velz/index.css";
import {z} from "zod";

export interface RootClientLayoutProps {
  favouriteDealIds?: string[];
  categories?: Category[];
  children: ReactNode;
}

export default function RootClientLayout(props: RootClientLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState(20);
  const [newsLetterEmail, setNewsLetterEmail] = useState('');
  const [invalidNewsLetterEmail, setInvalidNewsLetterEmail] = useState(true);
  const [categories, setCategories] = useState<Category[]>(props.categories ?? []);
  const [user, setUser] = useState<User | null | undefined>(
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('user') ?? 'null'
      : 'null') as User);
  const [session, setSession] = useState<Session | null | undefined>(
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('session') ?? 'null'
      : 'null') as Session);
  const [favouriteDealIds, setFavouriteDealIds] = useState<string[] | null | undefined>(
    props.favouriteDealIds ??
    JSON.parse('object' === typeof localStorage
      ? localStorage.getItem('favouriteDealIds') ?? 'null' : 'null')?.sort() as string[]);

  useEffect(() => void fetch('/api/categories')
    .then(_ => _.json() as Promise<ApiResponse<Category[]>>)
    .then(({content}) => setCategories(content)), []);
  useEffect(() =>
    localStorage?.setItem('user', JSON.stringify(user ?? null)), [user]);
  useEffect(() =>
    localStorage?.setItem('session', JSON.stringify(session ?? null)), [session]);
  useEffect(() => {
    const content = JSON.stringify(favouriteDealIds?.sort() ?? null);
    document.cookie = `favouriteDealIds=${encodeURIComponent(content)}; path=/; SameSite=Strict`;
    localStorage?.setItem('favouriteDealIds', content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favouriteDealIds?.sort().join()]);
  useEffect(() =>
    setInvalidNewsLetterEmail(!!z.string().email().safeParse(newsLetterEmail).error), [newsLetterEmail]);

  return <html lang="fr">
  <head>
    <link rel="icon" type="image/png" href={favicon.src}/>
    <title>Velz - Offres exclusives pour les jeunes</title>
  </head>
  <body className="flex h-dvh flex-col bg-yellowish text-gray-600">
  <UserContext.Provider value={{user, $set: setUser}}>
    <PageSizeContext.Provider value={{pageSize, $set: setPageSize}}>
      <SessionContext.Provider value={{session, $set: setSession}}>
        <FavouriteDealIdsContext.Provider value={{favouriteDealIds, $set: setFavouriteDealIds}}>
          {/* Header */}
          <header className="z-10 px-8 top-0 fixed left-0 w-full bg-white/70 backdrop-blur">
            <Navbar className="mx-auto sm:max-w-2xl lg:max-w-3xl xl:max-w-7xl"
                    {...{user, session, setUser, setSession, categories, favouriteDealIds}}/>
          </header>

          {/* Main Content */}
          <main className="container mx-auto grow px-4 pt-24 pb-16">
            {props.children}
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
                           value={newsLetterEmail}
                           placeholder="Votre email"
                           onChange={e => setNewsLetterEmail(e.target.value)}
                           className="flex-1 px-4 py-2 rounded-l-full border border-gray-200 focus:outline-none focus:border-[#E6A4B4]"/>
                    <button
                      disabled={invalidNewsLetterEmail}
                      onClick={e => {
                        setInvalidNewsLetterEmail(true);
                        fetch(`/api/newsletter/subscribers`, {
                          method: 'PATCH',
                          body: JSON.stringify({email: newsLetterEmail}),
                        }).then(res => res.json())
                          .then(({error}) => {
                            if (error) return;
                            setNewsLetterEmail('');
                            const target = e.target as HTMLButtonElement;
                            target.innerText = 'Voila qui est fait!';
                            setTimeout(() => target.innerText = 'OK', 1_500)
                          })
                      }}
                      className="px-6 py-2 bg-[#E6A4B4] text-white rounded-r-full hover:bg-[#DA70D6]
                                 transition-colors disabled:bg-gray-600 whitespace-nowrap">
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
