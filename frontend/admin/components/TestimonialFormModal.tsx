import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Testimonial } from '../../src/api';
import { createTestimonial, updateTestimonial, uploadFile } from '../../src/adminApi';
import { toast } from 'sonner';
import { Loader2, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  testimonial?: Testimonial; // Düzenleme modu için mevcut testimonial
}

export function TestimonialFormModal({ isOpen, onClose, onSuccess, testimonial }: TestimonialFormModalProps) {
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    title: '',
    content: '',
    rating: 5,
    image: '',
    isActive: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!testimonial;
  
  // Eğer düzenleme modundaysa, mevcut testimonial verilerini form verilerine yükle
  useEffect(() => {
    if (isEditMode && testimonial) {
      setFormData({
        name: testimonial.name,
        title: testimonial.title,
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image || '',
        isActive: testimonial.isActive
      });
      
      if (testimonial.image) {
        setImagePreview(testimonial.image);
      }
    }
  }, [isEditMode, testimonial]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isActive: checked }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Yalnızca görüntü dosyalarını kabul et
    if (!file.type.startsWith('image/')) {
      toast.error('Lütfen geçerli bir görüntü dosyası seçin');
      return;
    }
    
    setImageFile(file);
    
    // Önizleme için dosyayı oku
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Önce resim yükleme işlemi (eğer yeni bir resim varsa)
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile, 'testimonial');
        formData.image = uploadResult.url;
      }
      
      // Form verileri için tüm gerekli alanların doldurulduğundan emin ol
      const requiredFields = ['name', 'title', 'content', 'rating'];
      for (const field of requiredFields) {
        if (!formData[field as keyof Partial<Testimonial>]) {
          throw new Error(`${field} alanı zorunludur`);
        }
      }
      
      if (isEditMode && testimonial) {
        // Güncelleme modu
        await updateTestimonial(testimonial.id, formData);
        toast.success('Referans başarıyla güncellendi');
      } else {
        // Yeni testimonial oluşturma modu
        await createTestimonial(formData as Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Referans başarıyla oluşturuldu');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Testimonial form error:', err);
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      toast.error(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      content: '',
      rating: 5,
      image: '',
      isActive: true
    });
    setImageFile(null);
    setImagePreview('');
    setError(null);
  };
  
  // İsim baş harflerini döndür
  const getNameInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        if (!isEditMode) resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Referansı Düzenle' : 'Yeni Referans Ekle'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">İsim Soyisim *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Ünvan / Pozisyon *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Örn: CEO, Mimar, Müşteri"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Referans Metni *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Müşterinin görüşü..."
            />
          </div>
          
          <div className="space-y-2">
            <Label>Değerlendirme *</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (formData.rating || 0) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {formData.rating}/5
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Profil Fotoğrafı (İsteğe Bağlı)</Label>
            <Input
              id="image"
              name="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {imagePreview ? (
              <div className="mt-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={imagePreview} alt={formData.name} />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {formData.name ? getNameInitials(formData.name) : 'XX'}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : formData.name ? (
              <div className="mt-2">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {getNameInitials(formData.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : null}
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
