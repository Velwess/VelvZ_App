'use client';
import {ERRORS} from "@velz/common/lib/database.types.ts";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import Image from "next/image";

export default function InscriptionPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email: '', password: '', confirmPassword: ''});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({});

  useEffect(() => {
    if (form.password !== form.confirmPassword)
      setPasswordError(ERRORS['different_password']!);
  }, [form.password, form.confirmPassword]);

  return <div className="max-w-md mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Créer un compte</h1>
      <p className="text-gray-600">
        Rejoignez Velvès et profitez d'offres exclusives
      </p>
    </div>

    <form onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      {/*<div>*/}
      {/*  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">*/}
      {/*    Nom complet*/}
      {/*  </label>*/}
      {/*  <input*/}
      {/*    id="name"*/}
      {/*    type="text"*/}
      {/*    placeholder="Votre nom"*/}
      {/*    value={form.name ??= ''}*/}
      {/*    onChange={e => setForm({...form, name: e.target.value})}*/}
      {/*    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"*/}
      {/*  />*/}
      {/*</div>*/}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input id="email"
               type="email"
               value={form.email ??= ''}
               placeholder="votre@email.com"
               onChange={e => updateForm('email', e.target.value)}
               className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"/>
      </div>

      <div>
        <label htmlFor="password"
               className="block text-sm font-medium text-gray-700 mb-2">
          Mot de passe
        </label>
        <input id="password"
               type="password"
               placeholder="••••••••"
               value={form.password ??= ''}
               onChange={e => updateForm('password', e.target.value)}
               className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"/>
      </div>

      <div>
        <label htmlFor="confirmPassword"
               className="block text-sm font-medium text-gray-700 mb-2">
          Confirmer le mot de passe
        </label>
        <input type="password"
               id="confirmPassword"
               placeholder="••••••••"
               value={form.confirmPassword ??= ''}
               onChange={e => updateForm('confirmPassword', e.target.value)}
               className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                 passwordError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E6A4B4]'
               }`}/>
        {touched.password && touched.confirmPassword && passwordError && (
          <p className="my-4 mb-6 p-4 bg-red-100 font-bold text-red-700 rounded-lg text-center">{passwordError}</p>
        )}
      </div>

      <button type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
        {isSubmitting
          ? <span className="animate-pulse">Création en cours...</span>
          : <>
            Créer mon compte
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
    </form>
  </div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    const {email, password} = form;

    fetch('/api/auth/register', {
      body: JSON.stringify({email, password}),
      method: 'POST',
    }).then(async res => [res.status, await res.json()])
      .then(([status, {content}]) => {
        if (status < 400) return router.push(`/connexion?from=${encodeURIComponent(pathname)}`);
        if (content?.code in ERRORS) setPasswordError(ERRORS[content?.code]!);
      })
      .finally(() => setIsSubmitting(false));
  }

  function updateForm<T extends typeof form, K extends keyof T>(key: K, value: T[K]) {
    setTouched({...touched, [key]: true});
    setForm({...form, [key]: value});
    setPasswordError('');
  }
}
