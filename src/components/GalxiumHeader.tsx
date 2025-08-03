import { useState, useEffect } from 'react';
import { Zap, Wifi, WifiOff, Clock, Activity, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const GalxiumHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [systemLoad, setSystemLoad] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate system load fluctuation
      setSystemLoad(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <header className="glass-panel border-b border-white/10">
      <div className="flex items-center justify-between px-8 py-5">
        {/* Left: Galxium Logo & Status */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 galaxy-gradient rounded-xl flex items-center justify-center hover-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 galaxy-gradient opacity-30 rounded-xl blur-sm" />
            </div>
            <div>
              <h1 className="font-space text-2xl font-bold text-cosmic tracking-wide">
                GALXIUM
              </h1>
              <p className="text-xs text-muted-foreground font-light">
                Cosmic Intelligence v3.0.1
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 glass-panel rounded-lg">
              {isOnline ? (
                <Wifi className="w-4 h-4 status-active" />
              ) : (
                <WifiOff className="w-4 h-4 status-error" />
              )}
              <span className={`text-sm font-medium ${
                isOnline ? 'status-active' : 'status-error'
              }`}>
                {isOnline ? 'CONNECTED' : 'OFFLINE'}
              </span>
            </div>

            <div className="flex items-center space-x-3 px-4 py-2 glass-panel rounded-lg">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">
                Load: {systemLoad.toFixed(0)}%
              </span>
              <div className="w-16 h-2 progress-cosmic rounded-full">
                <div 
                  className="progress-fill h-full"
                  style={{ width: `${systemLoad}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Time & Controls */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="flex items-center space-x-3 mb-1">
              <Clock className="w-5 h-5 text-accent" />
              <span className="font-space text-2xl font-semibold text-cosmic">
                {formatTime(currentTime)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-light">
              {formatDate(currentTime)} • Galactic Standard Time
            </p>
          </div>

          <Button variant="ghost" size="sm" className="glass-button hover-lift p-3">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};