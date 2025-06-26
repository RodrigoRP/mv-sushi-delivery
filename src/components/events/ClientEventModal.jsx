import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  User, 
  Phone, 
  MapPin, 
  Users, 
  DollarSign,
  MessageSquare,
  Send
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const eventTypes = [
  { id: 'festa', name: 'Festa', icon: '🎉' },
  { id: 'casamento', name: 'Casamento', icon: '💒' },
  { id: 'aniversario', name: 'Aniversário', icon: '🎂' },
  { id: 'reuniao', name: 'Reunião/Corporativo', icon: '🏢' },
  { id: 'outros', name: 'Outros', icon: '🍣' }
];

const ClientEventModal = ({ 
  isOpen, 
  onClose, 
  availableDates, 
  onSubmitRequest,
  loading 
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: calendar, 2: form
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventType: '',
    eventTypeIcon: '',
    guests: '',
    location: '',
    budget: '',
    preferences: '',
    observations: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Reset modal when opening/closing
  React.useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setSelectedDate(null);
      setFormData({
        name: '',
        contact: '',
        eventType: '',
        eventTypeIcon: '',
        guests: '',
        location: '',
        budget: '',
        preferences: '',
        observations: ''
      });
    }
  }, [isOpen]);

  // Navegação do calendário
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Obter dias do mês
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
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isAvailable = availableDates.includes(dateStr);
      const isPast = new Date(dateStr) < new Date().setHours(0, 0, 0, 0);
      
      days.push({
        day,
        date: dateStr,
        available: isAvailable && !isPast,
        isPast
      });
    }

    return days;
  };

  // Selecionar data
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep(2);
  };

  // Voltar para calendário
  const goBackToCalendar = () => {
    setCurrentStep(1);
    setSelectedDate(null);
  };

  // Selecionar tipo de evento
  const selectEventType = (type) => {
    setFormData({
      ...formData,
      eventType: type.name,
      eventTypeIcon: type.icon
    });
  };

  // Formatar data selecionada
  const formatSelectedDate = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    const localDate = new Date(year, month - 1, day);
    
    return localDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Validar formulário
  const isFormValid = () => {
    return formData.name && 
           formData.contact && 
           formData.eventType && 
           formData.guests && 
           formData.location;
  };

  // Submeter solicitação
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setSubmitting(true);
    try {
      await onSubmitRequest({
        ...formData,
        eventDate: selectedDate
      });
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span>
              {currentStep === 1 ? 'Escolha a Data do Evento' : 'Detalhes do Evento'}
            </span>
          </DialogTitle>
        </DialogHeader>

        {currentStep === 1 ? (
          // STEP 1: Calendar
          <div className="space-y-6">
            {/* Navegação do mês */}
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h3>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Cabeçalho dos dias */}
            <div className="grid grid-cols-7 gap-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendário */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentMonth).map((dayData, index) => (
                <div key={index} className="h-12">
                  {dayData ? (
                    <button
                      onClick={() => dayData.available && handleDateSelect(dayData.date)}
                      disabled={!dayData.available}
                      className={`w-full h-full rounded-lg transition-all duration-200 text-sm font-medium ${
                        dayData.available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer border-2 border-green-300'
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

            {/* Legenda e informações */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-blue-800">ℹ️ Como funciona:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Selecione uma data disponível (verde)</li>
                <li>• Preencha os detalhes do seu evento</li>
                <li>• Enviaremos uma confirmação via WhatsApp</li>
                <li>• Mínimo de 7 dias de antecedência</li>
              </ul>
            </div>
          </div>
        ) : (
          // STEP 2: Form
          <div className="space-y-6">
            {/* Data selecionada */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                📅 Data selecionada: {formatSelectedDate(selectedDate)}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={goBackToCalendar}
                className="mt-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Alterar data
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Dados pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Nome completo *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    WhatsApp *
                  </label>
                  <Input
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    placeholder="(55) 99999-9999"
                    required
                  />
                </div>
              </div>

              {/* Tipo de evento */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Tipo de evento *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => selectEventType(type)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.eventType === type.name
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Detalhes do evento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Número de convidados *
                  </label>
                  <Input
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    placeholder="Ex: 20 pessoas"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Orçamento aproximado
                  </label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="Ex: R$ 500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Local do evento *
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Endereço completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferências alimentares
                </label>
                <Input
                  value={formData.preferences}
                  onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                  placeholder="Ex: sem peixe cru, vegetariano, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Observações adicionais
                </label>
                <Input
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                  placeholder="Algo importante que devemos saber..."
                />
              </div>

              {/* Botões */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  disabled={!isFormValid() || submitting}
                  className="flex-1"
                >
                  {submitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Solicitar Evento
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBackToCalendar}
                >
                  Voltar
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClientEventModal;