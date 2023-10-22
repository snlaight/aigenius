import { Music } from 'lucide-react';

import Heading from '@/components/Heading';
import MusicPromptForm from '@/components/forms/MusicPromptForm';

const MusicPage = () => (
  <div>
    <Heading
      title='Music Generation'
      description='Turn your prompt into music.'
      icon={Music}
      iconColor='text-emerald-500'
      bg='bg-emerald-500/10'
    />
    <MusicPromptForm />
  </div>
);

export default MusicPage;
