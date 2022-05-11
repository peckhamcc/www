import React, { useState, useEffect } from 'react'
import { Break } from '../panels'
import { PageWrapper, Hero, Blog, Blogs, BlogImage, TextStrip, BlogSection, BlogTitle } from './contentful-home.styles'
import { getBlogs } from './helpers/blogs'
import { getContentBlocks } from './helpers/contentBlocks'

export const ContentfulHome = ({ slug }) => {
  const [blogs, setBlogs] = useState(null)
  const [contentBlocks, setContentBlocks] = useState(null)
  const getContentBlockValue = (key) => {
    const blocks = contentBlocks?.filter((item) => item.fields.key === key)
    if (!(blocks && blocks.length > 0)) return null

    return blocks[0].fields.value
  }
  const homeBlock1 = getContentBlockValue('home.text.block.1')
  const homeBlock2 = getContentBlockValue('home.text.block.2')
  const homeImage = getContentBlockValue('home.hero.image')
  const blogTitle = getContentBlockValue('home.blog.title')
  const blogLinkAll = getContentBlockValue('home.blog.link.all')

  const getData = async () => {
    const blogItems = await getBlogs()
    const contentBlockItems = await getContentBlocks()
    setBlogs(blogItems)
    setContentBlocks(contentBlockItems)
  }

  useEffect(() => {
    getData()
  }, [slug])

  return !blogs || !contentBlocks
    ? ''
    : (
      <PageWrapper>
        <Hero background={homeImage} />
        <TextStrip>
          <div className='text'>
            {homeBlock1}
          </div>
        </TextStrip>
        <Break height='20px' />
        <BlogSection>
          <BlogTitle>
            <div className='column-left'>
              <h2>{blogTitle}</h2>
            </div>
            <div className='column-right'>
              <a href='/blog'>{blogLinkAll}</a>
            </div>
          </BlogTitle>
          <Blogs>
            {blogs.map((blog) => (
              <Blog key={blog.title}>
                <a href={`/blog${blog.url}`}>
                  <BlogImage background={`${blog.image?.fields.file.url}?w=500&h=500&fit=fill`} />
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
        <Break height='20px' />
      </PageWrapper>
      )
}
