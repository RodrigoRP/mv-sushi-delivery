import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Hook otimizado para gerenciar menu no Firestore
export const useFirestoreMenu = (initialMenu) => {
  const [menu, setMenu] = useState(initialMenu);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Usar ref para evitar dependências que causam loops
  const initialMenuRef = useRef(initialMenu);
  const isInitializedRef = useRef(false);

  // Inicializar menu no Firestore
  const initializeMenu = useCallback(async (items) => {
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
  }, []);

  // Configurar listener apenas uma vez
  useEffect(() => {
    let unsubscribe = null;
    
    const setupListener = async () => {
      try {
        const menuRef = doc(db, 'restaurant', 'menu');
        
        // Listener em tempo real
        unsubscribe = onSnapshot(menuRef, 
          (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              if (data.items && Array.isArray(data.items)) {
                console.log('🔥 Menu atualizado do Firestore:', data.items.length, 'itens');
                setMenu(data.items);
                isInitializedRef.current = true;
              }
            } else if (!isInitializedRef.current) {
              // Se não existe e ainda não foi inicializado, inicializar com menu inicial
              console.log('🔥 Inicializando menu no Firestore...');
              setMenu(initialMenuRef.current);
              initializeMenu(initialMenuRef.current);
              isInitializedRef.current = true;
            }
            setLoading(false);
          },
          (error) => {
            console.error('❌ Erro ao escutar mudanças do menu:', error);
            setError(error);
            setLoading(false);
            
            // Fallback para menu inicial em caso de erro
            if (!isInitializedRef.current) {
              setMenu(initialMenuRef.current);
              isInitializedRef.current = true;
            }
          }
        );
      } catch (error) {
        console.error('❌ Erro ao configurar listener:', error);
        setError(error);
        setLoading(false);
        setMenu(initialMenuRef.current);
      }
    };

    setupListener();

    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vazio - configurar apenas uma vez

  // Atualizar menu completo
  const updateMenu = useCallback(async (newMenu) => {
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
  }, []);

  // Atualizar produto específico
  const updateProduct = useCallback(async (productId, updates) => {
    try {
      const currentMenu = menu || initialMenuRef.current;
      const newMenu = currentMenu.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      );
      await updateMenu(newMenu);
    } catch (error) {
      console.error('❌ Erro ao atualizar produto:', error);
      setError(error);
    }
  }, [menu, updateMenu]);

  // Toggle disponibilidade
  const toggleProductAvailability = useCallback(async (productId) => {
    try {
      const currentMenu = menu || initialMenuRef.current;
      const product = currentMenu.find(p => p.id === productId);
      if (product) {
        await updateProduct(productId, { available: !product.available });
      }
    } catch (error) {
      console.error('❌ Erro ao alterar disponibilidade:', error);
      setError(error);
    }
  }, [menu, updateProduct]);

  // Reset menu para valores iniciais
  const resetMenu = useCallback(async () => {
    try {
      await updateMenu(initialMenuRef.current);
    } catch (error) {
      console.error('❌ Erro ao resetar menu:', error);
      setError(error);
    }
  }, [updateMenu]);

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
  
  // Usar ref para evitar dependências que causam loops
  const initialSettingsRef = useRef(initialSettings);
  const isInitializedRef = useRef(false);

  const initializeSettings = useCallback(async (settings) => {
    try {
      const settingsRef = doc(db, 'restaurant', 'settings');
      await setDoc(settingsRef, {
        ...settings,
        updatedAt: new Date()
      });
      console.log('✅ Configurações inicializadas no Firestore');
    } catch (error) {
      console.error('❌ Erro ao inicializar configurações:', error);
    }
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    
    const setupListener = async () => {
      try {
        const settingsRef = doc(db, 'restaurant', 'settings');
        
        unsubscribe = onSnapshot(settingsRef,
          (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              console.log('🔥 Configurações atualizadas do Firestore:', data);
              setSettings(data);
              isInitializedRef.current = true;
            } else if (!isInitializedRef.current) {
              // Inicializar configurações
              console.log('🔥 Inicializando configurações no Firestore...');
              setSettings(initialSettingsRef.current);
              initializeSettings(initialSettingsRef.current);
              isInitializedRef.current = true;
            }
            setLoading(false);
          },
          (error) => {
            console.error('❌ Erro ao escutar configurações:', error);
            setLoading(false);
            
            // Fallback para configurações iniciais
            if (!isInitializedRef.current) {
              setSettings(initialSettingsRef.current);
              isInitializedRef.current = true;
            }
          }
        );
      } catch (error) {
        console.error('❌ Erro ao configurar listener de configurações:', error);
        setLoading(false);
        setSettings(initialSettingsRef.current);
      }
    };

    setupListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Array vazio - configurar apenas uma vez

  const updateSettings = useCallback(async (newSettings) => {
    try {
      const settingsRef = doc(db, 'restaurant', 'settings');
      await updateDoc(settingsRef, {
        ...newSettings,
        updatedAt: new Date()
      });
      console.log('✅ Configurações atualizadas no Firestore');
      
      // Backup no localStorage
      localStorage.setItem('mvSushiSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('❌ Erro ao atualizar configurações:', error);
      
      // Fallback para localStorage
      setSettings(newSettings);
      localStorage.setItem('mvSushiSettings', JSON.stringify(newSettings));
    }
  }, []);

  return {
    settings,
    loading,
    updateSettings
  };
};