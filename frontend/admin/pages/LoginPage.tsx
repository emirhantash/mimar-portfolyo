import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { AlertCircle } from 'lucide-react';
import { login } from '../../src/api';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      navigate('/admin'); // Başarılı girişten sonra admin panel ana sayfasına yönlendir
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Lütfen giriş yapın</p>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center gap-2">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <a 
                href="/"
                className="text-sm text-primary hover:underline"
              >
                Ana Sayfaya Dön
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
