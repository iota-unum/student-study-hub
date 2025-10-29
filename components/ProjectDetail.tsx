import React, { useMemo, useState } from 'react';
import { Project, Outline } from '../types';
import MindMap from './MindMap';
import SummaryView from './SummaryView';
import { BackIcon, DocumentTextIcon, ShareIcon, SparklesIcon, PuzzlePieceIcon } from './icons';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

type ViewMode = 'summary' | 'mindmap' | 'flashcards' | 'quiz';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeView, setActiveView] = useState<ViewMode>('summary');

  const studyMaterialOutline = useMemo(() => {
    if (project.studyMaterialsJson) {
      try {
        return JSON.parse(project.studyMaterialsJson) as Outline;
      } catch (e) {
        console.error("Failed to parse study materials JSON:", e);
        return null;
      }
    }
    return null;
  }, [project.studyMaterialsJson]);
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(
    studyMaterialOutline?.ideas[0]?.id || null
  );

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };
  
  const renderActiveView = () => {
    if (!studyMaterialOutline) {
        return (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center mt-4">
                <p className="text-slate-400">No study materials available for this project.</p>
            </div>
        );
    }

    switch (activeView) {
      case 'summary':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-6">
            <div className="lg:col-span-1 sticky top-8">
              <MindMap 
                  outline={studyMaterialOutline}
                  selectedNodeId={selectedNodeId}
                  onNodeSelect={handleNodeSelect}
              />
            </div>
            <div className="lg:col-span-3">
              <SummaryView 
                  outline={studyMaterialOutline} 
                  selectedNodeId={selectedNodeId}
                  onNodeSelect={handleNodeSelect}
              />
            </div>
          </div>
        );
      case 'mindmap':
      case 'flashcards':
      case 'quiz':
        return (
            <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center h-96 flex items-center justify-center">
                <p className="text-slate-400 text-lg">
                    The '{activeView}' view is coming soon!
                </p>
            </div>
        )
      default:
        return null;
    }
  };


  return (
    <div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-4 z-20 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="flex-shrink-0 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700"
                    aria-label="Back to projects"
                >
                    <BackIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-white truncate">{project.subject}</h2>
            </div>
            <nav className="flex items-center gap-2 p-1 bg-slate-700/50 rounded-lg">
                <NavButton 
                    icon={DocumentTextIcon} 
                    label="Summary" 
                    isActive={activeView === 'summary'} 
                    onClick={() => setActiveView('summary')}
                />
                <NavButton 
                    icon={ShareIcon} 
                    label="Mind Map" 
                    isActive={activeView === 'mindmap'} 
                    onClick={() => setActiveView('mindmap')}
                />
                <NavButton 
                    icon={SparklesIcon} 
                    label="Flashcards" 
                    isActive={activeView === 'flashcards'} 
                    onClick={() => {}}
                    disabled
                />
                <NavButton 
                    icon={PuzzlePieceIcon} 
                    label="Quiz" 
                    isActive={activeView === 'quiz'} 
                    onClick={() => {}}
                    disabled
                />
            </nav>
        </div>

        {renderActiveView()}
    </div>
  );
};

interface NavButtonProps {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, isActive, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                isActive 
                    ? 'bg-sky-500/20 text-sky-400' 
                    : disabled 
                        ? 'text-slate-500 cursor-not-allowed'
                        : 'text-slate-300 hover:bg-slate-700'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    )
}

export default ProjectDetail;