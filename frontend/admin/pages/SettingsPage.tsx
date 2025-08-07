import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { AlertCircle, Save, Mail, Key } from 'lucide-react';

export function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Mimar Portfolyo',
    contactEmail: 'iletisim@mimarportfolyo.com',
    aboutShort: 'Modern mimari çözümler sunan profesyonel ekip.'
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // API çağrısı yapılacak
      // await updateGeneralSettings(generalSettings);
      
      // Simülasyon
      await new Promise(r => setTimeout(r, 1000));
      
      setSuccess('Genel ayarlar başarıyla güncellendi.');
    } catch (err) {
      setError('Ayarlar güncellenirken bir hata oluştu.');
      console.error('Settings update error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Yeni şifre ve şifre tekrarı uyuşmuyor.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // API çağrısı yapılacak
      // await updatePassword(passwordForm);
      
      // Simülasyon
      await new Promise(r => setTimeout(r, 1000));
      
      setSuccess('Şifre başarıyla değiştirildi.');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Şifre değiştirilirken bir hata oluştu.');
      console.error('Password update error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ayarlar</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Genel Ayarlar */}
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
            <CardDescription>Site ile ilgili temel bilgileri ayarlayın.</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleGeneralSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Adı</Label>
                <Input
                  id="siteName"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">İletişim E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  <Input
                    id="contactEmail"
                    type="email"
                    className="pl-10"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aboutShort">Kısa Açıklama</Label>
                <Textarea
                  id="aboutShort"
                  rows={3}
                  value={generalSettings.aboutShort}
                  onChange={(e) => setGeneralSettings({...generalSettings, aboutShort: e.target.value})}
                  placeholder="Site hakkında kısa açıklama (SEO için önemli)"
                />
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-6">
              <Button 
                type="submit" 
                disabled={loading} 
                className="ml-auto flex items-center gap-2"
              >
                <Save size={16} />
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Şifre Değiştirme */}
        <Card>
          <CardHeader>
            <CardTitle>Şifre Değiştir</CardTitle>
            <CardDescription>Admin paneli giriş şifrenizi değiştirin.</CardDescription>
          </CardHeader>
          
          <form onSubmit={handlePasswordSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center gap-2">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md">
                  <p>{success}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  <Input
                    id="currentPassword"
                    type="password"
                    className="pl-10"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                />
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-6">
              <Button 
                type="submit" 
                disabled={loading}
                className="ml-auto"
              >
                {loading ? 'Şifre Değiştiriliyor...' : 'Şifre Değiştir'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
