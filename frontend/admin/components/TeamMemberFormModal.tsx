import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Checkbox } from '../../components/ui/checkbox';
import { TeamMember } from '../../src/api';
import { createTeamMember, updateTeamMember, uploadFile } from '../../src/adminApi';
import { toast } from 'sonner';
import { Loader2, Mail, Linkedin } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

interface TeamMemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: TeamMember; // Düzenleme modu için mevcut üye
}

export function TeamMemberFormModal({ isOpen, onClose, onSuccess, member }: TeamMemberFormModalProps) {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    title: '',
    bio: '',
    image: '',
    email: '',
    linkedin: '',
    isActive: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditMode = !!member;
  
  // Eğer düzenleme modundaysa, mevcut ekip üyesi verilerini form verilerine yükle
  useEffect(() => {
    if (isEditMode && member) {
      setFormData({
        name: member.name,
        title: member.title,
        bio: member.bio || '',
        image: member.image || '',
        email: member.email || '',
        linkedin: member.linkedin || '',
        isActive: member.isActive
      });
      
      if (member.image) {
        setImagePreview(member.image);
      }
    }
  }, [isEditMode, member]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        const uploadResult = await uploadFile(imageFile, 'team');
        formData.image = uploadResult.url;
      }
      
      // Form verileri için tüm gerekli alanların doldurulduğundan emin ol
      const requiredFields = ['name', 'title'];
      for (const field of requiredFields) {
        if (!formData[field as keyof Partial<TeamMember>]) {
          throw new Error(`${field} alanı zorunludur`);
        }
      }
      
      // LinkedIn URL formatını kontrol et
      if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
        formData.linkedin = `https://linkedin.com/in/${formData.linkedin.replace(/[^a-zA-Z0-9-]/g, '')}`;
      }
      
      if (isEditMode && member) {
        // Güncelleme modu
        await updateTeamMember(member.id, formData);
        toast.success('Ekip üyesi başarıyla güncellendi');
      } else {
        // Yeni üye oluşturma modu
        await createTeamMember(formData as Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Ekip üyesi başarıyla oluşturuldu');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Team member form error:', err);
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
      bio: '',
      image: '',
      email: '',
      linkedin: '',
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
            {isEditMode ? 'Ekip Üyesini Düzenle' : 'Yeni Ekip Üyesi Ekle'}
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
                placeholder="Örn: Baş Mimar, İç Mimar"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biyografi</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Ekip üyesi hakkında kısa bilgi..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Profil Fotoğrafı</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                placeholder="ornek@mail.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profili</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="pl-10"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
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
