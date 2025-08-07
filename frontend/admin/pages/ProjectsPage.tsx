import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Loader2, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { getProjects, Project } from '../../src/api';
import { ProjectFormModal } from '../components/ProjectFormModal';
import { deleteProject } from '../../src/adminApi';
import { toast } from 'sonner';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Projeler yüklenirken bir hata oluştu.');
      console.error('Error fetching projects:', err);
      toast.error('Projeler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);

  // Benzersiz kategorileri bul
  const categories = ['Tümü', ...Array.from(new Set(projects.map(p => p.category)))];
  
  // Projeleri filtrele
  const filteredProjects = projects
    .filter(project => selectedCategory === 'Tümü' || project.category === selectedCategory)
    .filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const handleAddProject = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };
  
  const handleDeleteProject = async (projectId: number) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      try {
        await deleteProject(projectId);
        toast.success('Proje başarıyla silindi');
        // Projeleri yeniden yükle
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        toast.error('Proje silinirken bir hata oluştu');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="admin-page-title">Projeler</h1>
        <Button 
          className="admin-primary-button" 
          onClick={handleAddProject}
        >
          <Plus size={18} />
          Yeni Proje Ekle
        </Button>
      </div>
      
      <div className="admin-card mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Projelerde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-input pl-10"
              />
            </div>
            
            <div className="md:w-64">
              <Label htmlFor="category" className="sr-only">Kategori</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="admin-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="admin-card">
          <div className="p-6">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      ) : (
        <>
          {filteredProjects.length === 0 ? (
            <div className="admin-card">
              <div className="p-6 text-center text-gray-500">
                Kriterlere uygun proje bulunamadı.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="admin-card overflow-hidden">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-3 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-medium">{project.title}</h3>
                          <div className="text-sm text-gray-500 mb-2">
                            {project.location} • {project.year}
                          </div>
                          <div className="text-xs inline-block bg-gray-100 px-2 py-1 rounded-full mb-3">
                            {project.category}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="admin-outline-button"
                            onClick={() => handleEditProject(project)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="admin-delete-button"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {new Date(project.updatedAt).toLocaleDateString('tr-TR')} tarihinde güncellendi
                        </div>
                        <div>
                          <span className={`text-xs ${project.isFeatured ? 'text-green-600' : 'text-gray-500'}`}>
                            {project.isFeatured ? 'Öne Çıkarılan' : 'Standart'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Proje oluşturma/düzenleme modal */}
      <ProjectFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
