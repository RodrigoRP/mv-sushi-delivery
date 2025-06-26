import React, { useState, useEffect, useRef } from 'react';
import { useFirestoreMenu, useFirestoreSettings } from '../hooks/useFirestoreOptimized';
// import { useLocalStorageMenu as useFirestoreMenu, useLocalStorageSettings as useFirestoreSettings } from '../hooks/useLocalStorage';
import { useVersionCheck } from '../hooks/useVersionCheck';
import { useEventDates, useEventRequests, useEventSettings } from '../hooks/useFirestoreEvents';
import AdminEventCalendar from './events/AdminEventCalendar';
import AdminEventRequests from './events/AdminEventRequests';
import ClientEventModal from './events/ClientEventModal';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
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
  LogOut,
  Copy,
  Check,
  RotateCcw,
  Calendar,
  ChevronLeft,
  ChevronRight
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
      desconto: 15,
      estoque: 12
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
      popular: false,
      estoque: 8
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
      desconto: 20,
      estoque: 3
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
  const [selectedCategory, setSelectedCategory] = useState('Populares');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); // Para animação do botão
  
  // Estados para eventos (novo sistema)
  const [showEventModal, setShowEventModal] = useState(false);
  const { 
    eventDates, 
    loading: eventDatesLoading, 
    setDateAvailability, 
    generateDefaultDates, 
    getAvailableDates 
  } = useEventDates();
  const { 
    eventRequests, 
    loading: eventRequestsLoading, 
    createEventRequest, 
    updateEventStatus, 
    deleteEventRequest 
  } = useEventRequests();
  const { settings: eventSettings } = useEventSettings();
  
  // Tipos de eventos disponíveis
  const eventTypes = [
    { id: 'festa', name: 'Festa', icon: '🎉' },
    { id: 'casamento', name: 'Casamento', icon: '💒' },
    { id: 'aniversario', name: 'Aniversário', icon: '🎂' },
    { id: 'reuniao', name: 'Reunião/Corporativo', icon: '🏢' },
    { id: 'outros', name: 'Outros', icon: '🍣' }
  ];
  
  // Handlers para o novo sistema de eventos
  const handleDateToggle = async (date, available) => {
    try {
      await setDateAvailability(date, available);
    } catch (error) {
      console.error('Error toggling date availability:', error);
      setNotification({
        type: 'error',
        message: 'Erro ao atualizar disponibilidade da data',
        timestamp: Date.now()
      });
    }
  };

  const handleGenerateDates = async () => {
    try {
      await generateDefaultDates(
        eventSettings.leadDays || 7,
        eventSettings.maxDays || 60,
        eventSettings.excludeWeekdays || [0]
      );
      setNotification({
        type: 'success',
        message: 'Datas geradas com sucesso!',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error generating dates:', error);
      setNotification({
        type: 'error',
        message: 'Erro ao gerar datas',
        timestamp: Date.now()
      });
    }
  };

  const handleEventRequest = async (requestData) => {
    try {
      await createEventRequest(requestData);
      setNotification({
        type: 'success',
        message: 'Solicitação enviada com sucesso!',
        timestamp: Date.now()
      });
      
      // Abrir WhatsApp com mensagem
      const message = encodeURIComponent(
        `Olá! Gostaria de solicitar um evento:\n\n` +
        `📅 Data: ${new Date(requestData.eventDate).toLocaleDateString('pt-BR')}\n` +
        `🎉 Tipo: ${requestData.eventType}\n` +
        `👥 Convidados: ${requestData.guests}\n` +
        `📍 Local: ${requestData.location}\n\n` +
        `Aguardo retorno! M.V. Sushi`
      );
      window.open(`https://wa.me/5555996005343?text=${message}`, '_blank');
    } catch (error) {
      console.error('Error creating event request:', error);
      setNotification({
        type: 'error',
        message: 'Erro ao enviar solicitação',
        timestamp: Date.now()
      });
    }
  };
  
  // Hook para verificar atualizações
  const { hasUpdate, applyUpdate, dismissUpdate } = useVersionCheck();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [pixCopied, setPixCopied] = useState(false);
  
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

  // Funções PIX
  const generatePixPayload = (amount, orderId) => {
    const pixKey = '+5555996005343'; // Telefone completo com código do país
    const merchantName = 'M.V. SUSHI';
    const merchantCity = 'SAO FRANCISCO';
    const txId = `MV${orderId}`.substring(0, 25); // Máximo 25 caracteres
    
    // Função auxiliar para calcular CRC16 CCITT
    const crc16 = (data) => {
      let crc = 0xFFFF;
      for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          if (crc & 0x8000) {
            crc = (crc << 1) ^ 0x1021;
          } else {
            crc = crc << 1;
          }
          crc &= 0xFFFF; // Manter apenas 16 bits
        }
      }
      return crc.toString(16).toUpperCase().padStart(4, '0');
    };
    
    // Função auxiliar para formar EMV
    const emv = (id, value) => {
      const len = value.length.toString().padStart(2, '0');
      return `${id}${len}${value}`;
    };
    
    // Montar payload PIX seguindo o padrão que funciona
    let payload = '';
    payload += '0002'; // Payload Format Indicator
    payload += '01'; // Point of Initiation Method
    
    // Merchant Account Information
    let merchantAccount = '';
    merchantAccount += emv('00', 'BR.GOV.BCB.PIX'); // GUI
    merchantAccount += emv('01', pixKey); // PIX key
    payload += emv('26', merchantAccount);
    
    payload += emv('52', '0000'); // Merchant Category Code
    payload += emv('53', '986'); // Transaction Currency (BRL)
    payload += emv('54', amount.toFixed(2)); // Transaction Amount
    payload += emv('58', 'BR'); // Country Code
    payload += emv('59', merchantName.substring(0, 25)); // Merchant Name
    payload += emv('60', merchantCity.substring(0, 15)); // Merchant City
    
    // Additional Data Field
    let additionalData = emv('05', txId);
    payload += emv('62', additionalData);
    
    payload += '6304'; // CRC16 placeholder
    
    // Calcular e adicionar CRC16
    const checksum = crc16(payload);
    payload = payload.slice(0, -4) + checksum;
    
    // Debug temporário
    console.log('=== PIX DEBUG ===');
    console.log('Payload completo:', payload);
    console.log('Tamanho do payload:', payload.length);
    console.log('Chave PIX:', pixKey);
    console.log('Valor:', amount.toFixed(2));
    console.log('TXID:', txId);
    console.log('Merchant City:', merchantCity);
    console.log('CRC16:', checksum);
    console.log('================');
    
    return payload;
  };

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
    // Verificar se há estoque disponível
    if (product.estoque !== undefined && product.estoque <= 0) {
      setNotification({
        type: 'error',
        message: 'Produto sem estoque disponível!',
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Verificar se quantidade no carrinho + 1 não excede estoque
    const existingItem = cart.find(item => item.id === product.id);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    
    if (product.estoque !== undefined && currentQuantityInCart >= product.estoque) {
      setNotification({
        type: 'error',
        message: `Apenas ${product.estoque} unidades disponíveis!`,
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const productWithDiscountedPrice = {
      ...product,
      price: getFinalPrice(product) // Usar preço final (com ou sem desconto)
    };
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...productWithDiscountedPrice, quantity: 1 }]);
    }

    // Diminuir estoque do produto
    if (product.estoque !== undefined) {
      updateProduct(product.id, { estoque: product.estoque - 1 });
    }

    // Feedback visual e notificação
    setAddingToCart(product.id);
    setTimeout(() => setAddingToCart(null), 500);
    
    setNotification({
      type: 'success',
      message: `${product.name} adicionado ao carrinho!`,
      timestamp: Date.now()
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) {
      // Restaurar estoque ao remover item do carrinho
      const product = sushiMenu.find(p => p.id === productId);
      if (product && product.estoque !== undefined) {
        updateProduct(productId, { estoque: product.estoque + itemToRemove.quantity });
      }
    }
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      const currentItem = cart.find(item => item.id === productId);
      const product = sushiMenu.find(p => p.id === productId);
      
      if (currentItem && product && product.estoque !== undefined) {
        const quantityDifference = newQuantity - currentItem.quantity;
        
        // Verificar se há estoque suficiente para o aumento
        if (quantityDifference > 0 && product.estoque < quantityDifference) {
          setNotification({
            type: 'error',
            message: `Apenas ${product.estoque} unidades disponíveis!`,
            timestamp: Date.now()
          });
          setTimeout(() => setNotification(null), 3000);
          return;
        }
        
        // Atualizar estoque baseado na diferença
        updateProduct(productId, { estoque: product.estoque - quantityDifference });
      }
      
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
    const orderId = Date.now();
    const totalAmount = getTotalPrice();
    
    // Gerar dados PIX
    const pixPayload = generatePixPayload(totalAmount, orderId);
    const pixTxId = `MV-${orderId}`;
    
    // Salvar pedido com dados PIX
    const newOrder = {
      id: orderId,
      customer: customerData,
      items: [...cart],
      total: totalAmount,
      date: new Date().toLocaleString('pt-BR'),
      status: 'Pendente',
      pix_payload: pixPayload,
      pix_txid: pixTxId,
      pix_amount: totalAmount,
      pix_status: 'PENDING'
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    
    // Abrir tela de pagamento PIX
    setCurrentOrder(newOrder);
    setShowPixPayment(true);
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
    <header className="bg-white sticky top-0 z-40 border-b-2 border-gradient-to-r from-green-200 via-yellow-200 to-red-200" style={{borderImageSource: 'linear-gradient(to right, #bbf7d0, #fef3c7, #fecaca)', borderImageSlice: 1}}>
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
                <Button
                  onClick={() => setShowEventModal(true)}
                  variant="warning"
                  size="sm"
                  className="shadow-sm hover:shadow-md"
                  title="Eventos"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Eventos</span>
                </Button>
                <Button
                  onClick={() => setIsCartOpen(true)}
                  className={`relative transition-all duration-300 ${
                    addingToCart ? 'animate-cart-shake' : ''
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <span className={`absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold transition-all duration-300 ${
                      addingToCart ? 'scale-125 bg-green-500' : ''
                    }`}>
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
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
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-700 py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        }}
      ></div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-wide" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>Autêntica Culinária Japonesa</h2>
        <p className="text-yellow-200 mb-6 flex items-center justify-center space-x-1 font-medium text-lg">
          <MapPin className="w-5 h-5 text-yellow-300" />
          <span>São Francisco de Assis e Região</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <a 
            href="https://wa.me/5555996005343" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>(55) 99600-5343</span>
          </a>
          
          <div className="flex items-center space-x-2 text-gray-200 text-sm">
            <Clock className="w-4 h-4" />
            <span>Qui-Sex: 19:00-22:00</span>
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
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-red-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔥</span>
              <div>
                <h2 className="font-bold text-lg">Promoção do Dia</h2>
                <p className="text-red-100 text-sm">{promocaoProduct.name}</p>
              </div>
              {promocaoProduct.desconto && (
                <span className="bg-yellow-400 text-red-800 px-2 py-1 rounded text-sm font-bold">
                  -{promocaoProduct.desconto}%
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">
                R$ {getDiscountedPrice(promocaoProduct).toFixed(2)}
              </div>
              {promocaoProduct.desconto && (
                <div className="text-red-200 text-sm line-through">
                  R$ {promocaoProduct.price.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          
          {/* Navegação manual se houver múltiplas promoções */}
          {promocaoProducts.length > 1 && (
            <div className="flex justify-center space-x-2 mt-3">
              {promocaoProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPromoIndex ? 'bg-yellow-400' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  // Componente Search & Filter
  const SearchAndFilter = () => (
    <div className="max-w-6xl mx-auto px-4 py-6 text-center">
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <label htmlFor="search-products" className="sr-only">Buscar produtos</label>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="search-products"
            name="search"
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full shadow-sm"
          />
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-scroll pb-2 px-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch'}}>
        <div className="flex space-x-2 min-w-max">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "success" : "outline"}
            size="sm"
            className="whitespace-nowrap rounded-full"
          >
            {category === 'Populares' && '⭐ '}
            {category}
          </Button>
        ))}
        </div>
      </div>
    </div>
  );

  // Componente Product Grid  
  const ProductGrid = () => (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500">Tente buscar por outro termo ou categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );

  // Componente Product Card
  const ProductCard = ({ product }) => (
    <Card className={`hover:shadow-lg transition-all duration-200 group ${!product.available ? 'opacity-50' : ''}`}>
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          {product.promocaoDoDia && (
            <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
              🔥 PROMO
            </Badge>
          )}
          {product.popular && !product.promocaoDoDia && (
            <Badge variant="warning" className="absolute top-2 left-2 text-xs">
              <Star className="w-3 h-3 fill-current mr-1" />
              Top
            </Badge>
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Indisponível</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-base">{product.name}</h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>
          {product.estoque !== undefined && (
            <div className="mt-2">
              {product.estoque > 0 ? (
                <Badge variant={product.estoque <= 3 ? "warning" : "success"} className="text-xs">
                  {product.estoque <= 3 ? '⚠️' : '✅'} {product.estoque} disponíveis
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  ❌ Sem estoque
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              {product.desconto && product.desconto > 0 ? (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {getFinalPrice(product).toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    -{product.desconto}%
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  R$ {getFinalPrice(product).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          {product.available && !isAdmin && (
            <Button
              onClick={() => addToCart(product)}
              disabled={product.estoque !== undefined && product.estoque <= 0}
              variant={addingToCart === product.id ? "success" : "success"}
              size="icon"
              className={`ml-2 transition-all duration-200 transform ${
                addingToCart === product.id ? 'scale-110 shadow-lg' : 'hover:scale-105'
              }`}
            >
              {product.estoque !== undefined && product.estoque <= 0 ? (
                <X className="w-4 h-4" />
              ) : addingToCart === product.id ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          )}
          
          {isAdmin && (
            <div className="flex space-x-2">
              <Button
                onClick={() => toggleProductAvailability(product.id)}
                variant={product.available ? "success" : "destructive"}
                size="icon"
                className="h-8 w-8"
              >
                {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => setEditingProduct(product)}
                variant="secondary"
                size="icon"
                className="h-8 w-8"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        </div>
      </CardContent>
    </Card>
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


  // Componente Cart Sidebar
  const CartSidebar = () => (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full md:w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-green-600" />
            <span>Seu Pedido</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-3xl mb-3">🛒</div>
              <h3 className="text-base font-semibold mb-1">Carrinho vazio</h3>
              <p className="text-gray-500 text-sm">Adicione alguns produtos deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-green-600 font-semibold text-sm">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      variant="success"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Total:</span>
              <span className="text-green-600 font-bold text-lg">R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              onClick={() => {
                setIsCheckoutOpen(true);
                setIsCartOpen(false);
              }}
              variant="success"
              className="w-full"
            >
              Finalizar Pedido
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
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

    return (
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Finalizar Pedido</DialogTitle>
          </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="customer-name" className="block text-sm font-medium mb-2">Nome completo</label>
                <Input
                  id="customer-name"
                  name="name"
                  type="text"
                  required
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </div>
              
              <div>
                <label htmlFor="customer-phone" className="block text-sm font-medium mb-2">Telefone</label>
                <Input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  placeholder="(55) 99999-9999"
                  autoComplete="tel"
                />
              </div>
              
              <div>
                <label htmlFor="delivery-address" className="block text-sm font-medium mb-2">Endereço de entrega</label>
                <Input
                  id="delivery-address"
                  name="address"
                  required
                  value={customerData.address}
                  onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                  placeholder="Rua, número, bairro, cidade"
                  autoComplete="address-line1"
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
              
              <Button
                type="submit"
                className="w-full text-lg py-4 mt-6"
                variant="default"
              >
                Enviar Pedido via WhatsApp
              </Button>
            </form>
        </DialogContent>
      </Dialog>
    );
  };

  // Componente PIX Payment Modal
  const PixPaymentModal = () => {
    const copyPixCode = async () => {
      if (currentOrder?.pix_payload) {
        try {
          await navigator.clipboard.writeText(currentOrder.pix_payload);
          setPixCopied(true);
          setNotification({
            type: 'success',
            message: 'Código PIX copiado!',
            timestamp: Date.now()
          });
          setTimeout(() => {
            setPixCopied(false);
            setNotification(null);
          }, 3000);
        } catch (err) {
          console.error('Erro ao copiar código PIX:', err);
          setNotification({
            type: 'error',
            message: 'Erro ao copiar código PIX',
            timestamp: Date.now()
          });
          setTimeout(() => setNotification(null), 3000);
        }
      }
    };

    const sendWhatsApp = () => {
      // Calcular data de retirada estimada (30-45 min a partir de agora)
      const now = new Date();
      const estimatedTime = new Date(now.getTime() + 45 * 60000); // 45 minutos
      const dataRetirada = estimatedTime.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const orderItems = currentOrder.items.map(item => 
        `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const whatsappMessage = `🔔 *Pedido #${currentOrder.id} – M.V. Sushi*
📅 *Data retirada:* ${dataRetirada}
👤 *${currentOrder.customer.name}* – ${currentOrder.customer.phone}
📍 ${currentOrder.customer.address}

🍣 *Itens:*
${orderItems}

💰 *Total:* R$ ${currentOrder.total.toFixed(2)}
*PIX gerado:* ${currentOrder.pix_txid}
📸 *Assim que pagar, guarde o comprovante.*
*Você receberá confirmação automática em até 1 minuto.*`;

      const whatsappUrl = `https://wa.me/5555996005343?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    };

    if (!showPixPayment || !currentOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Pagamento PIX</h2>
              <button
                onClick={() => {
                  setShowPixPayment(false);
                  setCurrentOrder(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-center space-y-6">
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 inline-block">
                <QRCodeSVG 
                  value={currentOrder.pix_payload}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>
              
              {/* Informações do pedido */}
              <div className="space-y-2">
                <p className="text-lg font-semibold">R$ {currentOrder.total.toFixed(2)}</p>
                <p className="text-sm text-gray-600">ID: {currentOrder.pix_txid}</p>
                <p className="text-sm text-gray-600">PIX: (55) 99600-5343</p>
              </div>
              
              {/* Botão copiar código */}
              <button
                onClick={copyPixCode}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  pixCopied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {pixCopied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Código Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>Copiar Código PIX</span>
                  </>
                )}
              </button>
              
              {/* Botão WhatsApp */}
              <button
                onClick={sendWhatsApp}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Pedido via WhatsApp</span>
              </button>
              
              {/* Instruções */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-blue-800 mb-2">📱 Como pagar:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Abra seu banco ou app de pagamentos</li>
                  <li>2. Escaneie o QR Code ou cole o código PIX</li>
                  <li>3. Confirme o pagamento de R$ {currentOrder.total.toFixed(2)}</li>
                  <li>4. Envie o comprovante via WhatsApp</li>
                </ol>
              </div>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
          
          <div className="card">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{eventRequests.length}</p>
                <p className="text-custom-gray-500">Eventos Solicitados</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gestão de Eventos - Novo Sistema */}
        <div className="space-y-6 mb-8">
          <AdminEventCalendar
            eventDates={eventDates}
            onDateToggle={handleDateToggle}
            onGenerateDates={handleGenerateDates}
            loading={eventDatesLoading}
          />
          
          <AdminEventRequests
            eventRequests={eventRequests}
            onUpdateStatus={updateEventStatus}
            onDeleteRequest={deleteEventRequest}
            loading={eventRequestsLoading}
          />
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
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                      {product.estoque !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          product.estoque === 0 
                            ? 'bg-red-100 text-red-600'
                            : product.estoque <= 3 
                              ? 'bg-orange-100 text-orange-600' 
                              : 'bg-green-100 text-green-600'
                        }`}>
                          Estoque: {product.estoque}
                        </span>
                      )}
                    </div>
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

    const handleSave = async () => {
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
      
      try {
        // Se estamos marcando como promoção do dia, primeiro remover de todos os outros
        if (editData.promocaoDoDia && !editingProduct.promocaoDoDia) {
          console.log('🔄 Removendo promoção do dia de outros produtos...');
          const updatePromises = sushiMenu
            .filter(p => p.id !== editingProduct.id && p.promocaoDoDia)
            .map(p => updateProduct(p.id, { promocaoDoDia: false }));
          
          await Promise.all(updatePromises);
        }
        
        // Atualizar o produto atual
        console.log('🔄 Chamando updateProduct...');
        await updateProduct(editingProduct.id, editData);
        
        // Simular loading e feedback
        setTimeout(() => {
          setSaving(false);
          setSaved(true);
          setTimeout(() => {
            setSaved(false);
            setEditingProduct(null);
          }, 1500);
        }, 300);
        
      } catch (error) {
        console.error('Erro ao salvar produto:', error);
        setSaving(false);
        setNotification({
          type: 'error',
          message: 'Erro ao salvar alterações. Tente novamente.',
          timestamp: Date.now()
        });
        setTimeout(() => setNotification(null), 3000);
      }
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Deixe vazio para sem desconto.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Estoque</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editData.estoque || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setEditData({...editData, estoque: value >= 0 ? value : 0});
                    }}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: 10 (unidades disponíveis)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Quantidade disponível para venda.
                  </p>
                </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                
                <label htmlFor="edit-product-promocao" className="flex items-center space-x-2">
                  <input
                    id="edit-product-promocao"
                    name="promocaoDoDia"
                    type="checkbox"
                    checked={editData.promocaoDoDia || false}
                    onChange={(e) => setEditData({...editData, promocaoDoDia: e.target.checked})}
                    className="rounded text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium flex items-center space-x-1">
                    <span>Promoção do Dia</span>
                    <span className="text-red-500">🔥</span>
                  </span>
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

  // Integração com novo sistema de eventos
  const EventModalWrapper = () => (
    <ClientEventModal
      isOpen={showEventModal}
      onClose={() => setShowEventModal(false)}
      availableDates={getAvailableDates()}
      onSubmitRequest={handleEventRequest}
      loading={eventRequestsLoading}
    />
  );

  // Componente Event Modal (REMOVIDO - substituído pelo novo sistema)
  const EventModalOld = () => {
    const [currentStep, setCurrentStep] = useState('calendar'); // 'calendar' ou 'form'
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const isProcessingRef = useRef(false);
    const [eventForm, setEventForm] = useState({
      type: '',
      guests: '',
      location: '',
      preferences: '',
      budget: '',
      observations: '',
      contact: '',
      name: ''
    });

    const formatDate = (date) => {
      // Parse date string as local date to avoid timezone issues
      const [year, month, day] = date.split('-').map(Number);
      const localDate = new Date(year, month - 1, day);
      
      return localDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      // Adicionar dias vazios do início
      for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(null);
      }

      // Adicionar dias do mês
      for (let day = 1; day <= lastDay.getDate(); day++) {
        // Fix timezone issue by using local date formatting
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        days.push({
          day,
          date: dateStr,
          available: availableEventDates.includes(dateStr)
        });
      }

      return days;
    };

    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const selectDate = (date) => {
      console.log('Selecting date:', date);
      console.log('Current step before:', currentStep);
      console.log('Is processing:', isProcessingRef.current);
      
      // Prevent multiple rapid clicks
      if (isProcessingRef.current) {
        console.log('Already processing, ignoring click');
        return;
      }
      
      // Set processing flag
      isProcessingRef.current = true;
      
      console.log('Processing date selection...');
      
      // Update states
      setSelectedEventDate(date);
      setCurrentStep('form');
      
      // Reset processing flag after a short delay
      setTimeout(() => {
        isProcessingRef.current = false;
        console.log('Processing flag reset');
      }, 100);
      
      console.log('Date selection completed');
    };

    const submitEventRequest = () => {
      const eventRequest = {
        id: Date.now(),
        date: selectedEventDate,
        ...eventForm,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      setEventRequests([...eventRequests, eventRequest]);

      // Criar mensagem para WhatsApp
      const whatsappMessage = `🎉 *SOLICITAÇÃO DE EVENTO - M.V. SUSHI*

📅 *Data:* ${formatDate(selectedEventDate)}
🎪 *Tipo:* ${eventTypes.find(t => t.id === eventForm.type)?.name || eventForm.type}
👥 *Convidados:* ${eventForm.guests}
📍 *Local:* ${eventForm.location}
💰 *Orçamento:* ${eventForm.budget}

🍣 *Preferências:* ${eventForm.preferences}
📝 *Observações:* ${eventForm.observations}

👤 *Contato:* ${eventForm.name}
📱 *Telefone:* ${eventForm.contact}

_Aguardamos seu retorno para confirmar disponibilidade!_`;

      const whatsappUrl = `https://wa.me/5555996005343?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      setNotification({
        type: 'success',
        message: 'Solicitação enviada! Você será redirecionado para o WhatsApp.',
        timestamp: Date.now()
      });
      setTimeout(() => setNotification(null), 3000);

      // Reset form
      setShowEventModal(false);
      setCurrentStep('calendar');
      setSelectedEventDate(null);
      isProcessingRef.current = false;
      setEventForm({
        type: '',
        guests: '',
        location: '',
        preferences: '',
        budget: '',
        observations: '',
        contact: '',
        name: ''
      });
    };

    if (!showEventModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg md:max-w-xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold">
                  {currentStep === 'calendar' ? 'Escolha a Data' : 'Detalhes do Evento'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setCurrentStep('calendar');
                  setSelectedEventDate(null);
                  isProcessingRef.current = false;
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {currentStep === 'calendar' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold">
                    {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((dayData, index) => (
                    <div key={index} className="h-8 md:h-10">
                      {dayData ? (
                        <button
                          onClick={() => {
                            if (dayData.available) {
                              selectDate(dayData.date);
                            }
                          }}
                          disabled={!dayData.available}
                          className={`w-full h-full rounded-lg transition-all duration-200 text-sm font-medium ${
                            dayData.available
                              ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {dayData.day}
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-100 rounded"></div>
                      <span>Disponível</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-100 rounded"></div>
                      <span>Indisponível</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Selecione uma data disponível para continuar
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800 font-medium">
                    📅 Data selecionada: {formatDate(selectedEventDate)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome *</label>
                    <input
                      type="text"
                      value={eventForm.name}
                      onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <input
                      type="tel"
                      value={eventForm.contact}
                      onChange={(e) => setEventForm({...eventForm, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="(55) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Evento *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {eventTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setEventForm({...eventForm, type: type.id})}
                        className={`p-3 border rounded-lg transition-colors text-center ${
                          eventForm.type === type.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Convidados *</label>
                    <input
                      type="number"
                      value={eventForm.guests}
                      onChange={(e) => setEventForm({...eventForm, guests: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: 50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Orçamento Estimado</label>
                    <input
                      type="text"
                      value={eventForm.budget}
                      onChange={(e) => setEventForm({...eventForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: R$ 2000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Local do Evento *</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: Casa, Salão, Clube, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferências de Pratos</label>
                  <textarea
                    value={eventForm.preferences}
                    onChange={(e) => setEventForm({...eventForm, preferences: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Ex: Combos variados, sashimis, temakis..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Observações</label>
                  <textarea
                    value={eventForm.observations}
                    onChange={(e) => setEventForm({...eventForm, observations: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder="Informações adicionais, restrições alimentares, etc."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setCurrentStep('calendar')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={submitEventRequest}
                    disabled={!eventForm.name || !eventForm.contact || !eventForm.type || !eventForm.guests || !eventForm.location}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Componente de Notificação de Atualização
  const UpdateNotification = () => (
    hasUpdate && (
      <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-start space-x-3">
          <RotateCcw className="w-5 h-5 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Nova versão disponível!</h4>
            <p className="text-xs text-blue-100 mt-1">
              Recarregue a página para ver as últimas atualizações.
            </p>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={applyUpdate}
                className="bg-white text-blue-500 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-50 transition-colors"
              >
                Atualizar
              </button>
              <button
                onClick={dismissUpdate}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
              >
                Depois
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Render principal  
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-custom-gray-50">
        <Header />
        <AdminDashboard />
        <ProductEditModal />
        <EventModalWrapper />
        <Notification />
        <UpdateNotification />
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
      <PixPaymentModal />
      <AdminLoginModal />
      <EventModal />
      <Notification />
      <UpdateNotification />
      
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