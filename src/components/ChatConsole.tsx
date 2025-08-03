import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'user' | 'galxium';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatConsole = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'galxium',
      content: 'Greetings, Commander. I am Galxium, your cosmic AI companion. How may I assist you in navigating the infinite expanse of space and knowledge?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (content: string, messageId: string) => {
    let currentText = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index < content.length) {
        currentText += content[index];
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText + '▮', isTyping: true }
            : msg
        ));
        
        index++;
      } else {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, content: currentText, isTyping: false }
            : msg
        ));
        setTypingMessageId(null);
        clearInterval(typeInterval);
      }
    }, 30 + Math.random() * 20); // Variable typing speed for realism
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate Galxium response
    setTimeout(() => {
      const responses = [
        "Fascinating query, Commander. Let me analyze the cosmic data streams...",
        "Processing your request through my quantum neural networks...",
        "Consulting the galactic knowledge archives for optimal solutions...",
        "Interesting perspective. The stars whisper of infinite possibilities...",
        "Your wisdom resonates across the cosmic frequencies, Commander.",
      ];

      const responseId = (Date.now() + 1).toString();
      const response: Message = {
        id: responseId,
        type: 'galxium',
        content: '',
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages(prev => [...prev, response]);
      setTypingMessageId(responseId);
      
      setTimeout(() => {
        simulateTyping(
          responses[Math.floor(Math.random() * responses.length)],
          responseId
        );
      }, 500);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="flex flex-col h-full cosmic-panel rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full status-online"></div>
          <h2 className="font-cosmic text-lg text-primary">
            Galxium Console
          </h2>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'cosmic-border-glow aurora-bg text-card-foreground'
                  : 'cosmic-panel border border-accent/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                {message.type === 'galxium' && (
                  <div className="w-6 h-6 rounded-full aurora-bg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold text-card-foreground">G</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className={`text-sm font-mono ${
                    message.type === 'user' ? 'text-card-foreground' : 'text-foreground'
                  }`}>
                    {message.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Transmit message to Galxium..."
              className="cosmic-input pr-12 font-mono"
              disabled={typingMessageId !== null}
            />
          </div>
          
          <Button
            onClick={toggleListening}
            variant="ghost"
            size="sm"
            className={`cosmic-border ${
              isListening ? 'cosmic-glow-purple text-accent' : 'text-muted-foreground'
            }`}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || typingMessageId !== null}
            className="cosmic-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};