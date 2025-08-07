import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Service } from '../../src/api';
import { createService, updateService } from '../../src/adminApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service?: Service; // Düzenleme modu için mevcut service
}

export function ServiceFormModal({ isOpen, onClose, onSuccess, service }: ServiceFormModalProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Wrench',
    isActive: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!service;
  
  // Kullanılabilir ikonlar
  const availableIcons = [
    { value: 'Wrench', label: 'Anahtar (Wrench)' },
    { value: 'Paintbrush', label: 'Fırça (Paintbrush)' },
    { value: 'HardHat', label: 'Kask (HardHat)' },
    { value: 'Home', label: 'Ev (Home)' },
    { value: 'PencilRuler', label: 'Kalem Cetvel (PencilRuler)' },
    { value: 'Building', label: 'Bina (Building)' }
  ];
  
  // Eğer düzenleme modundaysa, mevcut service verilerini form verilerine yükle
  useEffect(() => {
    if (isEditMode && service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || 'Wrench',
        isActive: service.isActive
      });
    }
  }, [isEditMode, service]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleIconChange = (value: string) => {
    setFormData(prev => ({ ...prev, icon: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Form verileri için tüm gerekli alanların doldurulduğundan emin ol
      const requiredFields = ['title', 'description'];
      for (const field of requiredFields) {
        if (!formData[field as keyof Partial<Service>]) {
          throw new Error(`${field} alanı zorunludur`);
        }
      }
      
      if (isEditMode && service) {
        // Güncelleme modu
        await updateService(service.id, formData);
        toast.success('Hizmet başarıyla güncellendi');
      } else {
        // Yeni service oluşturma modu
        await createService(formData as Omit<Service, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Hizmet başarıyla oluşturuldu');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Service form error:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      toast.error(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Wrench',
      isActive: true
    });
    setError(null);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        if (!isEditMode) resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Hizmet Adı *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Örn: Mimari Tasarım"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Hizmet hakkında detaylı açıklama..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="icon">İkon</Label>
            <Select 
              value={formData.icon} 
              onValueChange={handleIconChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="İkon seçin" />
              </SelectTrigger>
              <SelectContent>
                {availableIcons.map(icon => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="isActive">Aktif (Sitede Gösterilsin)</Label>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                </>
              ) : (
                isEditMode ? 'Güncelle' : 'Oluştur'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
