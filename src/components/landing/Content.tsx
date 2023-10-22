'use client';

import { Card, CardHeader, CardBody } from '@nextui-org/react';

import { testimonials } from '@/utils/constants';

const LandingContent = () => (
  <div className='px-10 pb-20'>
    <h2 className='text-center text-4xl text-white font-extrabold mb-10'>Testimonials</h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {testimonials.map((testimonial) => (
        <Card key={testimonial.name} className='bg-[#192339] border-none text-white rounded-lg border items-center shadow-sm'>
          <CardHeader>
            <section className='flex items-center gap-x-2'>
              <div>
                <p className='text-lg'>{testimonial.name}</p>
                <p className='text-zinc-400 text-sm'>
                  {' '}
                  {testimonial.title}
                  {' '}
                </p>
              </div>
            </section>
          </CardHeader>
          <CardBody className='py-4 px-3'>
            {testimonial.description}
          </CardBody>
        </Card>
      ))}
    </div>
  </div>
);

export default LandingContent;
