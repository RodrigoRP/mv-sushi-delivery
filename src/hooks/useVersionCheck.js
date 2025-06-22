import { useState, useEffect } from 'react';

export const useVersionCheck = () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(null);

  const checkForUpdates = async () => {
    try {
      // Adiciona timestamp para evitar cache
      const response = await fetch(`/version.json?t=${Date.now()}`);
      const remoteVersion = await response.json();
      
      const localVersion = localStorage.getItem('appVersion');
      
      if (localVersion && localVersion !== remoteVersion.version) {
        setHasUpdate(true);
      }
      
      if (!localVersion) {
        localStorage.setItem('appVersion', remoteVersion.version);
      }
      
      setCurrentVersion(remoteVersion.version);
      
    } catch (error) {
      console.log('Não foi possível verificar atualizações:', error);
    }
  };

  const applyUpdate = () => {
    // Limpa cache e recarrega
    localStorage.clear();
    sessionStorage.clear();
    
    // Force reload sem cache
    window.location.reload(true);
  };

  const dismissUpdate = () => {
    if (currentVersion) {
      localStorage.setItem('appVersion', currentVersion);
      setHasUpdate(false);
    }
  };

  useEffect(() => {
    // Verifica na inicialização
    checkForUpdates();
    
    // Verifica a cada 5 minutos
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000);
    
    // Verifica quando a aba fica visível novamente
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { hasUpdate, applyUpdate, dismissUpdate };
};