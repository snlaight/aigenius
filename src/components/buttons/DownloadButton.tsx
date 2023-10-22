import { Download } from 'lucide-react';
import Button from '@/components/buttons/Button';

type Props = {
  src: string,
};

const DownloadButton = ({ src }: Props) => (
  <Button
    onPress={() => window.open(src, '_blank')}
    color='secondary'
    className='w-full'
  >
    <Download className='h-4 w-4 mr-2' />
    Download
  </Button>
);
export default DownloadButton;
