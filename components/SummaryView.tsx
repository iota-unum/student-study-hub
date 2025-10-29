import React, { useState, useEffect } from 'react';
import { Outline } from '../types';

interface SummaryViewProps {
  outline: Outline;
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ outline, selectedNodeId, onNodeSelect }) => {
  const [activeTab, setActiveTab] = useState(0);

  const findTabForNode = (nodeId: string): number => {
    for (let i = 0; i < outline.ideas.length; i++) {
      const idea = outline.ideas[i];
      if (idea.id === nodeId) return i;
      if (idea.sub_ideas) {
        for (const subIdea of idea.sub_ideas) {
          if (subIdea.id === nodeId) return i;
          if (subIdea.nested_sub_ideas) {
            for (const nested of subIdea.nested_sub_ideas) {
              if (nested.id === nodeId) return i;
            }
          }
        }
      }
    }
    return -1;
  };

  useEffect(() => {
    if (!selectedNodeId) return;
    const newTab = findTabForNode(selectedNodeId);
    if (newTab !== -1 && newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [selectedNodeId]);

  useEffect(() => {
    if (!selectedNodeId) return;

    const timer = setTimeout(() => {
        const element = document.getElementById(`summary-node-${selectedNodeId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100); // Small delay for tab content to render before scrolling

    return () => clearTimeout(timer);
  }, [selectedNodeId, activeTab]);


  if (!outline || !outline.ideas || outline.ideas.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 shadow-lg h-full">
        <h2 className="text-2xl font-bold text-white mb-4">Summary</h2>
        <p className="text-slate-400">No summary content available.</p>
      </div>
    );
  }

  const selectedIdea = outline.ideas[activeTab];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg h-full flex flex-col">
      <div className="border-b border-slate-700 px-4 sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10">
        <nav className="-mb-px flex flex-wrap gap-x-6" aria-label="Tabs">
          {outline.ideas.map((idea, index) => (
            <button
              key={idea.id}
              onClick={() => {
                setActiveTab(index);
                onNodeSelect(idea.id);
              }}
              className={`${
                index === activeTab
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none`}
              aria-current={index === activeTab ? 'page' : undefined}
            >
              {idea.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 overflow-y-auto flex-grow">
        {selectedIdea && (
           <div className="space-y-6">
            <h1 
              id={`summary-node-${selectedIdea.id}`}
              onClick={() => onNodeSelect(selectedIdea.id)}
              className={`text-3xl font-bold text-white border-b-2 border-sky-500 pb-2 mb-4 cursor-pointer p-2 rounded-lg transition-colors ${selectedNodeId === selectedIdea.id ? 'bg-sky-900/50' : ''}`}
            >
              {selectedIdea.title}
            </h1>
            {selectedIdea.content && <p className="text-slate-300 leading-relaxed">{selectedIdea.content}</p>}
            
            <div className="space-y-8">
              {selectedIdea.sub_ideas?.map(subIdea => (
                <section 
                  key={subIdea.id} 
                  id={`summary-node-${subIdea.id}`}
                  className={`pt-4 border-t border-slate-700/50 p-4 rounded-lg transition-all duration-300 ${selectedNodeId === subIdea.id ? 'bg-sky-900/50 ring-1 ring-sky-500/50' : ''}`}
                >
                  <h2 
                    onClick={() => onNodeSelect(subIdea.id)}
                    className="text-2xl font-semibold text-sky-400 mb-2 cursor-pointer"
                  >
                    {subIdea.title}
                  </h2>
                  {subIdea.content && <p className="text-slate-300 leading-relaxed mb-4">{subIdea.content}</p>}

                  <div className="space-y-4">
                    {subIdea.nested_sub_ideas?.map(nestedIdea => (
                      <article 
                        key={nestedIdea.id} 
                        id={`summary-node-${nestedIdea.id}`}
                        className={`pl-4 border-l-4  bg-slate-800/40 p-4 rounded-r-lg transition-all duration-300 ${selectedNodeId === nestedIdea.id ? 'border-sky-500 ring-1 ring-sky-500/50' : 'border-slate-600'}`}
                      >
                        <h3 
                          onClick={() => onNodeSelect(nestedIdea.id)}
                          className="text-xl font-medium text-slate-200 cursor-pointer"
                        >
                          {nestedIdea.title}
                        </h3>
                        {nestedIdea.content && <p className="text-slate-400 mt-2 leading-relaxed">{nestedIdea.content}</p>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryView;