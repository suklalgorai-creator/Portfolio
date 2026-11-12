import { projectsData } from '../data/projectsData';

const STORAGE_KEY = 'suklal_portfolio_projects_v1';
const LISTENERS = new Set();

function loadStoredProjects() {
  if (typeof window === 'undefined') return projectsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return projectsData;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return projectsData;
  } catch {
    return projectsData;
  }
}

function saveProjects(projects) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
  }
  LISTENERS.forEach((fn) => {
    try {
      fn(projects);
    } catch (e) {
      console.error(e);
    }
  });
}

let memoryProjects = loadStoredProjects();

export const projectService = {
  subscribe(callback) {
    LISTENERS.add(callback);
    return () => LISTENERS.delete(callback);
  },

  getAllProjects() {
    return memoryProjects;
  },

  getPublishedProjects() {
    return memoryProjects.filter((p) => p.published === true);
  },

  getFeaturedProjects() {
    return memoryProjects.filter((p) => p.published === true && p.featured === true);
  },

  getProjectById(id) {
    return memoryProjects.find((p) => p.id === id);
  },

  togglePublish(id) {
    memoryProjects = memoryProjects.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    saveProjects(memoryProjects);
    return memoryProjects.find((p) => p.id === id);
  },

  toggleFeatured(id) {
    memoryProjects = memoryProjects.map((p) =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    saveProjects(memoryProjects);
    return memoryProjects.find((p) => p.id === id);
  },

  createProject(newProject) {
    const id = newProject.id || newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const project = {
      ...newProject,
      id,
      published: newProject.published ?? true,
      featured: newProject.featured ?? false,
      highlights: newProject.highlights || [],
      techStack: newProject.techStack || [],
      screenshots: newProject.screenshots || []
    };
    memoryProjects = [project, ...memoryProjects];
    saveProjects(memoryProjects);
    return project;
  },

  updateProject(id, updates) {
    memoryProjects = memoryProjects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveProjects(memoryProjects);
    return memoryProjects.find((p) => p.id === id);
  },

  deleteProject(id) {
    memoryProjects = memoryProjects.filter((p) => p.id !== id);
    saveProjects(memoryProjects);
  },

  resetToDefaults() {
    memoryProjects = projectsData;
    saveProjects(memoryProjects);
    return memoryProjects;
  }
};
