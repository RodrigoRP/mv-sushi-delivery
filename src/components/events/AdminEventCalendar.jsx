import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Calendar, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const AdminEventCalendar = ({ 
  eventDates, 
  onDateToggle, 
  onGenerateDates,
  loading 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);

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
      const eventDate = eventDates.find(d => d.date === dateStr);
      const isPast = new Date(dateStr) < new Date().setHours(0, 0, 0, 0);
      
      days.push({
        day,
        date: dateStr,
        available: eventDate?.available || false,
        capacity: eventDate?.capacity || 0,
        isPast,
        hasEvents: false // TODO: integrar com solicitações confirmadas
      });
    }

    return days;
  };

  const handleDateClick = (dayData) => {
    if (dayData.isPast) return;
    onDateToggle(dayData.date, !dayData.available);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando calendário...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Calendário de Disponibilidade</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={onGenerateDates}
            >
              Gerar Datas
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showSettings && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Configurações Rápidas</h4>
            <div className="text-sm text-gray-600">
              <p>• Verde: Data disponível para eventos</p>
              <p>• Cinza: Data não disponível</p>
              <p>• Clique para alternar disponibilidade</p>
              <p>• "Gerar Datas" cria disponibilidade para os próximos 60 dias</p>
            </div>
          </div>
        )}

        {/* Navegação do mês */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-2 mb-4">
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
                  onClick={() => handleDateClick(dayData)}
                  disabled={dayData.isPast}
                  className={`w-full h-full rounded-lg transition-all duration-200 text-sm font-medium relative ${
                    dayData.isPast
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : dayData.available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer border-2 border-green-300'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer border-2 border-gray-200'
                  }`}
                >
                  <span>{dayData.day}</span>
                  {dayData.available && !dayData.isPast && (
                    <Check className="w-3 h-3 absolute top-0.5 right-0.5 text-green-600" />
                  )}
                  {dayData.hasEvents && (
                    <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
            <span>Disponível</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-50 border-2 border-gray-200 rounded"></div>
            <span>Não disponível</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Data passada</span>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {eventDates.filter(d => d.available).length}
            </div>
            <div className="text-sm text-green-700">Datas Disponíveis</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {eventDates.filter(d => d.hasEvents).length}
            </div>
            <div className="text-sm text-blue-700">Eventos Agendados</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminEventCalendar;