import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: `Velvès - ${title}`,
      text: `Découvrez cette offre exceptionnelle sur Velvès : ${title}`,
      url: url || window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        // You might want to add a toast notification here
        alert('Lien copié !');
      }
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-[#E6A4B4] hover:text-[#DA70D6] transition-colors duration-300"
      aria-label="Partager"
    >
      <Share2 size={24} />
    </button>
  );
}