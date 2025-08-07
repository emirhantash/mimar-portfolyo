import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { Project } from '../../src/api';
import { createProject, updateProject, uploadFile } from '../../src/adminApi';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: Project; // Düzenleme modu için mevcut proje
}

export function ProjectFormModal({ isOpen, onClose, onSuccess, project }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    location: '',
    year: new Date().getFullYear().toString(),
    category: '',
    image: '',
    isFeatured: false
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!project;
  
  // Eğer düzenleme modundaysa, mevcut proje verilerini form verilerine yükle
  useEffect(() => {
    if (isEditMode && project) {
      setFormData({
        title: project.title,
        description: project.description,
        location: project.location,
        year: project.year,
        category: project.category,
        image: project.image,
        isFeatured: project.isFeatured
      });
      
      setImagePreview(project.image);
    }
  }, [isEditMode, project]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isFeatured: checked }));
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
      // Önce resim yükleme işlemi
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile, 'project');
        formData.image = uploadResult.url;
      }
      
      // Form verileri için tüm gerekli alanların doldurulduğundan emin ol
      const requiredFields = ['title', 'description', 'category', 'location', 'year', 'image'];
      for (const field of requiredFields) {
        if (!formData[field as keyof Partial<Project>]) {
          throw new Error(`${field} alanı zorunludur`);
        }
      }
      
      if (isEditMode && project) {
        // Güncelleme modu
        await updateProject(project.id, formData);
        toast.success('Proje başarıyla güncellendi');
      } else {
        // Yeni proje oluşturma modu
        await createProject(formData as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Proje başarıyla oluşturuldu');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Project form error:', err);
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
      location: '',
      year: new Date().getFullYear().toString(),
      category: '',
      image: '',
      isFeatured: false
    });
    setImageFile(null);
    setImagePreview('');
    setError(null);
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
            {isEditMode ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
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
              <Label htmlFor="title">Proje Adı *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="admin-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="Örn: Konut, Ofis, Peyzaj"
                className="admin-input"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Konum *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Örn: İstanbul, Beykoz"
                className="admin-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Yıl *</Label>
              <Input
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                placeholder="Örn: 2025"
                className="admin-input"
              />
            </div>
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
              className="admin-textarea"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Proje Görseli *</Label>
            <Input
              id="image"
              name="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="admin-input mb-2"
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Proje önizleme" 
                  className="h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={handleCheckboxChange}
              className="admin-checkbox"
            />
            <Label htmlFor="isFeatured">Öne Çıkan Proje</Label>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
              className="admin-outline-button"
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="admin-primary-button"
            >
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
