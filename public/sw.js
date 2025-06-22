// Service Worker para MV Sushi PWA
const CACHE_NAME = 'mvsushi-v1.0.0';
const STATIC_CACHE_NAME = 'mvsushi-static-v1.0.0';
const DATA_CACHE_NAME = 'mvsushi-data-v1.0.0';

// Recursos para cache offline
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  // Cache de fontes e recursos essenciais
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// URLs de dados dinâmicos
const DATA_URLS = [
  '/api/',
  'https://firestore.googleapis.com/'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.all([
      // Cache de arquivos estáticos
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Cache estático criado');
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { cache: 'reload' })));
      }),
      
      // Cache de dados
      caches.open(DATA_CACHE_NAME).then((cache) => {
        console.log('💾 Cache de dados criado');
        return cache;
      })
    ])
  );
  
  // Força o SW a se tornar ativo imediatamente
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE_NAME && 
              cacheName !== DATA_CACHE_NAME && 
              cacheName.startsWith('mvsushi-')) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Toma controle de todas as páginas
  self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia para arquivos estáticos
  if (STATIC_FILES.some(staticUrl => request.url.includes(staticUrl))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
    return;
  }
  
  // Estratégia para dados do Firebase/API
  if (DATA_URLS.some(dataUrl => request.url.includes(dataUrl))) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Se online, salva no cache e retorna
            if (response.status === 200) {
              cache.put(request.url, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Se offline, retorna do cache
            return cache.match(request);
          });
      })
    );
    return;
  }
  
  // Estratégia para navegação (HTML)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        // Se offline, retorna a página principal
        return caches.match('/');
      })
    );
    return;
  }
  
  // Para outros recursos, tenta cache primeiro
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).catch(() => {
        // Se falhar e for uma imagem, retorna placeholder
        if (request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="100" y="100" text-anchor="middle" fill="#9ca3af" font-size="14">🍣 Imagem indisponível</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
    })
  );
});

// Sincronização em background
self.addEventListener('sync', (event) => {
  console.log('🔄 Sincronização em background:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aqui você pode sincronizar dados quando voltar online
      syncOfflineData()
    );
  }
});

// Função para sincronizar dados offline
async function syncOfflineData() {
  try {
    // Verificar se há dados offline para sincronizar
    const offlineData = await getOfflineData();
    
    if (offlineData.length > 0) {
      // Enviar dados para servidor
      await Promise.all(
        offlineData.map(data => fetch('/api/sync', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }))
      );
      
      // Limpar dados offline após sincronização
      await clearOfflineData();
      
      console.log('✅ Dados sincronizados com sucesso');
    }
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
  }
}

// Função auxiliar para obter dados offline
async function getOfflineData() {
  const db = await openDB();
  return db.getAll('offline-data');
}

// Função auxiliar para limpar dados offline
async function clearOfflineData() {
  const db = await openDB();
  return db.clear('offline-data');
}

// Função auxiliar para abrir IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MVSushiDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offline-data')) {
        db.createObjectStore('offline-data', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Notificações push (para futuro)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      data: data.data,
      actions: [
        {
          action: 'view',
          title: 'Ver Pedido',
          icon: '/icon-view.png'
        },
        {
          action: 'close',
          title: 'Fechar',
          icon: '/icon-close.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    // Abrir a aplicação
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});