import { useState, useEffect } from 'react';

export const useVersionCheck = () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(null);

  const applyUpdate = () => {
    // Limpa todos os caches possíveis
    localStorage.clear();
    sessionStorage.clear();
    
    // Limpa cache do navegador se disponível
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
    
    // Desregistra service workers se existirem
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });
    }
    
    // Force reload com query string para quebrar cache
    const timestamp = Date.now();
    window.location.href = window.location.href.split('?')[0] + '?v=' + timestamp;
  };

  const dismissUpdate = () => {
    if (currentVersion) {
      localStorage.setItem('appVersion', currentVersion);
      setHasUpdate(false);
    }
  };

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        // Adiciona timestamp para evitar cache
        const response = await fetch(`/version.json?t=${Date.now()}`);
        const remoteVersion = await response.json();
        
        const localVersion = localStorage.getItem('appVersion');
        const localTimestamp = localStorage.getItem('appTimestamp');
        
        // Se há versão local mas é diferente da remota
        if (localVersion && localVersion !== remoteVersion.version) {
          setHasUpdate(true);
          
          // Se a diferença for mais de 6 horas, força atualização automática
          if (localTimestamp && remoteVersion.timestamp) {
            const timeDiff = remoteVersion.timestamp - parseInt(localTimestamp);
            const sixHours = 6 * 60 * 60 * 1000;
            
            if (timeDiff > sixHours) {
              console.log('🔄 Versão muito antiga detectada, forçando atualização...');
              setTimeout(() => {
                applyUpdate();
              }, 2000); // Aguarda 2 segundos para mostrar notificação
            }
          }
        }
        
        // Salva versão e timestamp se não existir localmente
        if (!localVersion) {
          localStorage.setItem('appVersion', remoteVersion.version);
          localStorage.setItem('appTimestamp', remoteVersion.timestamp.toString());
        }
        
        setCurrentVersion(remoteVersion.version);
        
      } catch (error) {
        console.log('Não foi possível verificar atualizações:', error);
      }
    };

    // Verifica na inicialização
    checkForUpdates();
    
    // Verifica a cada 2 minutos (mais frequente)
    const interval = setInterval(checkForUpdates, 2 * 60 * 1000);
    
    // Verifica quando a aba fica visível novamente
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForUpdates();
      }
    };
    
    // Verifica quando há foco na janela
    const handleFocus = () => {
      checkForUpdates();
    };
    
    // Verifica quando há cliques na página (usuário ativo)
    const handleClick = () => {
      // Só verifica se passou mais de 1 minuto da última verificação
      const lastCheck = sessionStorage.getItem('lastVersionCheck');
      const now = Date.now();
      if (!lastCheck || (now - parseInt(lastCheck)) > 60000) {
        sessionStorage.setItem('lastVersionCheck', now.toString());
        checkForUpdates();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('click', handleClick);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return { hasUpdate, applyUpdate, dismissUpdate };
};