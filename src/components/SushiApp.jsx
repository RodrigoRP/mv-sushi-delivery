import React, { useState, useEffect } from 'react';
import { useFirestoreMenu, useFirestoreSettings } from '../hooks/useFirestoreOptimized';
// import { useLocalStorageMenu as useFirestoreMenu, useLocalStorageSettings as useFirestoreSettings } from '../hooks/useLocalStorage';
import { 
  ShoppingCart, 
  Search, 
  Star, 
  Plus, 
  Minus, 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  TrendingUp,
  Package,
  Store,
  DollarSign,
  Instagram,
  Facebook,
  Mail,
  MessageCircle,
  Eye,
  EyeOff,
  Edit3,
  Save,
  Trash2,
  LogOut
} from 'lucide-react';

const SushiApp = () => {
  // Menu inicial (padrão)
  const initialMenu = [
    // Combos
    {
      id: 1,
      name: 'M.V. Lo Gunkan',
      price: 95.00,
      image: 'https://picsum.photos/400/300?random=1',
      description: '10 unidades (10 peças de gunkan sortidos)',
      category: 'Combos',
      rating: 4.8,
      available: true,
      popular: true,
      promocaoDoDia: true,
      desconto: 15
    },
    {
      id: 2,
      name: 'M.V. Ro Kabu',
      price: 100.00,
      image: 'https://picsum.photos/400/300?random=2',
      description: 'Baixo carbo (01 temaki phila, 10 sashimis)',
      category: 'Combos',
      rating: 4.7,
      available: true,
      popular: false
    },
    {
      id: 3,
      name: 'M.V. Trufamaki',
      price: 78.00,
      image: 'https://picsum.photos/400/300?random=3',
      description: '12 peças (08 uramaki salmão especial, 2 gunkan de salmão, 2 niguiris finalizados com azeite trufado)',
      category: 'Combos',
      rating: 4.9,
      available: true,
      popular: false,
      promocaoDoDia: true,
      desconto: 20
    },
    {
      id: 4,
      name: 'M.V. Tupimaki',
      price: 85.00,
      image: 'https://picsum.photos/400/300?random=4',
      description: '14 peças (02 gunkan, 02 sashimis, 02 niguiris, 08 uramaki phila)',
      category: 'Combos',
      rating: 4.6,
      available: true,
      popular: false
    },
    {
      id: 5,
      name: 'M.V. Supreme',
      price: 299.00,
      image: 'https://picsum.photos/400/300?random=5',
      description: '80 peças - Combo especial completo',
      category: 'Combos',
      rating: 5.0,
      available: true,
      popular: true
    },
    
    // Uramaki
    {
      id: 6,
      name: 'Uramaki Philadelphia',
      price: 35.00,
      image: 'https://picsum.photos/400/300?random=6',
      description: '08 peças - Alga, arroz, cream cheese e salmão cru',
      category: 'Uramaki',
      rating: 4.8,
      available: true,
      popular: true
    },
    {
      id: 7,
      name: 'Uramaki Tropical',
      price: 30.00,
      image: 'https://picsum.photos/400/300?random=7',
      description: '08 peças - Alga, arroz, cream cheese, pepino e manga',
      category: 'Uramaki',
      rating: 4.5,
      available: true,
      popular: false
    },
    {
      id: 8,
      name: 'Uramaki Skin',
      price: 35.00,
      image: 'https://picsum.photos/400/300?random=8',
      description: '08 peças - Alga, arroz, cream cheese e pele de salmão frita com tarê',
      category: 'Uramaki',
      rating: 4.7,
      available: true,
      popular: false
    },
    
    // Sashimis
    {
      id: 9,
      name: 'Sashimi Salmão (2 peças)',
      price: 18.00,
      image: 'https://picsum.photos/400/300?random=9',
      description: '2 peças de salmão fresco',
      category: 'Sashimis',
      rating: 4.9,
      available: true,
      popular: false
    },
    {
      id: 10,
      name: 'Sashimi Salmão (4 peças)',
      price: 28.00,
      image: 'https://picsum.photos/400/300?random=10',
      description: '4 peças de salmão fresco',
      category: 'Sashimis',
      rating: 4.8,
      available: true,
      popular: true
    },
    {
      id: 11,
      name: 'Sashimi Salmão Trufa (2 peças)',
      price: 20.00,
      image: 'https://picsum.photos/400/300?random=11',
      description: '2 peças - Lâmina de salmão, flor de sal e azeite trufado',
      category: 'Sashimis',
      rating: 5.0,
      available: true,
      popular: false
    },
    
    // Temakis
    {
      id: 12,
      name: 'Temaki Philadelphia',
      price: 45.00,
      image: 'https://picsum.photos/400/300?random=12',
      description: 'Alga, arroz, cream cheese, gergelim e cebolinha',
      category: 'Temakis',
      rating: 4.7,
      available: true,
      popular: false
    },
    {
      id: 13,
      name: 'Temaki Hot Philadelphia',
      price: 46.00,
      image: 'https://picsum.photos/400/300?random=13',
      description: 'Alga, arroz, cream cheese empanado na farinha panko',
      category: 'Temakis',
      rating: 4.6,
      available: true,
      popular: false
    },
    {
      id: 14,
      name: 'Temaki Mexicano',
      price: 46.00,
      image: 'https://picsum.photos/400/300?random=14',
      description: 'Salmão cru, alga, cream cheese, molho de pimenta e Doritos',
      category: 'Temakis',
      rating: 4.8,
      available: true,
      popular: false
    },
    
    // Hot Rolls
    {
      id: 15,
      name: 'Hot Philadelphia',
      price: 28.00,
      image: 'https://picsum.photos/400/300?random=15',
      description: '08 peças empanados na farinha panko - Salmão e cream cheese',
      category: 'Hot Rolls',
      rating: 4.9,
      available: true,
      popular: true
    },
    {
      id: 16,
      name: 'Hot Salmão Especial',
      price: 30.00,
      image: 'https://picsum.photos/400/300?random=16',
      description: '08 peças - Salmão especial, cream cheese e cebolinha',
      category: 'Hot Rolls',
      rating: 4.7,
      available: true,
      popular: false
    },
    
    // Poke
    {
      id: 17,
      name: 'Poke Salmão (200g)',
      price: 45.00,
      image: 'https://picsum.photos/400/300?random=17',
      description: 'Salmão, cream cheese, gergelim e tempero verde',
      category: 'Poke',
      rating: 4.8,
      available: true,
      popular: false
    },
    {
      id: 18,
      name: 'Poke Tropical (300g)',
      price: 48.00,
      image: 'https://picsum.photos/400/300?random=18',
      description: 'Salmão fresco, cream cheese, arroz, pepino, manga, kani e cebola roxa',
      category: 'Poke',
      rating: 4.9,
      available: true,
      popular: false
    },
    
    // Entrada
    {
      id: 19,
      name: 'Sunomono',
      price: 22.00,
      image: 'https://picsum.photos/400/300?random=19',
      description: 'Salada de pepino, kani, gergelim e molho agridoce',
      category: 'Entrada',
      rating: 4.6,
      available: true,
      popular: false
    }
  ];

  // Estados principais
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Configurações iniciais da loja
  const initialStoreSettings = {
    isOpen: true,
    estimatedTime: '30-45 min',
    announcement: 'Encomendas antecipadas - Ingredientes limitados'
  };

  // Hooks do Firestore para sincronização em tempo real
  const {
    menu: sushiMenu,
    loading: menuLoading,
    error: menuError,
    updateProduct: firestoreUpdateProduct,
    toggleProductAvailability: firestoreToggleAvailability
  } = useFirestoreMenu(initialMenu);


  const {
    settings: storeSettings,
    loading: settingsLoading,
    updateSettings: updateStoreSettings
  } = useFirestoreSettings(initialStoreSettings);

  // Gerenciar sessão admin
  useEffect(() => {
    console.log('💾 Salvando sessão admin:', isAdmin);
    localStorage.setItem('mvSushiAdminSession', isAdmin.toString());
    console.log('💾 Sessão salva no localStorage:', localStorage.getItem('mvSushiAdminSession'));
  }, [isAdmin]);

  // Inicialização da aplicação
  useEffect(() => {
    // Aguardar carregamento do Firebase antes de inicializar
    if (menuLoading || settingsLoading) {
      return;
    }

    // Verificar se está acessando rota /admin
    const isAdminRoute = window.location.pathname === '/admin';
    
    // Verificar sessão admin salva
    const session = localStorage.getItem('mvSushiAdminSession');
    console.log('🔍 Verificando sessão admin na inicialização:', session);
    console.log('🔗 Rota atual:', window.location.pathname);
    console.log('🎯 É rota admin?', isAdminRoute);
    
    if (session === 'true') {
      console.log('✅ Sessão admin encontrada - logando automaticamente');
      setIsAdmin(true);
    } else if (isAdminRoute) {
      console.log('🔐 Rota admin acessada sem sessão - abrindo modal de login');
      // Se está na rota admin mas não tem sessão, abrir modal de login
      setShowAdminLogin(true);
    } else {
      console.log('❌ Nenhuma sessão admin encontrada - modo cliente');
    }
    
    // Marcar como inicializado
    setIsInitialized(true);
  }, [menuLoading, settingsLoading]);

  // Sistema de backup automático
  useEffect(() => {
    const createBackup = () => {
      const backup = {
        menu: sushiMenu,
        settings: storeSettings,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem('mvSushiBackup', JSON.stringify(backup));
    };

    // Criar backup a cada 5 minutos
    const backupInterval = setInterval(createBackup, 5 * 60 * 1000);
    
    // Criar backup inicial
    createBackup();

    return () => clearInterval(backupInterval);
  }, [sushiMenu, storeSettings]);

  // Categorias disponíveis
  const categories = ['Todos', 'Populares', 'Combos', 'Uramaki', 'Sashimis', 'Temakis', 'Hot Rolls', 'Poke', 'Entrada'];

  // Filtrar produtos (com verificação de segurança)
  const filteredProducts = (sushiMenu || []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || 
                           (selectedCategory === 'Populares' && product.popular) ||
                           product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Funções do carrinho
  const addToCart = (product) => {
    const productWithDiscountedPrice = {
      ...product,
      price: getFinalPrice(product) // Usar preço final (com ou sem desconto)
    };
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...productWithDiscountedPrice, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Funções para cálculo de desconto
  const getDiscountedPrice = (product) => {
    if (product.desconto && product.desconto > 0) {
      return product.price * (1 - product.desconto / 100);
    }
    return product.price;
  };

  const getFinalPrice = (product) => {
    return getDiscountedPrice(product);
  };

  // Função de checkout
  const handleCheckout = (customerData) => {
    const orderItems = cart.map(item => 
      `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\\n');

    const total = getTotalPrice().toFixed(2);
    
    const whatsappMessage = `🍣 *PEDIDO M.V. SUSHI DELIVERY*

👤 *Cliente:* ${customerData.name}
📱 *Telefone:* ${customerData.phone}
📍 *Endereço:* ${customerData.address}

🛒 *Itens do Pedido:*
${orderItems}

💰 *TOTAL: R$ ${total}*

💳 *PIX:* 55996005343

⚠️ *Importante:* Enviar comprovante do PIX após o pagamento para confirmação do pedido.`;

    const whatsappUrl = `https://wa.me/5555996005343?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Salvar pedido
    const newOrder = {
      id: Date.now(),
      customer: customerData,
      items: [...cart],
      total: getTotalPrice(),
      date: new Date().toLocaleString('pt-BR'),
      status: 'Pendente'
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    
    window.open(whatsappUrl, '_blank');
  };

  // Funções admin
  const handleLogin = (password) => {
    console.log('🔐 Tentativa de login com senha:', password);
    if (password === 'admin123') {
      console.log('✅ Senha correta - fazendo login');
      setIsAdmin(true);
      console.log('✅ setIsAdmin(true) executado');
      setNotification({
        type: 'success',
        message: 'Login realizado com sucesso!',
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);
      return true;
    }
    console.log('❌ Senha incorreta');
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('mvSushiAdminSession');
    setNotification({
      type: 'success',
      message: 'Logout realizado com sucesso!',
      timestamp: Date.now()
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateProduct = async (productId, updates) => {
    console.log('🔄 updateProduct chamado:', { productId, updates });
    
    try {
      // Usar Firestore para atualização em tempo real
      await firestoreUpdateProduct(productId, updates);
      
      // Mostrar notificação de sucesso
      const productName = (sushiMenu || []).find(p => p.id === productId)?.name || 'Produto';
      setNotification({
        type: 'success',
        message: `${productName} foi atualizado com sucesso!`,
        timestamp: Date.now()
      });
      
      // Remover notificação após 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      
      setEditingProduct(null);
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      setNotification({
        type: 'error',
        message: 'Erro ao atualizar produto. Tente novamente.',
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const toggleProductAvailability = async (productId) => {
    console.log('👁️ toggleProductAvailability chamado:', productId);
    
    try {
      // Usar Firestore para toggle em tempo real
      await firestoreToggleAvailability(productId);
      
      const product = (sushiMenu || []).find(p => p.id === productId);
      if (product) {
        setNotification({
          type: 'success',
          message: `${product.name} ${!product.available ? 'disponibilizado' : 'marcado como indisponível'}!`,
          timestamp: Date.now()
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (error) {
      console.error('❌ Erro ao alterar disponibilidade:', error);
      setNotification({
        type: 'error',
        message: 'Erro ao alterar disponibilidade. Tente novamente.',
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };


  // Componente Header
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/logo.png" 
                alt="M.V. Sushi Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="gradient-primary w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-2xl" style={{display: 'none'}}>
                🍣
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold tracking-wide truncate">M.V. Sushi</h1>
              <p className="hidden md:block text-sm text-custom-gray-500 font-light">Autêntica Culinária Japonesa</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-custom-gray-500" />
                <span>{storeSettings.estimatedTime}</span>
              </div>
              <a 
                href="https://wa.me/5555996005343" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="w-4 h-4" />
                <span>(55) 99600-5343</span>
              </a>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                storeSettings.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {storeSettings.isOpen ? 'Aberto' : 'Fechado'}
              </div>
            </div>
            
            {!isAdmin && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title="Admin"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative btn-primary"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            )}
            
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );

  // Componente Hero Section
  const HeroSection = () => (
    <section className="relative h-72 md:h-80 flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3)' }}
      />
      <div className="overlay-dark" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-shadow tracking-wide">Autêntica Culinária Japonesa</h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-shadow font-light tracking-wide">São Francisco de Assis e Região</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <a 
            href="https://wa.me/5555996005343" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card backdrop-blur-custom bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <div className="flex items-center justify-center space-x-3">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="font-semibold text-sm">(55) 99600-5343</p>
                <p className="text-xs opacity-80">WhatsApp</p>
              </div>
            </div>
          </a>
          
          <div className="card backdrop-blur-custom bg-white/10 border border-white/20">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-semibold text-sm">Quinta e Sexta</p>
                <p className="text-xs opacity-80">19:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Componente Promoção do Dia
  const PromocaoDoDia = () => {
    const promocaoProducts = (sushiMenu || []).filter(product => product.promocaoDoDia);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    
    // Rotacionar promoções a cada 5 segundos se houver múltiplas
    useEffect(() => {
      if (promocaoProducts.length > 1) {
        const interval = setInterval(() => {
          setCurrentPromoIndex((prev) => (prev + 1) % promocaoProducts.length);
        }, 5000);
        return () => clearInterval(interval);
      }
    }, [promocaoProducts.length]);
    
    if (promocaoProducts.length === 0) return null;
    
    const promocaoProduct = promocaoProducts[currentPromoIndex];

    return (
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-3xl p-8 text-white shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl">🔥</span>
                  <h2 className="text-2xl md:text-3xl font-bold">PROMOÇÃO DO DIA</h2>
                  <span className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    OFERTA ESPECIAL
                  </span>
                </div>
                <p className="text-red-100 text-lg">Aproveite agora por tempo limitado!</p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-xs text-red-200 mb-1">ECONOMIZE HOJE</div>
                <div className="text-2xl font-bold text-yellow-300">
                  {promocaoProduct.desconto ? `${promocaoProduct.desconto}% OFF` : 'OFERTA ESPECIAL'}
                </div>
                {promocaoProducts.length > 1 && (
                  <div className="text-xs text-red-200 mt-1">
                    {currentPromoIndex + 1} de {promocaoProducts.length} ofertas
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="relative">
                  <img
                    src={promocaoProduct.image}
                    alt={promocaoProduct.name}
                    className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    DESTAQUE
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{promocaoProduct.name}</h3>
                  <p className="text-white/90 mb-4 text-lg leading-relaxed">{promocaoProduct.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex flex-col">
                      {promocaoProduct.desconto && promocaoProduct.desconto > 0 ? (
                        <>
                          <div className="text-lg text-red-200 line-through">
                            R$ {promocaoProduct.price.toFixed(2)}
                          </div>
                          <div className="text-3xl font-bold text-yellow-300">
                            R$ {getDiscountedPrice(promocaoProduct).toFixed(2)}
                          </div>
                        </>
                      ) : (
                        <div className="text-3xl font-bold text-yellow-300">
                          R$ {promocaoProduct.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                    {promocaoProduct.desconto && promocaoProduct.desconto > 0 && (
                      <div className="bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                        -{promocaoProduct.desconto}%
                      </div>
                    )}
                    {promocaoProduct.rating && (
                      <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{promocaoProduct.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        addToCart(promocaoProduct);
                        setNotification({
                          type: 'success',
                          message: `${promocaoProduct.name} adicionado ao carrinho!`,
                          timestamp: Date.now()
                        });
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      disabled={!promocaoProduct.available}
                      className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-full font-bold text-lg transition-all duration-200 ${
                        promocaoProduct.available
                          ? 'bg-yellow-400 hover:bg-yellow-300 text-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                          : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>{promocaoProduct.available ? 'APROVEITAR AGORA' : 'Indisponível'}</span>
                    </button>
                    
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="px-6 py-4 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-all duration-200 border border-white/30"
                    >
                      Ver Carrinho
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-red-100">
                      ⚡ Oferta válida enquanto durarem os ingredientes
                    </p>
                    {promocaoProducts.length > 1 && (
                      <div className="flex justify-center space-x-2 mt-3">
                        {promocaoProducts.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPromoIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentPromoIndex ? 'bg-yellow-400' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Componente Search & Filter
  const SearchAndFilter = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="relative max-w-md">
          <label htmlFor="search-products" className="sr-only">Buscar produtos</label>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-custom-gray-500 w-5 h-5" />
          <input
            id="search-products"
            name="search"
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-custom-gray-700 border border-gray-200 hover:border-primary'
            }`}
          >
            {category === 'Populares' && '⭐ '}
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  // Componente Product Card
  const ProductCard = ({ product }) => (
    <div className={`card group ${!product.available ? 'opacity-50' : ''}`}>
      <div className="relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
        />
        {product.promocaoDoDia && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
            <span>🔥</span>
            <span>PROMOÇÃO</span>
          </span>
        )}
        {product.popular && !product.promocaoDoDia && (
          <span className="absolute top-3 left-3 badge-popular flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Popular</span>
          </span>
        )}
        {!product.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
            <span className="text-white font-semibold">Indisponível</span>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-custom-gray-500 text-sm mt-1">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <div className="flex flex-col items-end">
              {product.desconto && product.desconto > 0 ? (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {getFinalPrice(product).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  R$ {getFinalPrice(product).toFixed(2)}
                </span>
              )}
            </div>
            {product.desconto && product.desconto > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{product.desconto}%
              </span>
            )}
          </div>
          
          {product.available && !isAdmin && (
            <button
              onClick={() => addToCart(product)}
              className="btn-primary group-hover:scale-105 transition-transform duration-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
          
          {isAdmin && (
            <div className="flex space-x-2">
              <button
                onClick={() => toggleProductAvailability(product.id)}
                className={`p-2 rounded-full ${
                  product.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setEditingProduct(product)}
                className="p-2 rounded-full bg-blue-100 text-blue-600"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Componente Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informações da Empresa */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center text-lg">
                🍣
              </div>
              <h3 className="text-xl font-bold">M.V. Sushi</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Autêntica culinária japonesa em São Francisco de Assis e região. 
              Ingredientes frescos e tradição oriental em cada prato.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com/mvsushi" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/mvsushi" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/5555996005343" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">(55) 99600-5343</p>
                  <p className="text-gray-400 text-xs">WhatsApp - Encomendas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm">contato@mvsushi.com.br</p>
                  <p className="text-gray-400 text-xs">Email comercial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Localização</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="font-medium">São Francisco de Assis</p>
                  <p className="text-gray-300 text-sm">Rio Grande do Sul, Brasil</p>
                  <p className="text-gray-400 text-xs mt-1">Entrega em toda região</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Funcionamento</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">Quinta e Sexta</p>
                  <p className="text-gray-300 text-sm">19:00 - 22:00</p>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 mt-3 p-2 bg-gray-800 rounded">
                <p className="font-medium text-yellow-400">📱 Encomendas Antecipadas</p>
                <p>Faça seu pedido com antecedência</p>
              </div>
              
              <div className="mt-3">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  storeSettings.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    storeSettings.isOpen ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  {storeSettings.isOpen ? 'Aberto Agora' : 'Fechado'}
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Tempo estimado: {storeSettings.estimatedTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} M.V. Sushi Delivery. Todos os direitos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Desenvolvido com ❤️ para São Francisco de Assis
              </p>
            </div>

            {/* Links legais */}
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Componente Product Grid
  const ProductGrid = () => (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍣</div>
          <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-custom-gray-500">Tente ajustar sua busca ou filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  // Componente Cart Sidebar
  const CartSidebar = () => (
    <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
      isCartOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Seu Pedido</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-2">Carrinho vazio</h3>
              <p className="text-custom-gray-500">Adicione alguns produtos deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-primary font-bold">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary">R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                setIsCheckoutOpen(true);
                setIsCartOpen(false);
              }}
              className="w-full btn-primary text-lg py-4"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Componente Checkout Modal
  const CheckoutModal = () => {
    const [customerData, setCustomerData] = useState({
      name: '',
      phone: '',
      address: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (customerData.name && customerData.phone && customerData.address) {
        handleCheckout(customerData);
      }
    };

    if (!isCheckoutOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customer-name" className="block text-sm font-medium mb-2">Nome completo</label>
                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  required
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Seu nome"
                  autocomplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="customer-phone" className="block text-sm font-medium mb-2">Telefone</label>
                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(55) 99999-9999"
                  autocomplete="tel"
                />
              </div>
              
              <div>
                <label htmlFor="delivery-address" className="block text-sm font-medium mb-2">Endereço de entrega</label>
                <textarea
                  id="delivery-address"
                  name="address"
                  required
                  value={customerData.address}
                  onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Rua, número, bairro, cidade"
                  rows={3}
                  autocomplete="address-line1"
                />
              </div>
              
              <div className="border-t pt-4 mt-6">
                <h3 className="font-semibold mb-4">Resumo do Pedido</h3>
                <div className="space-y-2 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-primary">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💳 Pagamento via PIX</h4>
                <p className="text-sm text-yellow-700">
                  <strong>PIX:</strong> 55996005343<br />
                  Envie o comprovante após o pagamento para confirmação do pedido.
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary text-lg py-4 mt-6"
              >
                Enviar Pedido via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Componente Admin Login Modal
  const AdminLoginModal = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (handleLogin(password)) {
        setPassword('');
        setError('');
        setShowAdminLogin(false);
      } else {
        setError('Senha incorreta');
      }
    };

    if (!showAdminLogin) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-center mb-8">
            <div className="gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🍣
            </div>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-custom-gray-500">M.V. Sushi Delivery</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Digite a senha"
                required
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Componente Admin Dashboard
  const AdminDashboard = () => {
    const availableProducts = sushiMenu.filter(p => p.available).length;
    const todayOrders = orders.filter(order => {
      const today = new Date().toDateString();
      const orderDate = new Date(order.date).toDateString();
      return today === orderDate;
    }).length;
    const todaySales = orders
      .filter(order => {
        const today = new Date().toDateString();
        const orderDate = new Date(order.date).toDateString();
        return today === orderDate;
      })
      .reduce((total, order) => total + order.total, 0);

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard Admin</h2>
              <p className="text-custom-gray-500">Gerencie sua loja M.V. Sushi</p>
              <div className="mt-2 flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600">Sessão ativa</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">Auto-login habilitado</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-primary flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Visualizar Loja</span>
            </button>
          </div>
        </div>
        
        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayOrders}</p>
                <p className="text-custom-gray-500">Pedidos Hoje</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ {todaySales.toFixed(2)}</p>
                <p className="text-custom-gray-500">Vendas Hoje</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{availableProducts}</p>
                <p className="text-custom-gray-500">Produtos Ativos</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                storeSettings.isOpen ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <Store className={`w-6 h-6 ${
                  storeSettings.isOpen ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {storeSettings.isOpen ? 'Aberto' : 'Fechado'}
                </p>
                <p className="text-custom-gray-500">Status da Loja</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Configurações da loja */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-4">Configurações</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <button
                onClick={() => updateStoreSettings({
                  ...storeSettings,
                  isOpen: !storeSettings.isOpen
                })}
                className={`px-4 py-2 rounded-xl font-medium w-full ${
                  storeSettings.isOpen
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {storeSettings.isOpen ? 'Aberto' : 'Fechado'}
              </button>
            </div>
            
            <div>
              <label htmlFor="delivery-time" className="block text-sm font-medium mb-2">Tempo de Entrega</label>
              <input
                id="delivery-time"
                name="estimatedTime"
                type="text"
                value={storeSettings.estimatedTime}
                onChange={(e) => updateStoreSettings({
                  ...storeSettings,
                  estimatedTime: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: 30-45 min"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Ações</label>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Gerenciar Promoção do Dia */}
        <div className="card mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span className="text-2xl">🔥</span>
            <span>Promoção do Dia</span>
          </h3>
          <div className="space-y-4">
            <p className="text-custom-gray-500">Selecione qual produto será a promoção especial do dia</p>
            
            <div className="grid gap-4">
              {sushiMenu.map(product => (
                <div 
                  key={product.id} 
                  className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                    product.promocaoDoDia 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-custom-gray-500 text-sm">{product.category}</p>
                        <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                      </div>
                      {product.promocaoDoDia && (
                        <div className="flex items-center space-x-2">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                            PROMOÇÃO ATIVA
                          </span>
                          <span className="text-2xl">🔥</span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={async () => {
                        try {
                          const wasPromoted = product.promocaoDoDia;
                          
                          if (wasPromoted) {
                            // Se era promoção, apenas remover
                            await updateProduct(product.id, { promocaoDoDia: false });
                            
                            setNotification({
                              type: 'success',
                              message: 'Promoção removida!',
                              timestamp: Date.now()
                            });
                          } else {
                            // Se não era promoção, primeiro remover de todos e depois ativar neste
                            const updatePromises = sushiMenu.map(p => 
                              updateProduct(p.id, { promocaoDoDia: false })
                            );
                            
                            await Promise.all(updatePromises);
                            await updateProduct(product.id, { promocaoDoDia: true });
                            
                            setNotification({
                              type: 'success',
                              message: `${product.name} é agora a promoção do dia!`,
                              timestamp: Date.now()
                            });
                          }
                          
                          setTimeout(() => setNotification(null), 3000);
                        } catch (error) {
                          console.error('Erro ao atualizar promoção:', error);
                          setNotification({
                            type: 'error',
                            message: 'Erro ao atualizar promoção. Tente novamente.',
                            timestamp: Date.now()
                          });
                          setTimeout(() => setNotification(null), 3000);
                        }
                      }}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                        product.promocaoDoDia
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-700'
                      }`}
                    >
                      {product.promocaoDoDia ? 'Remover Promoção' : 'Definir como Promoção'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-600 text-xl">💡</span>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Como funciona?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Apenas 1 produto pode ser promoção do dia por vez</li>
                    <li>• A promoção aparece em destaque na página principal</li>
                    <li>• Clientes verão um banner especial com call-to-action</li>
                    <li>• Para remover a promoção, clique em "Remover Promoção"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lista de produtos para admin */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Gerenciar Produtos</h3>
          <div className="space-y-4">
            {sushiMenu.map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-custom-gray-500 text-sm">{product.category}</p>
                    <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {product.promocaoDoDia && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white flex items-center space-x-1">
                      <span>🔥</span>
                      <span>PROMOÇÃO</span>
                    </span>
                  )}
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? 'Disponível' : 'Indisponível'}
                  </span>
                  
                  <button
                    onClick={() => toggleProductAvailability(product.id)}
                    className={`p-2 rounded-full ${
                      product.available ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {product.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="p-2 rounded-full bg-blue-100 text-blue-600"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Histórico de pedidos */}
        {orders.length > 0 && (
          <div className="card mt-8">
            <h3 className="text-xl font-semibold mb-4">Pedidos Recentes</h3>
            <div className="space-y-4">
              {orders.slice(0, 10).map(order => (
                <div key={order.id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{order.customer.name}</h4>
                      <p className="text-custom-gray-500 text-sm">{order.customer.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">R$ {order.total.toFixed(2)}</p>
                      <p className="text-custom-gray-500 text-sm">{order.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-custom-gray-600">{order.customer.address}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Itens:</p>
                    <ul className="text-sm text-custom-gray-600">
                      {order.items.map(item => (
                        <li key={item.id}>{item.quantity}x {item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modal de edição de produto
  const ProductEditModal = () => {
    const [editData, setEditData] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errors, setErrors] = useState({});

    // Inicializar dados quando editingProduct muda
    useEffect(() => {
      if (editingProduct) {
        setEditData({
          name: editingProduct.name,
          price: editingProduct.price,
          description: editingProduct.description,
          image: editingProduct.image,
          available: editingProduct.available,
          popular: editingProduct.popular,
          category: editingProduct.category,
          rating: editingProduct.rating,
          desconto: editingProduct.desconto || null,
          promocaoDoDia: editingProduct.promocaoDoDia || false
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingProduct?.id]);

    // Validar dados do formulário
    const validateForm = () => {
      const newErrors = {};

      // Validar nome
      if (!editData.name || editData.name.trim().length < 3) {
        newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
      }

      // Validar preço
      if (!editData.price || editData.price <= 0) {
        newErrors.price = 'Preço deve ser maior que zero';
      }

      // Validar descrição
      if (!editData.description || editData.description.trim().length < 10) {
        newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
      }

      // Validar URL da imagem
      if (!editData.image || !isValidUrl(editData.image)) {
        newErrors.image = 'URL da imagem deve ser válida';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Validar URL
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
      } catch {
        return false;
      }
    };

    const handleSave = () => {
      console.log('💾 handleSave chamado:', { editingProduct, editData });
      
      if (!validateForm()) {
        setNotification({
          type: 'error',
          message: 'Por favor, corrija os erros no formulário!',
          timestamp: Date.now()
        });
        setTimeout(() => setNotification(null), 3000);
        return;
      }

      setSaving(true);
      
      // Atualizar imediatamente
      console.log('🔄 Chamando updateProduct...');
      updateProduct(editingProduct.id, editData);
      
      // Simular loading e feedback
      setTimeout(() => {
        setSaving(false);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setEditingProduct(null);
        }, 1500);
      }, 300);
    };

    if (!editingProduct) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Editar Produto</h2>
                {saved && (
                  <p className="text-sm text-green-600 font-medium mt-1 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Alterações salvas com sucesso!</span>
                  </p>
                )}
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                disabled={saving}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-product-name" className="block text-sm font-medium mb-2">Nome</label>
                <input
                  id="edit-product-name"
                  name="name"
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => {
                    setEditData({...editData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: null});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.name 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-primary'
                  }`}
                  autocomplete="off"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={editData.price || ''}
                  onChange={(e) => {
                    setEditData({...editData, price: parseFloat(e.target.value)});
                    if (errors.price) setErrors({...errors, price: null});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.price 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-primary'
                  }`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Desconto (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={editData.desconto || ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setEditData({...editData, desconto: value > 0 ? value : null});
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: 15 (para 15% de desconto)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe vazio para sem desconto. Só aplicado se for promoção do dia.
                </p>
              </div>
              
              <div>
                <label htmlFor="edit-product-description" className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  id="edit-product-description"
                  name="description"
                  value={editData.description || ''}
                  onChange={(e) => {
                    setEditData({...editData, description: e.target.value});
                    if (errors.description) setErrors({...errors, description: null});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.description 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-primary'
                  }`}
                  rows={3}
                  autocomplete="off"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
              
              <div>
                <label htmlFor="edit-product-image" className="block text-sm font-medium mb-2">URL da Imagem</label>
                <input
                  id="edit-product-image"
                  name="image"
                  type="url"
                  value={editData.image || ''}
                  onChange={(e) => {
                    setEditData({...editData, image: e.target.value});
                    if (errors.image) setErrors({...errors, image: null});
                  }}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                    errors.image 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-200 focus:ring-primary'
                  }`}
                  autocomplete="url"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
              
              <div className="flex items-center space-x-4">
                <label htmlFor="edit-product-available" className="flex items-center space-x-2">
                  <input
                    id="edit-product-available"
                    name="available"
                    type="checkbox"
                    checked={editData.available || false}
                    onChange={(e) => setEditData({...editData, available: e.target.checked})}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Disponível</span>
                </label>
                
                <label htmlFor="edit-product-popular" className="flex items-center space-x-2">
                  <input
                    id="edit-product-popular"
                    name="popular"
                    type="checkbox"
                    checked={editData.popular || false}
                    onChange={(e) => setEditData({...editData, popular: e.target.checked})}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">Popular</span>
                </label>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 btn-secondary"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex-1 flex items-center justify-center space-x-2 transition-all duration-200 ${
                    saved 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : saving 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'btn-primary'
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Salvando...</span>
                    </>
                  ) : saved ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Salvo!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Notificação
  const Notification = () => {
    if (!notification) return null;

    return (
      <div className="fixed top-4 right-4 z-50 animate-fade-in">
        <div className={`p-4 rounded-xl shadow-lg flex items-center space-x-3 max-w-sm ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : notification.type === 'error' ? (
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <div>
            <p className="font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  };


  // Loading screen enquanto inicializa
  if (!isInitialized || menuLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-custom-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">
            🍣
          </div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando M.V. Sushi...</h2>
          <p className="text-gray-500 mt-1">
            {!isInitialized ? 'Verificando sessão' : 
             menuLoading ? 'Carregando menu' : 
             'Carregando configurações'}
          </p>
          {menuError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-600 text-sm">
                ⚠️ Erro ao conectar com Firebase. Usando dados locais.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render principal  
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-custom-gray-50">
        <Header />
        <AdminDashboard />
        <ProductEditModal />
        <Notification />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-gray-50">
      <Header />
      <HeroSection />
      <PromocaoDoDia />
      <SearchAndFilter />
      <ProductGrid />
      <Footer />
      <CartSidebar />
      <CheckoutModal />
      <AdminLoginModal />
      <Notification />
      
      {/* Overlay quando cart estiver aberto */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default SushiApp;