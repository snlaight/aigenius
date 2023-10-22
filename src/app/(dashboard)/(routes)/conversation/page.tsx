import { MessageSquare } from 'lucide-react';

import Heading from '@/components/Heading';
import ConversationPromptForm from '@/components/forms/ConversationPromptForm';

const ConversationPage = () => (
  <div>
    <Heading
      title='Conversation'
      description='Our most advanced conversation model.'
      icon={MessageSquare}
      iconColor='text-violet-500'
      bg='bg-violet-700/10'
    />
    <ConversationPromptForm />
  </div>
);

export default ConversationPage;
