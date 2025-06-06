import PageHeader from '@/components/shared/PageHeader';
import ChatInterface from '@/components/chat/ChatInterface';
import { MessageCircle } from 'lucide-react';

export default function ChatPage() {
  // In a real app, you'd pass a farmerId or conversationId here
  const mockConversationPartner = { id: 'f1', name: 'Abdul Karim (Farmer)' };

  return (
    <div>
      <PageHeader 
        title="Chat with Farmer" 
        description={`Directly communicate with ${mockConversationPartner.name} for any queries.`}
        icon={MessageCircle}
      />
      <ChatInterface partner={mockConversationPartner} />
    </div>
  );
}
