import { useState } from 'react';
import { GalxiumBoot } from '@/components/GalxiumBoot';
import { GalxiumHeader } from '@/components/GalxiumHeader';
import { ChatConsole } from '@/components/ChatConsole';
import { SystemPanels } from '@/components/SystemPanels';

const Index = () => {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  if (!isBooted) {
    return <GalxiumBoot onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 aurora-bg opacity-5" />
        <div className="absolute top-20 left-20 w-40 h-40 cosmic-glow-purple rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 cosmic-glow-blue rounded-full opacity-15 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 cosmic-glow rounded-full opacity-10 blur-2xl" />
      </div>

      {/* Header */}
      <GalxiumHeader />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Sidebar - System Panels */}
        <div className="w-80 p-4 overflow-y-auto custom-scrollbar">
          <SystemPanels />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 p-4">
          <ChatConsole />
        </div>

        {/* Right Sidebar - Future Expansion */}
        <div className="w-64 p-4 space-y-4">
          <div className="cosmic-panel rounded-lg p-4">
            <h3 className="font-cosmic text-lg text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="cosmic-button w-full py-2 px-3 text-sm rounded">
                Deep Scan
              </button>
              <button className="cosmic-button w-full py-2 px-3 text-sm rounded">
                Navigation
              </button>
              <button className="cosmic-button w-full py-2 px-3 text-sm rounded">
                Diagnostics
              </button>
            </div>
          </div>

          <div className="cosmic-panel rounded-lg p-4">
            <h3 className="font-cosmic text-lg text-primary mb-4">System Status</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Core Temp:</span>
                <span className="text-accent font-mono">2.7K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power:</span>
                <span className="status-online font-mono">OPTIMAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span className="text-primary font-mono">GALACTIC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shields:</span>
                <span className="status-online font-mono">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Index;