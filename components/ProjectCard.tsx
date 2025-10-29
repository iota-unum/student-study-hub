import React from 'react';
import { Project } from '../types';
import { CalendarIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <button 
      onClick={() => onSelect(project)}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg hover:border-sky-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-left w-full"
    >
        <h3 className="text-xl font-bold text-white mb-2 flex-grow">
            {project.subject}
        </h3>
        <div className="flex items-center text-sm text-slate-400 mt-4">
            <CalendarIcon className="w-4 h-4 mr-2 text-slate-500" />
            <span>Created on {formatDate(project.createdAt)}</span>
        </div>
    </button>
  );
};

export default ProjectCard;
