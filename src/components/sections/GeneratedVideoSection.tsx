/* eslint-disable jsx-a11y/media-has-caption */
import Loader from '@/components/Loader';
import Empty from '@/components/sections/Empty';

type Props = {
  isLoading: boolean;
  video: string
}

const GeneratedVideoSection = ({ isLoading, video } : Props) => (
  <>
    {isLoading && (
      <div className='p-20'>
        <Loader />
      </div>
    )}
    {!video && !isLoading && (
      <Empty label='No video files generated.' />
    )}
    {video && (
      <video controls className='w-full aspect-video mt-8 rounded-lg border bg-black'>
        <source src={video} />
      </video>
    )}
  </>
);
export default GeneratedVideoSection;
