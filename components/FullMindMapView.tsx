import React, { useEffect, useRef, useMemo } from 'react';
import { Outline, MainIdea, SubIdea, NestedSubIdea } from '../types';

// G6 is loaded from a script tag in index.html, so we declare it globally for TypeScript
declare const G6: any;

interface FullMindMapViewProps {
  outline: Outline;
}

// Helper to get node styles based on tree depth
const getStylesForDepth = (depth: number) => {
  let style = {};
  let labelStyle = {};
  switch (depth) {
    case 0: // Root node (Subject)
      style = { fill: '#0ea5e9', stroke: '#0284c7', radius: 5 };
      labelStyle = { fill: '#ffffff', fontWeight: 'bold', fontSize: 16 };
      break;
    case 1: // Main Ideas
      style = { fill: '#38bdf8', stroke: '#0ea5e9', radius: 5 };
      labelStyle = { fill: '#0f172a', fontSize: 14, fontWeight: '500' };
      break;
    case 2: // Sub Ideas
      style = { fill: '#334155', stroke: '#475569', radius: 5 };
      labelStyle = { fill: '#f1f5f9', fontSize: 14, fontWeight: '500' };
      break;
    default: // Nested Sub Ideas (depth is 3)
      style = { fill: '#475569', stroke: '#64748b', radius: 5 };
      labelStyle = { fill: '#cbd5e1', fontSize: 14, fontWeight: '500' };
      break;
  }
  return { style, labelCfg: { style: labelStyle } };
};

// Transforms the outline data into a hierarchical structure with styles embedded, suitable for G6
const transformDataToG6Tree = (outline: Outline) => {
  const root = {
    id: 'root-subject',
    label: outline.subject,
    ...getStylesForDepth(0),
    children: outline.ideas.map((idea: MainIdea) => ({
      id: idea.id,
      label: idea.title,
      ...getStylesForDepth(1),
      children: idea.sub_ideas?.map((subIdea: SubIdea) => ({
        id: subIdea.id,
        label: subIdea.title,
        ...getStylesForDepth(2),
        children: subIdea.nested_sub_ideas?.map((nested: NestedSubIdea) => ({
          id: nested.id,
          label: nested.title,
          ...getStylesForDepth(3),
        })) || [],
      })) || [],
    })),
  };
  return root;
};

const FullMindMapView: React.FC<FullMindMapViewProps> = ({ outline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  const graphData = useMemo(() => transformDataToG6Tree(outline), [outline]);

  useEffect(() => {
    if (typeof G6 === 'undefined' || !G6.Graph) {
      console.error("G6 library not loaded properly.");
      return;
    }

    if (!containerRef.current) return;

    // Destroy existing graph instance before creating a new one
    if (graphRef.current) {
      graphRef.current.destroy();
    }

    const graph = new G6.Graph({
      container: containerRef.current,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      data: graphData, // Correct G6 v5 way to load data
      autoFit: 'view',
      plugins: [
        new G6.Tooltip({
          formatText: (model: any) => model.label,
          offset: 10,
        }),
      ],
      behaviors: [
        'drag-canvas',
        'zoom-canvas',
        'collapse-expand',
      ],
      node: {
        type: 'rect',
        style: {
          width: 160,
          height: 45,
          radius: 4,
        },
        anchorPoints: [[0, 0.5], [1, 0.5]],
      },
      edge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#64748b', // slate-500
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getSide: () => 'right',
        getHGap: () => 60,
        getVGap: () => 20,
      },
    });
      
    graph.render();

    graphRef.current = graph;

    const handleResize = () => {
      const graphInstance = graphRef.current;
      if (!graphInstance || graphInstance.destroyed) return;
      if (!containerRef.current) return;
      graphInstance.changeSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      graphInstance.fitView();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
    };
  }, [graphData]); // Re-run effect if data changes

  return (
    <div className="w-full h-[75vh] bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
      <div ref={containerRef} className="w-full h-full bg-slate-900" />
    </div>
  );
};

export default FullMindMapView;
