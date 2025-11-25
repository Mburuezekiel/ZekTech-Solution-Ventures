import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  read_status?: boolean;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen, messages.length]);

  const initializeConversation = async () => {
    try {
      // Create conversation in database
      const { data: convData, error: convError } = await supabase
        .from('chat_conversations')
        .insert({ session_id: sessionId })
        .select()
        .single();

      if (convError) throw convError;
      setConversationId(convData.id);

      // Add welcome message
      const welcomeMessage = {
        role: 'assistant' as const,
        content: "👋 Hi! I'm ZeckTech AI, your intelligent assistant. How can I help you today?",
        timestamp: new Date(),
      };
      
      setMessages([welcomeMessage]);

      // Store welcome message in database
      await supabase.from('chat_messages').insert({
        conversation_id: convData.id,
        role: 'assistant',
        content: welcomeMessage.content,
      });
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  // Listen for new messages from admin
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`conversation_${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: any) => {
          if (payload.new.role === 'assistant') {
            setMessages((prev) => [
              ...prev,
              {
                id: payload.new.id,
                role: 'assistant',
                content: payload.new.content,
                timestamp: new Date(payload.new.created_at),
                read_status: payload.new.read_status,
              },
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Collect website content for context
  const getWebsiteContent = () => {
    return `
ZEKTECH - Web Development & Design Services

SERVICES:
1. Web Design - Beautiful, Converting Designs (Starting from KSh 5,000)
   - Responsive design for all devices
   - User experience optimization
   - Modern, professional aesthetics
   - Timeline: 1-2 weeks

2. Web Development - Robust, Scalable Solutions (Starting from KSh 10,000)
   - Custom web applications
   - E-commerce platforms
   - CMS development
   - Timeline: 2-4 weeks

3. Mobile Apps - Native & Cross-platform (Starting from KSh 20,000)
   - iOS and Android development
   - React Native solutions
   - Timeline: 4-6 weeks

4. UI/UX Design - User-Centered Design (Starting from KSh 8,000)
   - User research and testing
   - Interactive prototypes
   - Timeline: 2-3 weeks

5. SEO Optimization - Boost Your Rankings (Starting from KSh 6,000)
   - Technical SEO
   - Content optimization
   - Timeline: Ongoing

6. Digital Marketing - Grow Your Audience (Starting from KSh 7,000)
   - Social media marketing
   - Content strategy
   - Timeline: Monthly packages

PRICING:
- Basic Website: KSh 15,000 - KSh 30,000
- Business Website: KSh 30,000 - KSh 80,000
- E-Commerce: KSh 80,000 - KSh 200,000+
- Mobile App: KSh 100,000 - KSh 500,000+

CONTACT:
- WhatsApp: 0714487081
- Email: Available via contact form
- Location: Kenya

ABOUT:
ZEKTECH specializes in creating modern, professional websites and digital solutions for businesses. 
We focus on delivering high-quality, conversion-optimized designs that help businesses grow online.
    `;
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !conversationId) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Store user message in database
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role: 'user',
        content: userMessage.content,
      });

      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: {
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          websiteContent: getWebsiteContent(),
          conversationId,
        },
      });

      if (error) throw error;

      const assistantResponse = data.choices?.[0]?.message?.content;

      if (assistantResponse) {
        // Check if the response indicates need for human support
        const needsHumanSupport = assistantResponse.toLowerCase().includes('contact support') ||
                                  assistantResponse.toLowerCase().includes('human support');

        const aiMessage = {
          role: 'assistant' as const,
          content: assistantResponse,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);

        // Store AI response in database
        await supabase.from('chat_messages').insert({
          conversation_id: conversationId,
          role: 'assistant',
          content: assistantResponse,
        });

        // If AI can't help, offer WhatsApp fallback
        if (needsHumanSupport) {
          setTimeout(() => {
            handleWhatsAppFallback(userMessage.content);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      
      // Offer WhatsApp fallback on error
      handleWhatsAppFallback(userMessage.content);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleWhatsAppFallback = async (question: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('whatsapp-fallback', {
        body: {
          userQuestion: question,
          sessionId,
        },
      });

      if (error) throw error;

      if (data?.whatsappUrl) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm forwarding your question to our support specialist. Click below to continue on WhatsApp for a personalized response. 📱",
            timestamp: new Date(),
          },
        ]);

        // Open WhatsApp after a short delay
        setTimeout(() => {
          window.open(data.whatsappUrl, '_blank');
        }, 500);
      }
    } catch (error) {
      console.error('Error with WhatsApp fallback:', error);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon icon="solar:close-circle-bold" className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon icon="solar:chat-round-dots-bold" className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[380px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-hero p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon icon="solar:chat-round-dots-bold" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ZeckTech AI</h3>
                  <p className="text-xs text-white/80">AI Assistant • Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {(isLoading || isTyping) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-xs text-foreground/70 ml-2">typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Icon icon="solar:send-bold" className="h-4 w-4 text-white" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
