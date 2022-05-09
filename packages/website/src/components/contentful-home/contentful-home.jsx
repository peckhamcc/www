import React, { useState, useEffect } from 'react'
import { Break } from '../panels'
import { PageWrapper, Hero, Blog, Blogs, BlogImage, TextStrip, BlogSection, BlogTitle } from './contentful-home.styles'
import { getBlogs } from './helpers/blogs'
import { getContentBlocks } from './helpers/contentBlocks'

export const ContentfulHome = ({ slug }) => {
  const [blogs, setBlogs] = useState(null)
  const [contentBlocks, setContentBlocks] = useState(null)
  const homeBlock1 = contentBlocks?.filter((item) => item.fields.key === 'home.text.block.1')[0].fields.value
  const homeBlock2 = contentBlocks?.filter((item) => item.fields.key === 'home.text.block.2')[0].fields.value

  const getData = async () => {
    const blogItems = await getBlogs()
    const contentBlockItems = await getContentBlocks()
    setBlogs(blogItems)
    setContentBlocks(contentBlockItems)
  }

  useEffect(() => {
    getData()
  }, [slug])

  return !blogs
    ? ''
    : (
      <PageWrapper>
        <Hero background='http://images.ctfassets.net/6dcasuqyhf2a/5dlpqFLilkKyfLxKmevhRJ/e14aa9b3beafc095f9b55660823eafff/image_from_ios.jpg?w=1100&h=700&fit=fill' />
        <TextStrip>
          <div className='text'>
            {homeBlock1}
          </div>
        </TextStrip>
        <Break />
        <BlogSection>
          <BlogTitle>
            <div className='column-left'>
              <h2>Recent Blogs/News</h2>
            </div>
            <div className='column-right'>
              <a href='/blog'>See All Blogs</a>
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
        <Break />
        <TextStrip>
          <div className='text'>
            {homeBlock2}
          </div>
        </TextStrip>
      </PageWrapper>
      )
}
