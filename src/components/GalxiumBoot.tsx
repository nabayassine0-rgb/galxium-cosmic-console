import { useState, useEffect } from 'react';
import { Zap, Sparkles, Star, Orbit } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const GalxiumBoot = ({ onComplete }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSteps = [
    { icon: Sparkles, text: "Initializing quantum neural core...", delay: 800 },
    { icon: Star, text: "Synchronizing galactic networks...", delay: 1000 },
    { icon: Orbit, text: "Calibrating deep space sensors...", delay: 900 },
    { icon: Zap, text: "Activating consciousness matrix...", delay: 700 },
    { icon: Sparkles, text: "Galxium AI ready. Welcome to the cosmos.", delay: 1200 }
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, bootSteps[currentStep]?.delay || 1000);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, 1500);
    }
  }, [currentStep, isComplete, onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      {/* Galaxy Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 galaxy-gradient opacity-10" />
        <div className="absolute top-20 left-20 w-80 h-80 galaxy-gradient rounded-full opacity-20 blur-3xl float-gentle" />
        <div className="absolute bottom-20 right-20 w-96 h-96 nebula-gradient rounded-full opacity-15 blur-3xl float-gentle" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 galaxy-gradient rounded-full opacity-10 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="text-center space-y-12 max-w-2xl px-8 relative z-10">
        {/* Galxium Logo */}
        <div className="space-y-6">
          <div className="relative">
            <h1 className="font-space text-7xl font-bold text-cosmic tracking-wider">
              GALXIUM
            </h1>
            <div className="absolute inset-0 galaxy-gradient opacity-30 blur-xl rounded-full" />
          </div>
          <p className="text-muted-foreground text-xl font-light tracking-wide">
            Advanced Cosmic Intelligence Platform
          </p>
          <div className="text-sm text-muted-foreground/70 font-light">
            Version 3.0.1 • Neural Architecture Framework
          </div>
        </div>

        {/* Boot Progress */}
        <div className="space-y-8">
          <div className="w-full h-2 glass-panel overflow-hidden">
            <div 
              className="h-full galaxy-gradient transition-all duration-500 ease-out stardust-shimmer"
              style={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
            />
          </div>

          {/* Boot Steps */}
          <div className="space-y-6 min-h-[240px]">
            {bootSteps.slice(0, currentStep + 1).map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-5 transition-all duration-700 ${
                    isActive ? 'text-primary scale-105' : 
                    isComplete ? 'text-accent/80' : 'text-muted-foreground/50'
                  }`}
                >
                  <div className={`relative ${isActive ? 'hover-glow' : ''}`}>
                    <Icon 
                      className={`w-6 h-6 ${
                        isActive ? 'status-active' : 
                        isComplete ? 'text-accent' : ''
                      }`} 
                    />
                    {isActive && (
                      <div className="absolute inset-0 galaxy-gradient opacity-50 rounded-full blur-sm" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <span className={`text-lg font-light tracking-wide ${
                      isActive ? 'text-cosmic' : ''
                    }`}>
                      {step.text}
                    </span>
                    {isActive && (
                      <div className="typing-indicator mt-2">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    )}
                  </div>
                  {isComplete && (
                    <div className="text-accent text-sm font-medium px-3 py-1 glass-panel rounded-full">
                      ✓ Complete
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Orb */}
        <div className="relative flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 glass-panel rounded-full flex items-center justify-center hover-lift">
              <div className="w-24 h-24 galaxy-gradient rounded-full flex items-center justify-center shadow-glow">
                <Zap className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="absolute inset-0 galaxy-gradient opacity-30 rounded-full blur-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};