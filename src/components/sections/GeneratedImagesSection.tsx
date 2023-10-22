import NextImage from 'next/image';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { type Image as ImageType } from 'openai/resources';

import Loader from '@/components/Loader';
import Empty from '@/components/sections/Empty';
import DownloadButton from '@/components/buttons/DownloadButton';

type Props = {
  isLoading: boolean,
  images: ImageType[],
}

const GeneratedImagesSection = ({ isLoading, images }: Props) => (
  <>
    {isLoading && (
    <div className='p-20'>
      <Loader />
    </div>
    )}

    {images.length === 0 && !isLoading && (
      <Empty label='No images generated yet.' />
    )}

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
      {images.map((image) => (
        <Card key={image.url} className='rounded-lg overflow-hidden'>
          <CardBody
            className='relative aspect-square'
          >
            <Image as={NextImage} alt='Generated' fill src={image.url} />
          </CardBody>
          <CardFooter className='p-2'>
            <DownloadButton src={image.url as string} />
          </CardFooter>
        </Card>
      ))}
    </div>
  </>
);

export default GeneratedImagesSection;
