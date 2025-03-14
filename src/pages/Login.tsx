import React, {useContext, useState} from 'react';
import {ArrowRight} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {supabase} from "../lib/supabase.ts";
import {SessionContext, UserContext} from "../domain/context.ts";

function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [error, setError] = useState<string>();
  const sessionContext = useContext(SessionContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<{ email?: string, password?: string }>({});

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Connexion</h1>
        <p className="text-gray-600">
          Connectez-vous pour accéder à vos offres exclusives
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          Connexion réussie !
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email ??= ''}
            placeholder="votre@email.com"
            onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
          />
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
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password ??= ''}
            onChange={e => setForm({...form, password: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
          />
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Connexion en cours...</span>
          ) : (
            <>
              Se connecter
              <ArrowRight className="ml-2" size={20}/>
            </>
          )}
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2"/>
          Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Pas encore de compte ?{' '}
          <Link to="/inscription" className="text-[#E6A4B4] hover:text-[#DA70D6] font-medium transition-colors">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        password: form.password!,
        email: form.email!,
      });
      if (error) throw error;
      setTimeout(() => navigate(`/`), 3_000);
      sessionContext.$set?.(data.session);
      userContext.$set?.(data.user);
      setIsSubmitting(true);
      setShowSuccess(true);
    } catch (error) {
      if ('invalid_credentials' === (error as any)?.['code'])
        setError('Email ou Mot de passe invalide/s.');
      console.warn(error);
    } finally {
      setIsSubmitting(false);
    }
  }
}

export default Login;
