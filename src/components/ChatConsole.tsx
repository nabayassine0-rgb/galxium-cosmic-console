import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Settings, Sparkles } from 'lucide-react';
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
      content: 'Welcome to Galxium, your advanced cosmic intelligence companion. I\'m here to assist you in exploring the vast expanse of knowledge and possibilities across the universe.',
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
            ? { ...msg, content: currentText, isTyping: true }
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
    }, 25 + Math.random() * 15);
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
        "Your inquiry resonates through the cosmic data streams. Let me process this through my neural networks to provide you with comprehensive insights.",
        "Fascinating perspective. I'm analyzing patterns across galactic knowledge repositories to offer you the most relevant guidance.",
        "Processing your request through quantum computational matrices. The universe holds infinite wisdom that I'm eager to share with you.",
        "Your question opens new pathways of exploration. Allow me to traverse the cosmic databases and return with valuable insights.",
        "Engaging deep learning protocols to understand your needs. The stars align to provide you with meaningful assistance.",
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
      }, 800);
    }, 1200 + Math.random() * 800);
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
    <div className="flex flex-col h-full glass-panel hover-lift">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full status-active shadow-glow"></div>
            <h2 className="font-space text-xl font-semibold text-cosmic">
              Cosmic Console
            </h2>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="glass-button hover-glow">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 modern-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl p-5 ${
                message.type === 'user'
                  ? 'galaxy-gradient text-white shadow-glow'
                  : 'glass-panel hover-lift'
              }`}
            >
              <div className="flex items-start space-x-4">
                {message.type === 'galxium' && (
                  <div className="w-8 h-8 galaxy-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-glow">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className={`text-base leading-relaxed ${
                    message.type === 'user' ? 'text-white font-medium' : 'text-foreground'
                  }`}>
                    {message.content}
                    {message.isTyping && (
                      <span className="inline-flex ml-2">
                        <div className="typing-indicator">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-3 font-light">
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
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Galxium anything..."
              className="glass-input text-base py-4 px-6 rounded-2xl border-0 bg-transparent placeholder:text-muted-foreground/70"
              disabled={typingMessageId !== null}
            />
          </div>
          
          <Button
            onClick={toggleListening}
            variant="ghost"
            size="lg"
            className={`glass-button p-4 rounded-xl ${
              isListening ? 'galaxy-gradient text-white shadow-glow' : ''
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || typingMessageId !== null}
            className="galaxy-gradient hover:shadow-glow text-white px-6 py-4 rounded-xl font-medium"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};