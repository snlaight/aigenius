import { FileAudio } from 'lucide-react';

import Heading from '@/components/Heading';
import VideoPromptForm from '@/components/forms/VideoPromptForm';

const VideoPage = () => (
  <div>
    <Heading
      title='Video Generation'
      description='Turn your prompt into video.'
      icon={FileAudio}
      iconColor='text-orange-700'
      bg='bg-orange-700/10'
    />
    <VideoPromptForm />
  </div>
);

export default VideoPage;
