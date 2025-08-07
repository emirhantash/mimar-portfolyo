import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Loader2, 
  Search, 
  Mail, 
  Trash2, 
  Check, 
  RefreshCw,
  MailOpen
} from 'lucide-react';
import { 
  getContactMessages, 
  markMessageAsRead, 
  deleteContactMessage, 
  ContactMessageResponse 
} from '../../src/adminApi';
import { toast } from 'sonner';

export function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageResponse | null>(null);
  
  const fetchMessages = async () => {
    // API'dan mesajları çek
    setLoading(true);
    setError(null);
    
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      setError('Mesajlar yüklenirken bir hata oluştu.');
      console.error('Error fetching messages:', err);
      toast.error('Mesajlar yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Burada API'dan mesajları çekecek fonksiyon yer alacak
    // Şimdilik örnek veriler kullanıyoruz
    fetchMessages();
  }, []);

  const filteredMessages = messages
    .filter(message => !showOnlyUnread || !message.isRead)
    .filter(message => 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const markAsRead = async (id: number) => {
    try {
      // API çağrısı yapılacak
      await markMessageAsRead(id);
      // Başarılı olursa mesajları güncelle
      setMessages(messages.map(message => 
        message.id === id ? {...message, isRead: true} : message
      ));
    } catch (err) {
      console.error('Error marking message as read:', err);
      toast.error('Mesaj okundu olarak işaretlenemedi');
    }
  };
  
  const handleDeleteMessage = async (id: number) => {
    if (window.confirm("Bu mesajı silmek istediğinizden emin misiniz?")) {
      try {
        // API çağrısı yapılacak
        await deleteContactMessage(id);
        // Başarılı olursa mesajları güncelle
        setMessages(messages.filter(message => message.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        toast.success('Mesaj başarıyla silindi');
      } catch (err) {
        console.error('Error deleting message:', err);
        toast.error('Mesaj silinemedi');
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mesajlar</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={fetchMessages}
          title="Mesajları Yenile"
        >
          <RefreshCw size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol bölüm: Mesaj Listesi */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  <Input
                    placeholder="Mesajlarda ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showUnread"
                      checked={showOnlyUnread}
                      onChange={() => setShowOnlyUnread(!showOnlyUnread)}
                      className="mr-2"
                    />
                    <label htmlFor="showUnread" className="text-sm">Sadece okunmamış</label>
                  </div>
                  <div className="text-sm text-gray-500">
                    {messages.filter(m => !m.isRead).length} okunmamış
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-6">Mesaj bulunamadı.</div>
          ) : (
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <Card 
                  key={message.id} 
                  className={`cursor-pointer hover:shadow-md transition ${
                    selectedMessage?.id === message.id ? 'border-primary' : ''
                  } ${!message.isRead ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) markAsRead(message.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center">
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                          )}
                          {message.name}
                        </div>
                        <div className="text-sm text-gray-500">{message.email}</div>
                        <div className="text-sm font-medium mt-1 truncate">
                          {message.subject || 'Konu yok'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2 truncate">
                      {message.message}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Sağ bölüm: Mesaj Detayı */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6 h-full">
              {selectedMessage ? (
                <div className="h-full flex flex-col">
                  {/* Mesaj başlığı */}
                  <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                      <h2 className="text-xl font-medium">
                        {selectedMessage.subject || 'Konu yok'}
                      </h2>
                      <div className="mt-1 text-sm text-gray-600">
                        Gönderen: <span className="font-medium">{selectedMessage.name}</span> ({selectedMessage.email})
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(selectedMessage.createdAt)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedMessage.isRead && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => markAsRead(selectedMessage.id)}
                          title="Okundu Olarak İşaretle"
                        >
                          <Check size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:border-red-300"
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        title="Mesajı Sil"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Mesaj içeriği */}
                  <div className="flex-1 overflow-auto">
                    <p className="whitespace-pre-line">{selectedMessage.message}</p>
                  </div>
                  
                  {/* Alt kısım */}
                  <div className="mt-6 border-t pt-4">
                    <Button>
                      <Mail className="mr-2" size={16} />
                      Yanıtla
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <MailOpen size={48} className="mb-2 opacity-30" />
                  <p>Görüntülemek için bir mesaj seçin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
