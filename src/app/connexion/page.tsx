'use client';
import {FavouriteDealIdsContext, SessionContext, UserContext} from "@velz/common/domain/context.ts";
import type {AuthError, Session, User, WeakPassword} from '@supabase/supabase-js';
import {ApiResponse, ERRORS} from "@velz/common/lib/database.types.ts";
import React, {useContext, useState} from 'react';
import {useRouter} from "next/navigation";
import {ArrowRight} from 'lucide-react';
import Link from "next/link";
import Image from "next/image";

export default function ConnexionPage() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [error, setError] = useState<string>();
  const sessionContext = useContext(SessionContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<{ email?: string, password?: string }>({});
  const {favouriteDealIds, $set: setFavouriteDealIdsContext} = useContext(FavouriteDealIdsContext);

  return <div className="max-w-md mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Connexion</h1>
      <p className="text-gray-600">
        Connectez-vous pour accéder à vos offres exclusives
      </p>
    </div>


    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input id="email"
               type="email"
               value={form.email ??= ''}
               placeholder="votre@email.com"
               onChange={e => setForm({...form, email: e.target.value})}
               className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"/>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <a href="#" className="text-sm text-[#E6A4B4] hover:text-[#DA70D6] transition-colors">
            Mot de passe oublié ?
          </a>
        </div>
        <input id="password"
               type="password"
               placeholder="••••••••"
               value={form.password ??= ''}
               onChange={e => setForm({...form, password: e.target.value})}
               className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"/>
      </div>

      {/*<div className="flex items-center">*/}
      {/*  <input*/}
      {/*    type="checkbox"*/}
      {/*    id="remember"*/}
      {/*    className="h-4 w-4 text-[#E6A4B4] border-gray-300 rounded focus:ring-[#E6A4B4]"*/}
      {/*  />*/}
      {/*  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">*/}
      {/*    Se souvenir de moi*/}
      {/*  </label>*/}
      {/*</div>*/}

      {error && <p className="mb-6 p-4 bg-red-100 font-bold text-red-700 rounded-lg text-center">
        {error}
      </p>}
      <button type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
        {isSubmitting
          ? <span className="animate-pulse">Connexion en cours...</span>
          : <>
            Se connecter
            <ArrowRight className="ml-2" size={20}/>
          </>}
      </button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
        </div>
      </div>

      <button type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Image src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2"/>
        Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Pas encore de compte ?{' '}
        <Link href="/inscription" className="text-[#E6A4B4] hover:text-[#DA70D6] font-medium transition-colors">
          Créer un compte
        </Link>
      </p>
    </form>
  </div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch('/api/auth/login', {
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: form.password!,
        email: form.email!,
      }),
      method: 'POST',
    })
      .then(_ => _.json() as PromiseLike<ApiResponse<{ user: User; session: Session; weakPassword?: WeakPassword }>>)
      .then(({status, content}) => 'ERROR' === status ? Promise.reject(content) : content)
      .then(({user, session}) =>
        fetch('/api/favourites', {
          headers: {Authorization: `Bearer ${session.access_token}`},
          body: JSON.stringify(favouriteDealIds ?? []),
          credentials: 'same-origin',
          redirect: 'follow',
          method: 'PATCH',
        })
          .then(res => res.json() as PromiseLike<ApiResponse<string[]>>)
          .then(({content}) => {
            setFavouriteDealIdsContext!(content);
            sessionContext.$set!(session);
            userContext.$set!(user);
            router.push('/');
          }))
      .catch((error: AuthError) => {
        // @ts-expect-error TS2538
        setError(ERRORS[error.code] ?? 'C\'est etrange! Verifiez voyre connexion ou contactez-nous!');
      });
    try {
    } catch (error) {
      switch ((error as never)?.['code']) {
        case 'invalid_credentials':
          setError('E-mail ou Mot de passe invalide/s.');
          break;
        case 'email_not_confirmed':
          setError('Address e-mail non-confirmee (verifiez votre messagerie).');
          break;
        default:
          setError('C\'est etrange! Verifiez voyre connexion ou contactez-nous!');
      }
      if ('invalid_credentials' === (error as never)?.['code'])

        if ('invalid_credentials' === (error as never)?.['code'])
          setError('Email ou Mot de passe invalide/s.');
    } finally {
      setIsSubmitting(false);
    }
  }
}
