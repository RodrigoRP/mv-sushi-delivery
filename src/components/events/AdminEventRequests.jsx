import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageCircle, 
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Phone,
  Trash2,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

const AdminEventRequests = ({ 
  eventRequests, 
  onUpdateStatus, 
  onDeleteRequest,
  loading 
}) => {
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, rejected
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Filtrar solicitações
  const filteredRequests = eventRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  // Obter cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'rejected': return 'destructive';
      case 'completed': return 'secondary';
      default: return 'outline';
    }
  };

  // Obter texto do status
  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'rejected': return 'Rejeitado';
      case 'completed': return 'Concluído';
      default: return status;
    }
  };

  // Formatar data
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Gerar link do WhatsApp
  const generateWhatsAppLink = (request) => {
    const message = encodeURIComponent(
      `Olá ${request.name}! 🍣\n\n` +
      `Sobre sua solicitação de evento:\n` +
      `📅 Data: ${formatDate(request.eventDate)}\n` +
      `🎉 Tipo: ${request.eventType}\n` +
      `👥 Convidados: ${request.guests}\n\n` +
      `Entraremos em contato para confirmar os detalhes.\n\n` +
      `M.V. Sushi Delivery`
    );
    return `https://wa.me/55${request.contact.replace(/\D/g, '')}?text=${message}`;
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await onUpdateStatus(requestId, status, adminNotes);
      setSelectedRequest(null);
      setAdminNotes('');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Carregando solicitações...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Solicitações de Eventos</span>
          </CardTitle>
          <Badge variant="secondary">
            {filteredRequests.length} solicitações
          </Badge>
        </div>
        
        {/* Filtros */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'pending', label: 'Pendentes' },
            { key: 'confirmed', label: 'Confirmadas' },
            { key: 'rejected', label: 'Rejeitadas' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma solicitação encontrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Cabeçalho da solicitação */}
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-lg">{request.name}</h3>
                        <Badge variant={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {request.createdAt?.toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      {/* Detalhes do evento */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Data:</span>
                            <span>{formatDate(request.eventDate)}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-lg">{request.eventTypeIcon}</span>
                            <span className="font-medium">Tipo:</span>
                            <span>{request.eventType}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Convidados:</span>
                            <span>{request.guests}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Contato:</span>
                            <span>{request.contact}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Local:</span>
                            <span>{request.location}</span>
                          </div>
                          
                          {request.budget && (
                            <div className="flex items-center space-x-2 text-sm">
                              <DollarSign className="w-4 h-4 text-orange-500" />
                              <span className="font-medium">Orçamento:</span>
                              <span>{request.budget}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Preferências e observações */}
                      {request.preferences && (
                        <div className="mb-3">
                          <span className="font-medium text-sm">Preferências: </span>
                          <span className="text-sm text-gray-600">{request.preferences}</span>
                        </div>
                      )}
                      
                      {request.observations && (
                        <div className="mb-3">
                          <span className="font-medium text-sm">Observações: </span>
                          <span className="text-sm text-gray-600">{request.observations}</span>
                        </div>
                      )}

                      {/* Notas do admin */}
                      {request.adminNotes && (
                        <div className="p-3 bg-blue-50 rounded-lg mb-3">
                          <span className="font-medium text-sm text-blue-800">Notas do Admin: </span>
                          <span className="text-sm text-blue-700">{request.adminNotes}</span>
                        </div>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex flex-col space-y-2 ml-4">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Aprovar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(request.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Rejeitar
                          </Button>
                        </>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(generateWhatsAppLink(request), '_blank')}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeleteRequest(request.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modal de confirmação */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Confirmar Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Confirmar evento de <strong>{selectedRequest.name}</strong> para{' '}
                  <strong>{formatDate(selectedRequest.eventDate)}</strong>?
                </p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Notas do Admin (opcional):
                  </label>
                  <Input
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Ex: Confirmado para 19h, cardápio especial preparado..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate(selectedRequest.id, 'confirmed')}
                    className="flex-1"
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedRequest(null);
                      setAdminNotes('');
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminEventRequests;