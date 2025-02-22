import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useAuthStore } from "../store/authStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import {
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Plus,
  Trash2,
  Edit,
  X,
  Loader2,
  Coffee,
  Folder,
} from "lucide-react";

interface FormData {
  id?: string;
  title?: string;
  company?: string;
  location?: string;
  duration?: string;
  description?: string;
  achievements?: string[];
  degree?: string;
  university?: string;
  cgpa?: string;
  name?: string;
  level?: number;
  category?: string;
  tech?: string[];
  github?: string;
  demo?: string;
  bio?: string;
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [activeTab, setActiveTab] = useState("profile");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [currentItem, setCurrentItem] = useState<FormData | null>(null);

  // Queries
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: api.getProfile,
  });

  const { data: experiences, isLoading: isLoadingExperiences } = useQuery({
    queryKey: ["experiences"],
    queryFn: api.getExperiences,
    enabled: activeTab === "experience",
  });

  const { data: education, isLoading: isLoadingEducation } = useQuery({
    queryKey: ["education"],
    queryFn: api.getEducation,
    enabled: activeTab === "education",
  });

  const { data: skills, isLoading: isLoadingSkills } = useQuery({
    queryKey: ["skills"],
    queryFn: api.getSkills,
    enabled: activeTab === "skills",
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
    enabled: activeTab === "projects",
  });

  // Mutations
  const updateProfile = useMutation({
    mutationFn: api.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const addExperience = useMutation({
    mutationFn: api.addExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience added successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to add experience"),
  });

  const updateExperience = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<typeof currentItem>;
    }) => api.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience updated successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to update experience"),
  });

  const deleteExperience = useMutation({
    mutationFn: api.deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast.success("Experience deleted successfully");
    },
    onError: () => toast.error("Failed to delete experience"),
  });

  const addEducation = useMutation({
    mutationFn: api.addEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education added successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to add education"),
  });

  const updateEducation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<typeof currentItem>;
    }) => api.updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education updated successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to update education"),
  });

  const deleteEducation = useMutation({
    mutationFn: api.deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
      toast.success("Education deleted successfully");
    },
    onError: () => toast.error("Failed to delete education"),
  });

  const addSkill = useMutation({
    mutationFn: api.addSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill added successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to add skill"),
  });

  const updateSkill = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<typeof currentItem>;
    }) => api.updateSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill updated successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to update skill"),
  });

  const deleteSkill = useMutation({
    mutationFn: api.deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill deleted successfully");
    },
    onError: () => toast.error("Failed to delete skill"),
  });

  const addProject = useMutation({
    mutationFn: api.addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project added successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to add project"),
  });

  const updateProject = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<typeof currentItem>;
    }) => api.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
      closeForm();
    },
    onError: () => toast.error("Failed to update project"),
  });

  const deleteProject = useMutation({
    mutationFn: api.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthenticated(false);
      toast.success("Logged out successfully");
      setLocation("/admin");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const openForm = (type: "add" | "edit", item?: FormData) => {
    setFormType(type);
    setCurrentItem(item || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (key === "tech" || key === "achievements") {
        data[key] = (value as string).split(",").map((item) => item.trim());
      } else {
        data[key] = value;
      }
    });

    try {
      if (activeTab === "profile") {
        await updateProfile.mutateAsync(data);
      } else if (activeTab === "experience") {
        if (formType === "add") {
          await addExperience.mutateAsync(data);
        } else if (currentItem?.id) {
          await updateExperience.mutateAsync({ id: currentItem.id, data });
        }
      } else if (activeTab === "education") {
        if (formType === "add") {
          await addEducation.mutateAsync(data);
        } else if (currentItem?.id) {
          await updateEducation.mutateAsync({ id: currentItem.id, data });
        }
      } else if (activeTab === "skills") {
        if (formType === "add") {
          await addSkill.mutateAsync(data);
        } else if (currentItem?.id) {
          await updateSkill.mutateAsync({ id: currentItem.id, data });
        }
      } else if (activeTab === "projects") {
        if (formType === "add") {
          await addProject.mutateAsync(data);
        } else if (currentItem?.id) {
          await updateProject.mutateAsync({ id: currentItem.id, data });
        }
      }

      closeForm();
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (activeTab === "experience") {
        await deleteExperience.mutateAsync(id);
      } else if (activeTab === "education") {
        await deleteEducation.mutateAsync(id);
      } else if (activeTab === "skills") {
        await deleteSkill.mutateAsync(id);
      } else if (activeTab === "projects") {
        await deleteProject.mutateAsync(id);
      }
    } catch (error) {
      toast.error("Failed to delete item");
    }
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
                {formType === "add" ? "Add New" : "Edit"}{" "}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              >
                {activeTab === "experience" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title" // Add this
                        defaultValue={currentItem?.title}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company" // Add this
                        defaultValue={currentItem?.company}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        placeholder="e.g. Jan 2020 - Dec 2021"
                        defaultValue={currentItem?.duration}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location" // Add this
                        defaultValue={currentItem?.location}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="tech"
                        defaultValue={currentItem?.tech?.join(", ")}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description" // Add this
                        defaultValue={currentItem?.description}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Achievements (comma-separated)
                      </label>
                      <textarea
                        rows={4}
                        name="achievements" // Add this
                        defaultValue={currentItem?.achievements?.join(", ")}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {activeTab === "education" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        defaultValue={currentItem?.degree}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        University
                      </label>
                      <input
                        type="text"
                        name="university"
                        defaultValue={currentItem?.university}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        defaultValue={currentItem?.duration}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CGPA
                      </label>
                      <input
                        type="text"
                        name="cgpa"
                        defaultValue={currentItem?.cgpa}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Achievements (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="achievements"
                        defaultValue={currentItem?.achievements?.join(", ")}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                {activeTab === "skills" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={currentItem?.name}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Proficiency Level (%)
                      </label>
                      <input
                        type="number"
                        name="level"
                        min="0"
                        max="100"
                        defaultValue={currentItem?.level}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        defaultValue={currentItem?.category || "language"}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="language">Language</option>
                        <option value="framework">Framework</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === "projects" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={currentItem?.title}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium  text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        defaultValue={currentItem?.description}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="tech"
                        defaultValue={currentItem?.tech?.join(", ")}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GitHub Repository
                      </label>
                      <input
                        type="text"
                        name="github"
                        defaultValue={currentItem?.github}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Demo URL
                      </label>
                      <input
                        type="text"
                        name="demo"
                        defaultValue={currentItem?.demo}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    {formType === "add" ? "Add" : "Save Changes"}
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
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "experience"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Experience
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "education"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Education
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "skills"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Coffee className="w-5 h-5" />
            Skills
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === "projects"
                ? "bg-primary text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Folder className="w-5 h-5" />
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
            {activeTab !== "profile" && (
              <button
                onClick={() => openForm("add")}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>

          {isLoadingProfile ||
          isLoadingExperiences ||
          isLoadingEducation ||
          isLoadingSkills ||
          isLoadingProjects ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "profile" && profile && (
                <form id="profile-form" className="space-y-6">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      defaultValue={profile.full_name}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Title Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title (Separate multiple titles with /)
                    </label>
                    <textarea
                      rows={4}
                      name="title"
                      defaultValue={
                        profile.title ? profile.title.join(" / ") : ""
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* GitHub Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub
                    </label>
                    <input
                      type="text"
                      name="github"
                      defaultValue={profile.github}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* LinkedIn Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      defaultValue={profile.linkedin}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={profile.email}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Save Changes Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const form = document.getElementById(
                        "profile-form"
                      ) as HTMLFormElement;
                      if (form) {
                        const formData = new FormData(form);
                        const data: Record<string, any> = {};

                        formData.forEach((value, key) => {
                          if (key === "title") {
                            // Split the title field by "/" and trim whitespace
                            data[key] = (value as string)
                              .split("/")
                              .map((title) => title.trim());
                          } else {
                            data[key] = value;
                          }
                        });

                        console.log("Data being sent to Supabase:", data); // Debugging
                        updateProfile.mutate(data);
                      } else {
                        console.error("Form not found");
                      }
                    }}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md flex justify-end transition-colors"
                    >
                    Save Changes
                  </button>
                </form>
              )}

              {activeTab !== "profile" && (
                <div className="grid gap-4">
                  {activeTab === "experience" &&
                    experiences?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">{item.tech}</p>
                          <p className="text-gray-400">
                            {item.company} • {item.duration}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "education" &&
                    education?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.degree}
                          </h3>
                          <p className="text-gray-400">
                            {item.university} • {item.cgpa}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "skills" &&
                    skills?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.name}
                          </h3>
                          <p className="text-gray-400">Level: {item.level}%</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                  {activeTab === "projects" &&
                    projects?.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400">{item.description}</p>
                          <div className="flex gap-2 mt-2">
                            {item.tech.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-600 rounded text-sm text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openForm("edit", item)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {renderForm()}
    </div>
  );
}
