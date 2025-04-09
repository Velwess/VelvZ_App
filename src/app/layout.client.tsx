"use client";

import {FavouriteDealIdsContext, PageSizeContext, SessionContext, UserContext} from "@velz/common/domain/context.ts";
import {ApiResponse, Category} from "@velz/common/lib/database.types.ts";
import {Navbar} from "@velz/common/components/nav-bar.tsx";
import {Footer} from "@velz/common/components/footer.tsx";
import {ReactNode, useEffect, useState} from "react";
import {Session, User} from "@supabase/supabase-js";
import favicon from "@velz/assets/logo.png";
import "@velz/index.css";

export interface RootClientLayoutProps {
  favouriteDealIds?: string[];
  categories?: Category[];
  children: ReactNode;
}

export default function RootClientLayout(props: RootClientLayoutProps) {
  const [pageSize, setPageSize] = useState(20);
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
          <header className="z-10 px-8 top-0 fixed left-0 w-full bg-white/70 backdrop-blur">
            <Navbar className="mx-auto sm:max-w-2xl lg:max-w-3xl xl:max-w-7xl"
                    {...{user, session, setUser, setSession, categories, favouriteDealIds}}/>
          </header>

          <main className="grow py-32 mx-auto sm:max-w-2xl lg:max-w-3xl xl:max-w-7xl">
            {props.children}
          </main>

          <footer className="px-8 w-full bg-white/70 backdrop-blur">
            <Footer className="mx-auto sm:max-w-2xl lg:max-w-3xl xl:max-w-7xl"/>
          </footer>

        </FavouriteDealIdsContext.Provider>
      </SessionContext.Provider>
    </PageSizeContext.Provider>
  </UserContext.Provider>
  <script defer data-domain="velzapp.com" src="https://analytics.fabriceyopa.me/js/script.js"/>
  </body>
  </html>;
}
