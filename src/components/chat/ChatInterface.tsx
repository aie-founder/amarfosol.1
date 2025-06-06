'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, SendHorizonal, Smile } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatInterfaceProps {
  partner: { id: string; name: string; avatarUrl?: string };
}

const initialMessages: ChatMessage[] = [
  { id: '1', sender: 'farmer', text: 'Hello! Thanks for your interest in my fresh spinach. How can I help you today?', timestamp: Date.now() - 60000 * 5 },
  { id: '2', sender: 'user', text: 'Hi Abdul! I was wondering about the harvest date for the spinach listed.', timestamp: Date.now() - 60000 * 4 },
  { id: '3', sender: 'farmer', text: 'It was harvested just this morning! Super fresh.', timestamp: Date.now() - 60000 * 3 },
];

export default function ChatInterface({ partner }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: ChatMessage = {
      id: String(Date.now()),
      sender: 'user', // Assuming the current user is sending
      text: newMessage,
      timestamp: Date.now(),
    };
    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate farmer response
    setTimeout(() => {
      const farmerResponse: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'farmer',
        text: "Thanks for your message! I'll get back to you shortly.",
        timestamp: Date.now() + 1000,
      };
      setMessages(prev => [...prev, farmerResponse]);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl flex flex-col" style={{ height: 'calc(100vh - 200px)', minHeight: '400px' }}>
      <CardHeader className="flex flex-row items-center space-x-4 p-4 border-b">
        <Avatar>
          <AvatarImage src={partner.avatarUrl || `https://placehold.co/40x40.png?text=${partner.name.substring(0,1)}`} alt={partner.name} />
          <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-lg">{partner.name}</CardTitle>
      </CardHeader>
      
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'farmer' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={partner.avatarUrl || `https://placehold.co/32x32.png?text=${partner.name.substring(0,1)}`} />
                  <AvatarFallback>{partner.name.substring(0,1)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 text-sm shadow ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
               {msg.sender === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://placehold.co/32x32.png?text=U" /> {/* Placeholder for current user */}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center w-full gap-2">
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            aria-label="Chat message input"
          />
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary">
            <Smile className="w-5 h-5" />
          </Button>
          <Button type="submit" size="icon">
            <SendHorizonal className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
