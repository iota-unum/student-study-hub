import React, { useState } from 'react';
import { Outline, MainIdea, SubIdea, NestedSubIdea } from '../types';
import { ChevronDownIcon, ChevronRightIcon } from './icons';

interface MindMapProps {
  outline: Outline;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

const NodeWrapper: React.FC<{
  id: string;
  title: string;
  level: 1 | 2 | 3;
  isSelected: boolean;
  hasChildren: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
  onSelect: (id: string) => void;
}> = ({ id, title, level, isSelected, hasChildren, isOpen, toggleOpen, onSelect }) => {
  
  const titleClasses = {
    1: `text-lg font-semibold ${isSelected ? 'text-sky-300' : 'text-sky-400 group-hover:text-sky-300'}`,
    2: `text-base font-medium ${isSelected ? 'text-slate-100' : 'text-slate-200 group-hover:text-slate-100'}`,
    3: `text-sm font-normal ${isSelected ? 'text-slate-200' : 'text-slate-300 group-hover:text-slate-200'}`,
  };

  return (
    <div className={`flex items-center group rounded-md transition-colors ${isSelected ? 'bg-sky-900/50' : 'hover:bg-slate-800'}`}>
      <div 
        className="flex-grow flex items-center cursor-pointer p-1"
        onClick={() => onSelect(id)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onSelect(id)}
      >
        <span 
          onClick={(e) => { e.stopPropagation(); if(hasChildren) toggleOpen(); }} 
          className="p-1 -ml-1 mr-1 rounded-full hover:bg-slate-700/50"
          aria-hidden="true"
        >
          {hasChildren ? (
            isOpen ? <ChevronDownIcon className="w-5 h-5 text-slate-500" /> : <ChevronRightIcon className="w-5 h-5 text-slate-500" />
          ) : (
            <span className="w-5 h-5"></span> // Placeholder for alignment
          )}
        </span>
        <span className={titleClasses[level]}>{title}</span>
      </div>
    </div>
  )
}


const MindMap: React.FC<MindMapProps> = ({ outline, selectedNodeId, onNodeSelect }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">{outline.subject}</h2>
      <div className="space-y-1">
        {outline.ideas.map((idea) => (
          <MainIdeaNode key={idea.id} idea={idea} selectedNodeId={selectedNodeId} onNodeSelect={onNodeSelect} />
        ))}
      </div>
    </div>
  );
};

const MainIdeaNode: React.FC<{ idea: MainIdea, selectedNodeId: string | null, onNodeSelect: (id: string) => void; }> = ({ idea, selectedNodeId, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = !!idea.sub_ideas && idea.sub_ideas.length > 0;

  return (
    <div className="pl-0">
      <NodeWrapper 
        id={idea.id}
        title={idea.title}
        level={1}
        isSelected={idea.id === selectedNodeId}
        hasChildren={hasChildren}
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
        onSelect={onNodeSelect}
      />
      {isOpen && hasChildren && (
        <div className="mt-2 pl-7 space-y-1 border-l-2 border-slate-700 ml-3">
          {idea.sub_ideas.map((subIdea) => (
            <SubIdeaNode key={subIdea.id} subIdea={subIdea} selectedNodeId={selectedNodeId} onNodeSelect={onNodeSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const SubIdeaNode: React.FC<{ subIdea: SubIdea, selectedNodeId: string | null, onNodeSelect: (id: string) => void; }> = ({ subIdea, selectedNodeId, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = !!subIdea.nested_sub_ideas && subIdea.nested_sub_ideas.length > 0;

  return (
    <div className="pl-0">
      <NodeWrapper 
        id={subIdea.id}
        title={subIdea.title}
        level={2}
        isSelected={subIdea.id === selectedNodeId}
        hasChildren={hasChildren}
        isOpen={isOpen}
        toggleOpen={() => setIsOpen(!isOpen)}
        onSelect={onNodeSelect}
      />
      {isOpen && hasChildren && (
        <div className="mt-2 pl-7 space-y-1 border-l-2 border-slate-700 ml-3">
          {subIdea.nested_sub_ideas.map((nested) => (
            <NestedSubIdeaNode key={nested.id} nestedIdea={nested} selectedNodeId={selectedNodeId} onNodeSelect={onNodeSelect} />
          ))}
        </div>
      )}
    </div>
  );
};


const NestedSubIdeaNode: React.FC<{ nestedIdea: NestedSubIdea, selectedNodeId: string | null, onNodeSelect: (id: string) => void; }> = ({ nestedIdea, selectedNodeId, onNodeSelect }) => {
    return (
      <div className="pl-0">
        <NodeWrapper 
          id={nestedIdea.id}
          title={nestedIdea.title}
          level={3}
          isSelected={nestedIdea.id === selectedNodeId}
          hasChildren={false}
          isOpen={false}
          toggleOpen={() => {}}
          onSelect={onNodeSelect}
        />
      </div>
    );
  };

export default MindMap;