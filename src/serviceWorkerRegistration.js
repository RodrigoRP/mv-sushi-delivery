// Service Worker Registration para MV Sushi PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            '🍣 MV Sushi PWA rodando em localhost. ' +
            'Este service worker não funciona em produção.'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('✅ Service Worker registrado para MV Sushi:', registration);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                '🔄 Nova versão do MV Sushi disponível! ' +
                'Feche e reabra o app para atualizar.'
              );
              
              // Mostrar notificação de atualização
              showUpdateNotification();
              
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('📱 MV Sushi está pronto para uso offline!');
              
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('❌ Erro ao registrar Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        '📱 Nenhuma conexão de internet. MV Sushi está rodando em modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Função para mostrar notificação de atualização
function showUpdateNotification() {
  // Criar um toast/banner para informar sobre atualização
  const updateBanner = document.createElement('div');
  updateBanner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ef4444;
      color: white;
      padding: 12px;
      text-align: center;
      z-index: 9999;
      font-family: system-ui;
      font-size: 14px;
    ">
      🍣 Nova versão do MV Sushi disponível! 
      <button onclick="window.location.reload()" style="
        background: white;
        color: #ef4444;
        border: none;
        padding: 4px 12px;
        border-radius: 4px;
        margin-left: 8px;
        cursor: pointer;
        font-weight: bold;
      ">
        Atualizar Agora
      </button>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 4px 8px;
        border-radius: 4px;
        margin-left: 8px;
        cursor: pointer;
      ">
        Depois
      </button>
    </div>
  `;
  
  document.body.appendChild(updateBanner);
  
  // Remove automaticamente após 10 segundos
  setTimeout(() => {
    if (updateBanner.parentElement) {
      updateBanner.remove();
    }
  }, 10000);
}

// Verificar se o app pode ser instalado
export function checkInstallPrompt() {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('📱 MV Sushi pode ser instalado!');
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botão de instalação customizado
    showInstallButton(deferredPrompt);
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('🎉 MV Sushi foi instalado com sucesso!');
    deferredPrompt = null;
    
    // Analytics ou tracking de instalação
    if (window.gtag) {
      window.gtag('event', 'pwa_install', {
        event_category: 'PWA',
        event_label: 'MV Sushi Installed'
      });
    }
  });
}

// Função para mostrar botão de instalação
function showInstallButton(deferredPrompt) {
  const installButton = document.createElement('div');
  installButton.innerHTML = `
    <div id="install-banner" style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: white;
      border: 2px solid #ef4444;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 9999;
      font-family: system-ui;
      max-width: 400px;
      margin: 0 auto;
    ">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 24px;">🍣</div>
        <div style="flex: 1;">
          <h3 style="margin: 0; color: #ef4444; font-size: 16px;">Instalar MV Sushi</h3>
          <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">
            Acesse rapidamente e receba notificações
          </p>
        </div>
        <button id="install-btn" style="
          background: #ef4444;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        ">
          Instalar
        </button>
        <button id="install-close" style="
          background: transparent;
          color: #999;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
        ">
          ✕
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(installButton);
  
  // Event listeners
  document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`👤 Usuário ${outcome} instalar o app`);
      deferredPrompt = null;
      document.getElementById('install-banner').remove();
    }
  });
  
  document.getElementById('install-close').addEventListener('click', () => {
    document.getElementById('install-banner').remove();
  });
  
  // Remove automaticamente após 30 segundos
  setTimeout(() => {
    const banner = document.getElementById('install-banner');
    if (banner) {
      banner.remove();
    }
  }, 30000);
}

// Inicializar verificação de instalação
if (typeof window !== 'undefined') {
  checkInstallPrompt();
}