import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter'; // Changed from react-router-dom to wouter
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import {
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Plus,
  Trash2,
  Edit,
  X
} from 'lucide-react';

interface FormData {
  title?: string;
  company?: string;
  duration?: string;
  description?: string;
  achievements?: string[];
  degree?: string;
  university?: string;
  cgpa?: string;
  name?: string;
  level?: number;
  tech?: string[];
}

export default function AdminDashboard() {
  const [location, setLocation] = useLocation(); // Changed to wouter's useLocation
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [activeTab, setActiveTab] = useState('profile');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<'add' | 'edit'>('add');
  const [currentItem, setCurrentItem] = useState<FormData | null>(null);

  const handleLogout = () => {
    setAuthenticated(false);
    toast.success('Logged out successfully');
    setLocation('/admin'); // Changed to use wouter's setLocation
  };

  const openForm = (type: 'add' | 'edit', item?: FormData) => {
    setFormType(type);
    setCurrentItem(item || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${formType === 'add' ? 'Added' : 'Updated'} successfully!`);
    closeForm();
  };

  const handleDelete = (id: number) => {
    toast.success('Deleted successfully!');
  };

  const renderForm = () => {
    return (
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-xl relative"
            >
              <button
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold mb-6 text-white">
                {formType === 'add' ? 'Add New' : 'Edit'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === 'experience' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.title}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.company}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.duration}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'education' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.degree}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.university}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CGPA
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.cgpa}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'skills' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.name}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Proficiency Level (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        defaultValue={currentItem?.level}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'projects' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.title}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue={currentItem?.description}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        defaultValue={currentItem?.tech?.join(', ')}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
                  >
                    {formType === 'add' ? 'Add' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed w-64 h-full bg-gray-800 p-4">
        <div className="flex items-center gap-3 mb-8 p-2">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
            <p className="text-sm text-gray-400">Manage your portfolio</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'experience' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Experience
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'education' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Education
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'skills' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Code className="w-5 h-5" />
            Skills
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Code className="w-5 h-5" />
            Projects
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 w-[calc(100%-2rem)] flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
            </h2>
            {activeTab !== 'profile' && (
              <button
                onClick={() => openForm('add')}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Sambit"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue="Software Development Engineer"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue="Full Stack Developer with expertise in modern web technologies..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item * 0.1 }}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {activeTab === 'experience' && 'Software Engineer'}
                      {activeTab === 'education' && 'Bachelor of Technology'}
                      {activeTab === 'skills' && 'React.js'}
                      {activeTab === 'projects' && 'E-commerce Platform'}
                    </h3>
                    <p className="text-gray-400">
                      {activeTab === 'experience' && 'Tech Company • 2020-Present'}
                      {activeTab === 'education' && 'University Name • 2016-2020'}
                      {activeTab === 'skills' && 'Advanced • 90%'}
                      {activeTab === 'projects' && 'A full-stack e-commerce solution'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openForm('edit', { title: 'Example' })}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {renderForm()}
    </div>
  );
}