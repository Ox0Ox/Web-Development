import React from 'react'
import sampleBlogs from '@/config/sampleblogs';
import Slugger from '@/app/api/blogpost/[slug]/route';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

interface Props {
  params: {
    slug: string;
  };
}

// This function runs before the component to generate dynamic metadata
export async function generateMetadata({ params }: Props) {
  const blog = sampleBlogs.find(blog => blog.slug === params.slug);
  if (blog) {
    return {
      title: blog.title,
    };
  } else {
    return {
      title: 'Blog not found',
    };
  }
}

const Slug = async ({ params }: Props) => {
  const blog = sampleBlogs.find(blog => blog.slug === params.slug);
  const htmlcontent = await Slugger(params.slug);

  return (
    <MaxWidthWrapper classname='prose dark:prose-invert mt-2'>
      {blog ? (
        <div className='w-full flex'>
          <div className='w-full md:w-4/5 h-[84vh] overflow-y-auto scroll-smooth' id='main' dangerouslySetInnerHTML={{ __html: htmlcontent[1] }}></div>
          <div className='hidden md:block w-1/5 pl-5' dangerouslySetInnerHTML={{ __html: htmlcontent[2] }}></div>
        </div>
      ) : (
        <div className='h-screen flex justify-center items-center'>
          <div className='relative bottom-20 text-center' dangerouslySetInnerHTML={{ __html: htmlcontent }}></div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Slug;
