import React, { useState, useEffect } from 'react'
import { PageWrapper, Hero, Blog, Blogs, BlogImage, BlogTitle, BlogSection } from './contentful-blog-list.styles'
import { getBlogs } from './helpers/blogs'
import { Break } from '../panels'

export const ContentfulBlogList = ({ slug }) => {
  const [blogs, setBlogs] = useState(null)

  const getData = async () => {
    const blogItems = await getBlogs()
    setBlogs(blogItems)
  }

  useEffect(() => {
    getData()
  }, [slug])

  return !blogs
    ? ''
    : (
      <PageWrapper>
        <Hero background='http://images.ctfassets.net/6dcasuqyhf2a/5dlpqFLilkKyfLxKmevhRJ/e14aa9b3beafc095f9b55660823eafff/image_from_ios.jpg?w=1100&h=700&fit=fill'><h1>Blogs</h1></Hero>
        <Break />
        <BlogSection>
          <BlogTitle>
            <div className='column-left'>
              <h2>Blogs/News</h2>
            </div>
            <div className='column-right'>
              {blogs.length} results
            </div>
          </BlogTitle>
          <Blogs>
            {blogs.map((blog) => (
              <Blog key={blog.title}>
                <a href={`/blog${blog.url}`}>
                  <BlogImage background={`${blog.image.fields.file.url}?w=500&h=500&fit=fill`} />
                </a>
                <div className='text'>
                  <h2>{blog.title}</h2>
                  <p>{blog.dateFormatted}</p>
                  <a className='button' href={`/blog${blog.url}`}>View</a>
                </div>
              </Blog>
            ))}
          </Blogs>
        </BlogSection>
      </PageWrapper>
      )
}
