import { useState, useEffect } from 'react';
import { Zap, Wifi, WifiOff, Clock, Activity } from 'lucide-react';

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
    <header className="cosmic-panel border-b border-border/50 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Galxium Logo & Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-primary cosmic-glow-purple" />
              <div className="absolute -inset-1 aurora-bg opacity-20 rounded-full blur-sm" />
            </div>
            <div>
              <h1 className="font-cosmic text-xl font-bold text-primary">
                GALXIUM
              </h1>
              <p className="text-xs text-muted-foreground">
                Cosmic AI v2.7.3
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 status-online" />
              ) : (
                <WifiOff className="w-4 h-4 status-offline" />
              )}
              <span className={`text-xs font-mono ${
                isOnline ? 'status-online' : 'status-offline'
              }`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono text-muted-foreground">
                SYS: {systemLoad.toFixed(0)}%
              </span>
              <div className="w-16 h-1 bg-card rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-1000"
                  style={{ width: `${systemLoad}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Time & Date */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="font-cosmic text-lg text-primary">
                {formatTime(currentTime)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {formatDate(currentTime)} - GALACTIC STANDARD
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};