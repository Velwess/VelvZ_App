'use client';

import {ArrowRight, Building2} from 'lucide-react';
import React, {useState} from 'react';

export default function PartenairePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    partnershipType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setFormData({name: '', company: '', email: '', partnershipType: '', message: ''});

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-[#F4C2C2] rounded-full flex items-center justify-center mx-auto mb-4">
        <Building2 size={32} className="text-[#E6A4B4]"/>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Devenir Partenaire</h1>
      <p className="text-gray-600">
        Rejoignez notre réseau de partenaires et développez votre activité
      </p>
    </div>

    {showSuccess && (
      <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
        Votre demande a été envoyée avec succès ! Nous vous contacterons rapidement.
      </div>
    )}

    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
            placeholder="Nom de votre entreprise"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email professionnel
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
          placeholder="votre@entreprise.com"
        />
      </div>

      <div>
        <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-2">
          Type de partenariat souhaité
        </label>
        <select
          id="partnershipType"
          name="partnershipType"
          required
          value={formData.partnershipType}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
        >
          <option value="">Sélectionnez un type</option>
          <option value="retail">Commerce de détail</option>
          <option value="service">Prestataire de services</option>
          <option value="activity">Activités & Loisirs</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E6A4B4] transition-all"
          placeholder="Décrivez votre projet de partenariat..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-[#E6A4B4] to-[#DA70D6] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <span className="animate-pulse">Envoi en cours...</span>
        ) : (
          <>
            Envoyer ma demande
            <ArrowRight className="ml-2" size={20}/>
          </>
        )}
      </button>
    </form>
  </div>;
}
