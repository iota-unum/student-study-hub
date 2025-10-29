import React, { useState, useCallback } from 'react';
import { Project } from './types';
import { loadProjectsFromFile } from './services/dataService';
import FileUpload from './components/FileUpload';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import { DocumentTextIcon, UploadIcon } from './components/icons';

export default function App() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = useCallback(async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setProjects(null);
    setSelectedProject(null);
    setError(null);
    setFileName(file.name);

    try {
      const data = await loadProjectsFromFile(file);
      setProjects(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Error processing file: ${e.message}`);
      } else {
        setError('An unknown error occurred while processing the file.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleReset = () => {
    setProjects(null);
    setSelectedProject(null);
    setError(null);
    setFileName(null);
  };

  const renderContent = () => {
    if (selectedProject) {
      return <ProjectDetail project={selectedProject} onBack={handleBackToList} />;
    }

    if (projects) {
      return (
        <div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Loaded Projects</h2>
              <p className="text-slate-400">
                Found <span className="font-semibold text-sky-400">{projects.length}</span> project(s) in <span className="font-medium text-slate-300">{fileName}</span>.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <UploadIcon className="w-5 h-5" />
              Upload New File
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard 
                key={`${project.subject}-${index}`} 
                project={project} 
                onSelect={handleProjectSelect}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 shadow-lg">
        <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
        {isLoading && (
            <div className="mt-6 text-center text-sky-400">
                <p>Processing file...</p>
            </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-center">
            <p className="font-semibold">Upload Failed</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
            {!selectedProject && (
                <div className="inline-flex items-center justify-center bg-sky-500/10 text-sky-400 rounded-full p-3 mb-4">
                    <DocumentTextIcon className="w-8 h-8" />
                </div>
            )}
          <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight text-white transition-all ${selectedProject ? 'sm:text-4xl' : ''}`}>
            Student Study Hub
          </h1>
          {!selectedProject && (
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Upload your project JSON file to view and prepare your study materials.
            </p>
          )}
        </header>

        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}