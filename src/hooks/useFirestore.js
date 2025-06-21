import { useState, useEffect } from 'react';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Hook para gerenciar menu no Firestore
export const useFirestoreMenu = (initialMenu) => {
  const [menu, setMenu] = useState(initialMenu);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar menu inicial e configurar listener em tempo real
  useEffect(() => {
    const menuRef = doc(db, 'restaurant', 'menu');
    
    // Listener em tempo real
    const unsubscribe = onSnapshot(menuRef, 
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.items) {
            console.log('🔥 Menu atualizado do Firestore:', data.items.length, 'itens');
            setMenu(data.items);
          }
        } else {
          // Se não existe, inicializar com menu inicial
          console.log('🔥 Inicializando menu no Firestore...');
          initializeMenu(initialMenu);
        }
        setLoading(false);
      },
      (error) => {
        console.error('❌ Erro ao escutar mudanças do menu:', error);
        setError(error);
        setLoading(false);
        // Fallback para localStorage em caso de erro
        const savedMenu = localStorage.getItem('mvSushiMenu');
        if (savedMenu) {
          setMenu(JSON.parse(savedMenu));
        } else {
          setMenu(initialMenu);
        }
      }
    );

    return () => unsubscribe();
  }, [initialMenu]);

  // Inicializar menu no Firestore
  const initializeMenu = async (items) => {
    try {
      const menuRef = doc(db, 'restaurant', 'menu');
      await setDoc(menuRef, {
        items,
        updatedAt: new Date(),
        version: 1
      });
      console.log('✅ Menu inicializado no Firestore');
    } catch (error) {
      console.error('❌ Erro ao inicializar menu:', error);
      setError(error);
    }
  };

  // Atualizar menu completo
  const updateMenu = async (newMenu) => {
    try {
      console.log('🔄 Atualizando menu no Firestore...');
      const menuRef = doc(db, 'restaurant', 'menu');
      await updateDoc(menuRef, {
        items: newMenu,
        updatedAt: new Date()
      });
      console.log('✅ Menu atualizado no Firestore');
      
      // Backup no localStorage
      localStorage.setItem('mvSushiMenu', JSON.stringify(newMenu));
    } catch (error) {
      console.error('❌ Erro ao atualizar menu:', error);
      setError(error);
      
      // Fallback para localStorage
      setMenu(newMenu);
      localStorage.setItem('mvSushiMenu', JSON.stringify(newMenu));
    }
  };

  // Atualizar produto específico
  const updateProduct = async (productId, updates) => {
    try {
      const newMenu = menu.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      );
      await updateMenu(newMenu);
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      setError(error);
    }
  };

  // Toggle disponibilidade
  const toggleProductAvailability = async (productId) => {
    try {
      const product = menu.find(p => p.id === productId);
      if (product) {
        await updateProduct(productId, { available: !product.available });
      }
    } catch (error) {
      console.error('❌ Erro ao alterar disponibilidade:', error);
      setError(error);
    }
  };

  // Reset menu para valores iniciais
  const resetMenu = async () => {
    try {
      await updateMenu(initialMenu);
    } catch (error) {
      console.error('❌ Erro ao resetar menu:', error);
      setError(error);
    }
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

// Hook para configurações da loja
export const useFirestoreSettings = (initialSettings) => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const settingsRef = doc(db, 'restaurant', 'settings');
    
    const unsubscribe = onSnapshot(settingsRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log('🔥 Configurações atualizadas do Firestore:', data);
          setSettings(data);
        } else {
          // Inicializar configurações
          initializeSettings(initialSettings);
        }
        setLoading(false);
      },
      (error) => {
        console.error('❌ Erro ao escutar configurações:', error);
        setLoading(false);
        // Fallback para localStorage
        const savedSettings = localStorage.getItem('mvSushiSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        } else {
          setSettings(initialSettings);
        }
      }
    );

    return () => unsubscribe();
  }, [initialSettings]);

  const initializeSettings = async (settings) => {
    try {
      const settingsRef = doc(db, 'restaurant', 'settings');
      await setDoc(settingsRef, {
        ...settings,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('❌ Erro ao inicializar configurações:', error);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const settingsRef = doc(db, 'restaurant', 'settings');
      await updateDoc(settingsRef, {
        ...newSettings,
        updatedAt: new Date()
      });
      
      // Backup no localStorage
      localStorage.setItem('mvSushiSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('❌ Erro ao atualizar configurações:', error);
      
      // Fallback para localStorage
      setSettings(newSettings);
      localStorage.setItem('mvSushiSettings', JSON.stringify(newSettings));
    }
  };

  return {
    settings,
    loading,
    updateSettings
  };
};