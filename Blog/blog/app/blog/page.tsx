import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import sampleBlogs from '@/config/sampleblogs'
import Image from 'next/image'
import Link from 'next/link'

const BlogList = () => {
  return (
    <MaxWidthWrapper classname=''>
      <h1 className="text-3xl font-bold mb-8">My Blogs</h1>
      {/* Grid for blog layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {sampleBlogs.map((blog) => (
          <div 
            key={blog.slug} 
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            
            {/* Blog Image */}
            <div className="w-full h-60 mb-4">
              <Image 
                src={blog.imageurl ? blog.imageurl : '/placeholder.jpg'} // Default to placeholder if no image
                alt={blog.title}
                width={400}
                height={300}
                className="rounded-md object-cover w-full h-full"
              />
            </div>

            {/* Blog Content */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-4">{blog.description}</p>
            </div>

            {/* Read More Link */}
            <Link href={`/blogpost/${blog.slug}`} className="text-indigo-600 hover:text-indigo-800 font-medium">
                Read More →
            </Link>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  )
}

export default BlogList
