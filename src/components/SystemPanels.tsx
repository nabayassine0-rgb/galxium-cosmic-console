import { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, BookOpen, Cpu, Shield, Zap, Database, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface PanelSection {
  id: string;
  title: string;
  icon: any;
  isOpen: boolean;
  content: any;
}

export const SystemPanels = () => {
  const [panels, setPanels] = useState<PanelSection[]>([
    {
      id: 'memory',
      title: 'Neural Core',
      icon: Brain,
      isOpen: true,
      content: {
        totalMemory: '2.4 PB',
        usedMemory: '1.8 PB',
        memoryEfficiency: 87,
        activeThreads: 15847,
        lastUpdate: 'Real-time'
      }
    },
    {
      id: 'missions',
      title: 'Mission Archive',
      icon: BookOpen,
      isOpen: false,
      content: {
        activeMissions: 3,
        completedMissions: 1247,
        lastMission: 'Deep Space Analysis',
        successRate: '98.7%'
      }
    },
    {
      id: 'modules',
      title: 'AI Modules',
      icon: Cpu,
      isOpen: false,
      content: {
        installedModules: 12,
        activeModules: 8,
        modules: [
          { name: 'Quantum Analytics', status: 'active', load: 45 },
          { name: 'Deep Learning Core', status: 'active', load: 72 },
          { name: 'Predictive Engine', status: 'active', load: 23 },
          { name: 'Language Processor', status: 'active', load: 89 },
        ]
      }
    }
  ]);

  const togglePanel = (panelId: string) => {
    setPanels(prev => prev.map(panel => 
      panel.id === panelId 
        ? { ...panel, isOpen: !panel.isOpen }
        : panel
    ));
  };

  const renderMemoryContent = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="text-xs text-muted-foreground mb-2 font-light">Total Capacity</p>
          <p className="font-space text-xl font-bold text-cosmic">{content.totalMemory}</p>
        </div>
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="text-xs text-muted-foreground mb-2 font-light">In Use</p>
          <p className="font-space text-xl font-bold text-accent">{content.usedMemory}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-light">Neural Efficiency</span>
          <span className="text-cosmic font-semibold">{content.memoryEfficiency}%</span>
        </div>
        <div className="progress-cosmic h-3 rounded-full">
          <div 
            className="progress-fill"
            style={{ width: `${content.memoryEfficiency}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-light">Active Threads:</span>
            <span className="text-accent font-semibold">{content.activeThreads.toLocaleString()}</span>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground font-light">Status:</span>
            <span className="status-active font-semibold">{content.lastUpdate}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMissionContent = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="font-space text-3xl font-bold text-accent mb-1">{content.activeMissions}</p>
          <p className="text-xs text-muted-foreground font-light">Active</p>
        </div>
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="font-space text-3xl font-bold text-cosmic mb-1">{content.completedMissions}</p>
          <p className="text-xs text-muted-foreground font-light">Completed</p>
        </div>
      </div>
      
      <div className="glass-panel p-5 rounded-xl hover-lift stardust-shimmer">
        <p className="text-xs text-muted-foreground mb-2 font-light">Latest Mission</p>
        <p className="text-base text-cosmic font-semibold mb-3">{content.lastMission}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Success Rate:</span>
          <span className="text-accent font-semibold">{content.successRate}</span>
        </div>
      </div>
    </div>
  );

  const renderModulesContent = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="font-space text-2xl font-bold text-cosmic mb-1">{content.activeModules}</p>
          <p className="text-xs text-muted-foreground font-light">Active</p>
        </div>
        <div className="glass-panel p-4 rounded-xl text-center hover-lift">
          <p className="font-space text-2xl font-bold text-accent mb-1">{content.installedModules}</p>
          <p className="text-xs text-muted-foreground font-light">Total</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {content.modules.map((module: any, index: number) => (
          <div key={index} className="glass-panel p-4 rounded-xl hover-lift">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-foreground">{module.name}</span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                module.status === 'active' 
                  ? 'status-active galaxy-gradient text-white' 
                  : 'text-muted-foreground bg-muted/20'
              }`}>
                {module.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="progress-cosmic h-2 flex-1 rounded-full">
                <div 
                  className="progress-fill"
                  style={{ width: `${module.load}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium w-10 text-right">{module.load}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = (panel: PanelSection) => {
    switch (panel.id) {
      case 'memory':
        return renderMemoryContent(panel.content);
      case 'missions':
        return renderMissionContent(panel.content);
      case 'modules':
        return renderModulesContent(panel.content);
      default:
        return <div className="text-muted-foreground">No data available</div>;
    }
  };

  return (
    <div className="space-y-4">
      {panels.map((panel) => {
        const Icon = panel.icon;
        
        return (
          <div key={panel.id} className="glass-panel hover-lift overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => togglePanel(panel.id)}
              className="w-full justify-between p-6 h-auto text-left hover:bg-white/5 rounded-none"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 galaxy-gradient rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-space text-lg font-semibold text-cosmic">{panel.title}</span>
              </div>
              {panel.isOpen ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>
            
            {panel.isOpen && (
              <div className="px-6 pb-6 border-t border-white/10">
                <div className="pt-6">
                  {renderContent(panel)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};