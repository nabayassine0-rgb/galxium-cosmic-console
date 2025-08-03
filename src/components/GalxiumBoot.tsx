import { useState, useEffect } from 'react';
import { Zap, Cpu, Satellite, Shield } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const GalxiumBoot = ({ onComplete }: BootSequenceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootSteps = [
    { icon: Zap, text: "Initializing quantum neural matrix...", delay: 800 },
    { icon: Cpu, text: "Loading cosmic consciousness protocols...", delay: 1000 },
    { icon: Satellite, text: "Establishing deep space communications...", delay: 900 },
    { icon: Shield, text: "Activating galactic defense systems...", delay: 700 },
    { icon: Zap, text: "Galxium AI core online. Welcome, Commander.", delay: 1200 }
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
      <div className="text-center space-y-8 max-w-2xl px-8">
        {/* Galxium Logo */}
        <div className="space-y-4">
          <h1 className="font-cosmic text-6xl font-bold aurora-bg bg-clip-text text-transparent">
            GALXIUM
          </h1>
          <p className="text-muted-foreground text-lg">
            Cosmic Intelligence System v2.7.3
          </p>
        </div>

        {/* Boot Progress */}
        <div className="space-y-6">
          <div className="w-full h-1 bg-card rounded-full overflow-hidden">
            <div 
              className="h-full aurora-bg transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / bootSteps.length) * 100}%` }}
            />
          </div>

          {/* Boot Steps */}
          <div className="space-y-4 min-h-[200px]">
            {bootSteps.slice(0, currentStep + 1).map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 transition-all duration-500 ${
                    isActive ? 'text-primary cosmic-glow' : 
                    isComplete ? 'text-accent' : 'text-muted-foreground'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 ${
                      isActive ? 'status-online' : 
                      isComplete ? 'text-accent' : ''
                    }`} 
                  />
                  <span className={`font-mono text-sm ${isActive ? 'terminal-cursor' : ''}`}>
                    {step.text}
                  </span>
                  {isComplete && (
                    <span className="text-accent text-xs">✓ COMPLETE</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cosmic Animation */}
        <div className="relative">
          <div className="absolute inset-0 aurora-bg opacity-20 rounded-full blur-xl animate-pulse" />
          <div className="relative cosmic-border rounded-full p-8">
            <div className="w-16 h-16 mx-auto cosmic-glow-blue rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary status-online" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};