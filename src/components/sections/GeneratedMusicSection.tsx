/* eslint-disable jsx-a11y/media-has-caption */
import Loader from '@/components/Loader';
import Empty from '@/components/sections/Empty';

type Props ={
  isLoading: boolean,
  music: string,
}

const GeneratedMusicSection = ({ isLoading, music } : Props) => (
  <>
    {isLoading && (
    <div className='p-20'>
      <Loader />
    </div>
    )}
    {!music && !isLoading && (
      <Empty label='No music generated yet.' />
    )}
    {music && (
      <audio controls className='w-full mt-8'>
        <source src={music} />
      </audio>
    )}
  </>
);

export default GeneratedMusicSection;
