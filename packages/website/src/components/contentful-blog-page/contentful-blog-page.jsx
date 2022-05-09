import React, { useState, useEffect } from 'react'
import { PageWrapper, Hero, Article, Author, Breadcrumb } from './contentful-blog-page.styles'
import { getBlogFromSlug } from './helpers/blog'
import { Break } from '../panels'

export const ContentfulBlogPage = ({ slug }) => {
  const [page, setPage] = useState(null)

  const getData = async () => {
    const page = await getBlogFromSlug(slug.replace('/blog', ''))
    setPage(page)
  }

  useEffect(() => {
    getData()
  }, [slug])

  return !page
    ? ''
    : (
      <PageWrapper>
        <Hero background={`${page.image.fields.file.url}?w=1100&h=700&fit=fill`}><h1>{page.title}</h1></Hero>
        <Break />
        <Breadcrumb>
          <div className='content'>
            <a href='/blog'>Blog</a> <span>/</span> {page.title}
          </div>
        </Breadcrumb>
        <Author>
          <div className='author-column author-column-image'>
            <img alt='bark profile image' width='80' height='80' title='bark profile image' src='/pcc-logo-round.EM2LHAUI.png' />
          </div>
          <div className='author-column author-column-text'>
            <h3>{page.author}, <span>{page.authorTitle}</span></h3>
            <p>{page.dateFormatted}</p>
          </div>
        </Author>
        <Article>
          {page.bodyComponents}
        </Article>
      </PageWrapper>
      )
}
