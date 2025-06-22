import { useState, useEffect } from 'react';

// Hook simples que usa apenas localStorage (fallback sem Firebase)
export const useLocalStorageMenu = (initialMenu) => {
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem('mvSushiMenu');
    return savedMenu ? JSON.parse(savedMenu) : initialMenu;
  });
  
  const [loading] = useState(false);
  const [error] = useState(null);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('mvSushiMenu', JSON.stringify(menu));
  }, [menu]);

  const updateMenu = (newMenu) => {
    setMenu(newMenu);
  };

  const updateProduct = (productId, updates) => {
    setMenu(prevMenu => 
      prevMenu.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      )
    );
  };

  const toggleProductAvailability = (productId) => {
    setMenu(prevMenu => 
      prevMenu.map(product => 
        product.id === productId 
          ? { ...product, available: !product.available }
          : product
      )
    );
  };

  const resetMenu = () => {
    setMenu(initialMenu);
  };

  return {
    menu,
    loading,
    error,
    updateMenu,
    updateProduct,
    toggleProductAvailability,
    resetMenu
  };
};

export const useLocalStorageSettings = (initialSettings) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('mvSushiSettings');
    return savedSettings ? JSON.parse(savedSettings) : initialSettings;
  });
  
  const [loading] = useState(false);

  useEffect(() => {
    localStorage.setItem('mvSushiSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return {
    settings,
    loading,
    updateSettings
  };
};