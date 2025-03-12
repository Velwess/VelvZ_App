import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    // Clear password error when either password field changes
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setPasswordError('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Créer un compte</h1>
        <p className="text-gray-600">
          Rejoignez Velvès et profitez d'offres exclusives
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
          Votre compte a été créé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
            placeholder="••••••••"
            minLength={8}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
              passwordError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-[#E6A4B4]'
            }`}
            placeholder="••••••••"
            minLength={8}
          />
          {passwordError && (
            <p className="mt-2 text-sm text-red-600">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Création en cours...</span>
          ) : (
            <>
              Créer mon compte
              <ArrowRight className="ml-2" size={20} />
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
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
          Google
        </button>
      </form>
    </div>
  );
}

export default Register;