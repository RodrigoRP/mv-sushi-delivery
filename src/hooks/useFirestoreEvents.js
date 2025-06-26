import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  where,
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Hook para gerenciar datas disponíveis para eventos
export const useEventDates = () => {
  const [eventDates, setEventDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'eventDates'),
      (snapshot) => {
        const dates = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEventDates(dates);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching event dates:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Função para adicionar/atualizar uma data
  const setDateAvailability = async (date, available, capacity = 1) => {
    try {
      const dateId = date; // Using date string as ID (YYYY-MM-DD)
      const docRef = doc(db, 'eventDates', dateId);
      
      await updateDoc(docRef, {
        date,
        available,
        capacity,
        updatedAt: new Date()
      }).catch(async () => {
        // If document doesn't exist, create it
        await addDoc(collection(db, 'eventDates'), {
          date,
          available,
          capacity,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    } catch (error) {
      console.error('Error setting date availability:', error);
      throw error;
    }
  };

  // Função para gerar datas padrão
  const generateDefaultDates = async (startDays = 7, endDays = 60, excludeWeekdays = [0]) => {
    try {
      const batch = writeBatch(db);
      const today = new Date();
      
      for (let i = startDays; i <= endDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip excluded weekdays (0 = Sunday, 1 = Monday, etc.)
        if (excludeWeekdays.includes(date.getDay())) {
          continue;
        }
        
        const dateStr = date.toISOString().split('T')[0];
        const docRef = doc(db, 'eventDates', dateStr);
        
        batch.set(docRef, {
          date: dateStr,
          available: true,
          capacity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }, { merge: true }); // merge: true won't overwrite existing docs
      }
      
      await batch.commit();
    } catch (error) {
      console.error('Error generating default dates:', error);
      throw error;
    }
  };

  // Função para obter datas disponíveis
  const getAvailableDates = () => {
    return eventDates
      .filter(date => date.available)
      .map(date => date.date)
      .sort();
  };

  return {
    eventDates,
    loading,
    error,
    setDateAvailability,
    generateDefaultDates,
    getAvailableDates
  };
};

// Hook para gerenciar solicitações de eventos
export const useEventRequests = () => {
  const [eventRequests, setEventRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'eventRequests'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        }));
        setEventRequests(requests);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching event requests:', error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Função para criar nova solicitação
  const createEventRequest = async (eventData) => {
    try {
      const docRef = await addDoc(collection(db, 'eventRequests'), {
        ...eventData,
        status: 'pending', // pending, confirmed, rejected, completed
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating event request:', error);
      throw error;
    }
  };

  // Função para atualizar status da solicitação
  const updateEventStatus = async (requestId, status, adminNotes = '') => {
    try {
      const docRef = doc(db, 'eventRequests', requestId);
      await updateDoc(docRef, {
        status,
        adminNotes,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating event status:', error);
      throw error;
    }
  };

  // Função para deletar solicitação
  const deleteEventRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, 'eventRequests', requestId));
    } catch (error) {
      console.error('Error deleting event request:', error);
      throw error;
    }
  };

  // Função para obter solicitações por status
  const getRequestsByStatus = (status) => {
    return eventRequests.filter(request => request.status === status);
  };

  return {
    eventRequests,
    loading,
    error,
    createEventRequest,
    updateEventStatus,
    deleteEventRequest,
    getRequestsByStatus
  };
};

// Hook para configurações de eventos
export const useEventSettings = () => {
  const [settings, setSettings] = useState({
    leadDays: 7, // Mínimo de dias de antecedência
    maxDays: 60, // Máximo de dias no futuro
    excludeWeekdays: [0], // Dias da semana bloqueados (0 = domingo)
    defaultCapacity: 1, // Capacidade padrão por data
    autoGenerateDates: true // Gerar datas automaticamente
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDoc = doc(db, 'eventSettings', 'default');
        const unsubscribe = onSnapshot(
          settingsDoc,
          (doc) => {
            if (doc.exists()) {
              setSettings({ ...settings, ...doc.data() });
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching event settings:', error);
            setError(error);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error('Error setting up settings listener:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Função para atualizar configurações
  const updateSettings = async (newSettings) => {
    try {
      const settingsDoc = doc(db, 'eventSettings', 'default');
      await updateDoc(settingsDoc, {
        ...newSettings,
        updatedAt: new Date()
      }).catch(async () => {
        // Se documento não existe, criar
        await addDoc(collection(db, 'eventSettings'), {
          ...newSettings,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    } catch (error) {
      console.error('Error updating event settings:', error);
      throw error;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings
  };
};