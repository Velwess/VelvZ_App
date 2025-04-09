import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Heart, LogIn, Menu, Power, UserRoundPlus} from "lucide-react";
import {Category} from "@velz/common/lib/database.types.ts";
import {Session, User} from "@supabase/supabase-js";
import logo from "@velz/assets/logo.png"
import {useEffect} from "react";
import Link from "next/link";


export interface NavBarProps {
  setSession(_: null): void;

  setUser(_: null): void;

  favouriteDealIds?: null | string[];
  session?: null | Session;
  categories?: Category[];
  user?: null | User;
  className?: string;
}

export function Navbar({favouriteDealIds = [], categories = [], className, setSession, setUser, session}: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if ('undefined' === typeof window) return;
    (document.activeElement as HTMLElement | null)?.blur();
  }, [pathname, searchParams]);

  return <nav className={[
    'py-1 flex gap-2 place-items-center',
    'sm:py-2 md:py-3 lg:gap-3',
    className,
  ].filter(Boolean).join(' ')}>
    <Link href="/" className="contents">
      <img className="z-10 w-16 block absolute aspect-square"
           alt="Velz app logo."
           src={logo.src}/>
    </Link>

    <hr className="grow opacity-0"/>

    <div className="group relative lg:contents">
      <button type="button" className="lg:hidden text-primary">
        <Menu/>
      </button>

      <div className="lg:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-4 group-focus-within:pointer-events-auto
                      border right-0 absolute rounded-sm lg:contents transition-all
                      bg-white/95 shadow-lg border-gray-100 backdrop-blur-3xl
                      opacity-0 translate-y-0 pointer-events-none">
        {categories.map(category => <Link
          className={[
            isActiveCategory(category) ? 'text-white bg-secondary after:opacity-100 lg:bg-transparent lg:after:bg-secondary' : 'after:opacity-0',
            'after:-z-10 after:shadow after:-top-3 after:-left-2.5 after:absolute after:content-[\'\'] after:bg-secondary',
            'py-2 block lg:py-1 relative after:hidden after:transition-all whitespace-nowrap after:rounded-full',
            'after:translate-x-2 after:translate-y-2 after:h-[calc(100%+.5rem)] after:w-[calc(100%+.5rem)]',
            'px-2 transition-all lg:after:block'
          ].filter(Boolean).join(' ')}
          href={`/offres?categorie=${encodeURIComponent(category.slug)}`}
          key={category.id}>
          <strong>
            {[category.icon, category.name].filter(Boolean).join(' ')}
          </strong>
        </Link>)}

        <hr className="grow opacity-0 hidden lg:block"/>

        <div className="px-2 flex lg:contents text-secondary justify-between">
          <Link className={[
            'after:absolute after:content-[\'\'] after:bg-gray-100 after:aspect-square',
            'after:top-1/2 after:left-1/2 after:opacity-0 after:transition-all',
            'after:-z-10 after:rounded-full after:w-[calc(100%+1rem)]',
            'after:-translate-x-1/2 after:-translate-y-1/2',
            '/favoris' === pathname && 'after:opacity-100',
            'py-3 mr-2 lg:py-1 lg:mr-2.5 relative',
          ].filter(Boolean).join(' ')} href="/favoris">
            <Heart/>
            <strong
              className={[
                'aspect-square rounded-full place-items-center translate-y-3 scale-90',
                'px-1.5 flex w-fit absolute bg-primary text-white',
                'left-3/4 bottom-3/4 lg:left-2/3 lg:bottom-[1.75rem]'
              ].join(' ')}>
              <small className="text-xs">{favouriteDealIds?.length || 0}</small>
            </strong>
          </Link>
          {session?.access_token
            ? <button className={[
              'after:top-1/2 after:left-1/2 after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all',
              'after:absolute after:content-[\'\'] after:bg-gray-100 after:aspect-square',
              'after:-z-10 after:rounded-full after:w-[calc(100%+1rem)]',
              'py-3 lg:py-1 relative',
            ].filter(Boolean).join(' ')}
                      onClick={logout}
                      type="button">
              <LogIn/>
            </button>
            : <>
              <Link className={[
                'after:top-1/2 after:left-1/2 after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all',
                'after:absolute after:content-[\'\'] after:bg-gray-100 after:aspect-square',
                'after:-z-10 after:rounded-full after:w-[calc(100%+1rem)]',
                '/inscription' === pathname && 'after:opacity-100',
                'py-3 lg:py-1 relative',
              ].filter(Boolean).join(' ')}
                    href="/inscription">
                <UserRoundPlus/>
              </Link>
              <Link className={[
                'after:top-1/2 after:left-1/2 after:opacity-0 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all',
                'after:absolute after:content-[\'\'] after:bg-gray-100 after:aspect-square',
                'after:-z-10 after:rounded-full after:w-[calc(100%+1rem)]',
                '/connexion' === pathname && 'after:opacity-100',
                'py-3 lg:py-1 relative'
              ].filter(Boolean).join(' ')}
                    href="/connexion">
                <Power/>
              </Link>
            </>}
        </div>
      </div>
    </div>
  </nav>;

  function isActiveCategory({slug}: Category) {
    return '/offres' === pathname && slug === searchParams.get('categorie');
  }

  function logout() {
    router.push("/");
    setSession(null);
    setUser(null);
  }
}
