import React, {createContext, useCallback, useContext, useState} from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({children}: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{favorites, toggleFavorite, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
