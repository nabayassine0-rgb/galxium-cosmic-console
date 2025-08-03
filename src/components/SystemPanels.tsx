import { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, BookOpen, Cpu, Shield, Zap, Database } from 'lucide-react';
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
      title: 'Memory Core',
      icon: Brain,
      isOpen: true,
      content: {
        totalMemory: '2.4 PB',
        usedMemory: '1.8 PB',
        memoryEfficiency: 87,
        activeThreads: 15847,
        lastUpdate: '2 minutes ago'
      }
    },
    {
      id: 'missions',
      title: 'Mission Logs',
      icon: BookOpen,
      isOpen: false,
      content: {
        activeMissions: 3,
        completedMissions: 1247,
        lastMission: 'Deep Space Reconnaissance',
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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="cosmic-panel p-3 rounded">
          <p className="text-xs text-muted-foreground">Total Capacity</p>
          <p className="font-cosmic text-lg text-primary">{content.totalMemory}</p>
        </div>
        <div className="cosmic-panel p-3 rounded">
          <p className="text-xs text-muted-foreground">Used</p>
          <p className="font-cosmic text-lg text-accent">{content.usedMemory}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Memory Efficiency</span>
          <span className="text-primary">{content.memoryEfficiency}%</span>
        </div>
        <Progress value={content.memoryEfficiency} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span className="text-muted-foreground">Active Threads:</span>
          <span className="text-accent ml-2 font-mono">{content.activeThreads.toLocaleString()}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Last Update:</span>
          <span className="text-primary ml-2">{content.lastUpdate}</span>
        </div>
      </div>
    </div>
  );

  const renderMissionContent = (content: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="cosmic-panel p-3 rounded text-center">
          <p className="font-cosmic text-2xl text-accent">{content.activeMissions}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="cosmic-panel p-3 rounded text-center">
          <p className="font-cosmic text-2xl text-primary">{content.completedMissions}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>
      
      <div className="cosmic-border-glow p-3 rounded">
        <p className="text-xs text-muted-foreground mb-1">Latest Mission</p>
        <p className="text-sm text-primary font-medium">{content.lastMission}</p>
        <p className="text-xs text-accent mt-2">Success Rate: {content.successRate}</p>
      </div>
    </div>
  );

  const renderModulesContent = (content: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="cosmic-panel p-3 rounded text-center">
          <p className="font-cosmic text-xl text-primary">{content.activeModules}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="cosmic-panel p-3 rounded text-center">
          <p className="font-cosmic text-xl text-accent">{content.installedModules}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {content.modules.map((module: any, index: number) => (
          <div key={index} className="cosmic-border p-2 rounded">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">{module.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                module.status === 'active' ? 'status-online bg-primary/20' : 'text-muted-foreground bg-muted/20'
              }`}>
                {module.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Progress value={module.load} className="h-1 flex-1" />
              <span className="text-xs text-muted-foreground font-mono w-8">{module.load}%</span>
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
          <div key={panel.id} className="cosmic-panel rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => togglePanel(panel.id)}
              className="w-full justify-between p-4 h-auto text-left hover:bg-accent/10"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-accent" />
                <span className="font-cosmic text-primary">{panel.title}</span>
              </div>
              {panel.isOpen ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
            
            {panel.isOpen && (
              <div className="px-4 pb-4 border-t border-border/50">
                <div className="pt-4">
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