import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface Conversation {
  id: string;
  session_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
  read_status: boolean;
}

const AdminChats = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/');
        return;
      }

      const { data: roleData, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error || !roleData) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      loadConversations();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations.',
        variant: 'destructive',
      });
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('chat_messages')
        .update({ read_status: true })
        .eq('conversation_id', conversationId)
        .eq('read_status', false);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);

      // Subscribe to new messages
      const channel = supabase
        .channel(`admin_conversation_${selectedConversation}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `conversation_id=eq.${selectedConversation}`,
          },
          (payload: any) => {
            setMessages((prev) => [...prev, payload.new]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation]);

  const sendReply = async () => {
    if (!replyText.trim() || !selectedConversation) return;

    setSending(true);
    try {
      const { error } = await supabase.from('chat_messages').insert({
        conversation_id: selectedConversation,
        role: 'assistant',
        content: replyText,
      });

      if (error) throw error;

      setReplyText('');
      toast({
        title: 'Reply Sent',
        description: 'Your message has been sent to the user.',
      });
    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Failed to send reply.',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Admin Chat Dashboard</h1>
          <p className="text-muted-foreground">Manage customer conversations in real-time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-280px)]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation === conv.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">Session: {conv.session_id.slice(8, 16)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conv.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          conv.status === 'active'
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-gray-500/20 text-gray-600'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages Panel */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedConversation ? 'Chat Messages' : 'Select a conversation'}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-[calc(100vh-280px)]">
              {selectedConversation ? (
                <>
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs opacity-70">
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                              {message.role === 'assistant' && message.read_status && (
                                <Icon
                                  icon="solar:check-read-bold"
                                  className="h-3 w-3 text-blue-500"
                                />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 flex space-x-2">
                    <Input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendReply();
                        }
                      }}
                      disabled={sending}
                    />
                    <Button onClick={sendReply} disabled={sending || !replyText.trim()}>
                      <Icon icon="solar:send-bold" className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Select a conversation to view messages</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminChats;
