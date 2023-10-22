import { ImageIcon } from 'lucide-react';

import Heading from '@/components/Heading';
import ImagePromptForm from '@/components/forms/ImagePromptForm';

const ImagePage = () => (
  <div>
    <Heading
      title='Image Generation'
      description='Turn your prompt into an image'
      icon={ImageIcon}
      iconColor='text-pink-700'
      bg='bg-pink-700/10'
    />
    <ImagePromptForm />
  </div>
);

export default ImagePage;
