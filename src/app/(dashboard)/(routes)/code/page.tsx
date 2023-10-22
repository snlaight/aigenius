import { Code } from 'lucide-react';

import CodePromptForm from '@/components/forms/CodePromptForm';
import Heading from '@/components/Heading';

const CodePromptPage = () => (
  <div>
    <Heading
      title='Code Generation'
      description='Generate code using descriptive text.'
      icon={Code}
      iconColor='text-green-500'
      bg='bg-emerald-700/10'
    />
    <CodePromptForm />
  </div>
);

export default CodePromptPage;
