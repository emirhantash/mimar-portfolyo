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
  Plus, 
  Edit, 
  Trash2, 
  Mail,
  Linkedin
} from 'lucide-react';
import { getTeamMembers, TeamMember } from '../../src/api';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

export function TeamMembersPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTeamMembers();
        setTeam(data);
      } catch (err) {
        setError('Ekip üyeleri yüklenirken bir hata oluştu.');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);
  
  const handleDeleteTeamMember = (memberId: number) => {
    // Silme işlemi için backend API çağrısı yapılacak
    if (window.confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) {
      console.log('Ekip üyesi silindi:', memberId);
      // API çağrısı ve state güncelleme işlemleri burada yapılacak
    }
  };

  // Filtrele
  const filteredTeam = team
    .filter(member => 
      showActive === null || member.isActive === showActive
    )
    .filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.bio && member.bio.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Ekip Üyeleri</h1>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          Yeni Ekip Üyesi Ekle
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Ekip üyelerinde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="md:w-64">
              <select
                value={showActive === null ? "all" : showActive ? "active" : "inactive"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "all") setShowActive(null);
                  else if (val === "active") setShowActive(true);
                  else setShowActive(false);
                }}
                className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="all">Tümünü Göster</option>
                <option value="active">Sadece Aktif</option>
                <option value="inactive">Sadece İnaktif</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">{error}</div>
          </CardContent>
        </Card>
      ) : (
        <>
          {filteredTeam.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Kriterlere uygun ekip üyesi bulunamadı.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeam.map((member) => (
                <Card key={member.id} className={`overflow-hidden ${!member.isActive ? 'opacity-60' : ''}`}>
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-16 w-16 mr-4">
                          {member.image ? (
                            <AvatarImage src={member.image} alt={member.name} />
                          ) : (
                            <AvatarFallback className="text-lg bg-primary/10 text-primary">
                              {getNameInitials(member.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-medium">{member.name}</h3>
                          <p className="text-gray-500">{member.title}</p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700 hover:border-red-300"
                          onClick={() => handleDeleteTeamMember(member.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    {member.bio && <p className="text-gray-600 mb-4">{member.bio}</p>}
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center text-xs border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50"
                        >
                          <Mail size={14} className="mr-1" />
                          {member.email}
                        </a>
                      )}
                      
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-50"
                        >
                          <Linkedin size={14} className="mr-1" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-gray-500">
                        {new Date(member.updatedAt).toLocaleDateString('tr-TR')} tarihinde güncellendi
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${member.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'}`}
                        >
                          {member.isActive ? 'Aktif' : 'İnaktif'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
