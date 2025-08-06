import { useState, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Loader2, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { sendContactForm, ContactFormData } from '../../src/api';
import ReCAPTCHA from 'react-google-recaptcha';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    value: '+90 212 XXX XX XX',
    description: 'Pazartesi - Cuma, 09:00 - 18:00'
  },
  {
    icon: Mail,
    title: 'E-posta',
    value: 'info@mimaradiniz.com',
    description: '24 saat içinde yanıt veriyoruz'
  },
  {
    icon: MapPin,
    title: 'Adres',
    value: 'Beşiktaş, İstanbul',
    description: 'Ofisimizi ziyaret edebilirsiniz'
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    value: 'Pazartesi - Cuma',
    description: '09:00 - 18:00'
  }
];

export function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    // Ad ve soyad alanlarını birleştir
    if (id === 'firstName' || id === 'lastName') {
      const firstName = id === 'firstName' ? value : formData.name.split(' ')[0] || '';
      const lastName = id === 'lastName' ? value : formData.name.split(' ')[1] || '';
      setFormData({ ...formData, name: `${firstName} ${lastName}`.trim() });
    } 
    // Telefon numarasını ayrı tut (API'de yok ama bilgi için saklayalım)
    else if (id === 'phone') {
      setPhone(value);
    }
    // Proje türünü subject olarak kaydet
    else if (id === 'project') {
      setFormData({ ...formData, subject: value });
    }
    // Diğer alanları direkt kaydet
    else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
    setCaptchaError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // CAPTCHA kontrolü
    if (!captchaValue) {
      setCaptchaError(true);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setCaptchaError(false);
      
      // API'ye form verilerini gönder
      await sendContactForm({
        ...formData,
        // Gerçek bir API entegrasyonunda captcha token'ını da gönderebilirsiniz
        // captchaToken: captchaValue
      });
      
      // Başarılı cevap
      setSuccess(true);
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setPhone('');
      setCaptchaValue(null);
      
      // ReCAPTCHA'yı sıfırla
      recaptchaRef.current?.reset();
      
      // 5 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mesajınız gönderilirken bir hata oluştu.');
      console.error('Form gönderme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-primary mb-6">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Projeleriniz hakkında konuşmak için bizimle iletişime geçin. Size en uygun çözümü birlikte bulalım.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl text-primary mb-6">Bize Yazın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Başarı mesajı */}
                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center gap-2">
                    <CheckCircle size={20} />
                    <p>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                  </div>
                )}
                
                {/* Hata mesajı */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input 
                      id="firstName" 
                      value={formData.name.split(' ')[0] || ''}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input 
                      id="lastName" 
                      value={formData.name.split(' ')[1] || ''}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Proje Türü</Label>
                  <select 
                    id="project" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="">Seçiniz</option>
                    <option value="konut">Konut</option>
                    <option value="ticari">Ticari</option>
                    <option value="ic-mimarlik">İç Mimarlık</option>
                    <option value="danismanlik">Danışmanlık</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea 
                    id="message" 
                    rows={6} 
                    placeholder="Projeniz hakkında detaylar..."
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                {/* reCAPTCHA */}
                <div className="mt-6">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                  {captchaError && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Lütfen robot olmadığınızı doğrulayın.
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : 'Mesaj Gönder'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl text-primary mb-6">İletişim Bilgileri</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-lg flex-shrink-0">
                            <IconComponent size={20} />
                          </div>
                          <div>
                            <h3 className="text-lg text-primary mb-1">{info.title}</h3>
                            <p className="text-gray-900 mb-1">{info.value}</p>
                            <p className="text-sm text-gray-600">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sosyal Medya */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg text-primary mb-4">Sosyal Medya</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Harita */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg text-primary mb-4">Ofis Konumu</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.26465221934!2d28.982529626521377!3d41.042952940173395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a2a2c1b983%3A0x5f10981687114ee8!2zQmXFn2lrdGHFnywgxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1659702115892!5m2!1str!2str"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ofis Konumumuz"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}