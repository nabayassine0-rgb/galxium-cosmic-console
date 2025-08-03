import { useState } from 'react';
import { GalxiumBoot } from '@/components/GalxiumBoot';
import { GalxiumHeader } from '@/components/GalxiumHeader';
import { ChatConsole } from '@/components/ChatConsole';
import { SystemPanels } from '@/components/SystemPanels';
import { Button } from '@/components/ui/button';
import { Scan, Navigation, Wrench, Shield, Star, Orbit } from 'lucide-react';

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
      {/* Galaxy Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 galaxy-gradient opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 galaxy-gradient rounded-full opacity-20 blur-3xl float-gentle" />
        <div className="absolute bottom-20 right-20 w-80 h-80 nebula-gradient rounded-full opacity-15 blur-3xl float-gentle" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 galaxy-gradient rounded-full opacity-10 blur-2xl" />
      </div>

      {/* Header */}
      <GalxiumHeader />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10 gap-6 p-6">
        {/* Left Sidebar - System Panels */}
        <div className="w-80 overflow-y-auto modern-scrollbar">
          <SystemPanels />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1">
          <ChatConsole />
        </div>

        {/* Right Sidebar - Quick Actions & Status */}
        <div className="w-72 space-y-6">
          {/* Quick Actions */}
          <div className="glass-panel hover-lift p-6">
            <h3 className="font-space text-xl font-semibold text-cosmic mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button className="glass-button w-full justify-start py-4 px-5 text-left hover-glow group">
                <Scan className="w-5 h-5 mr-3 group-hover:text-accent transition-colors" />
                <span className="font-medium">Deep Space Scan</span>
              </Button>
              <Button className="glass-button w-full justify-start py-4 px-5 text-left hover-glow group">
                <Navigation className="w-5 h-5 mr-3 group-hover:text-accent transition-colors" />
                <span className="font-medium">Navigation Center</span>
              </Button>
              <Button className="glass-button w-full justify-start py-4 px-5 text-left hover-glow group">
                <Wrench className="w-5 h-5 mr-3 group-hover:text-accent transition-colors" />
                <span className="font-medium">System Diagnostics</span>
              </Button>
            </div>
          </div>

          {/* Ship Status */}
          <div className="glass-panel hover-lift p-6">
            <h3 className="font-space text-xl font-semibold text-cosmic mb-6">
              Ship Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-light">Core Temperature:</span>
                <span className="text-accent font-semibold">2.7K</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-light">Power Systems:</span>
                <span className="status-active font-semibold">OPTIMAL</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-light">Network Status:</span>
                <span className="text-cosmic font-semibold">GALACTIC</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-light">Defense Grid:</span>
                <span className="status-active font-semibold">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;