import React, { useState, useEffect } from 'react'
import { Break } from '../panels'
import { getPageFromSlug } from './helpers/page'
import { Hero, Article, PageWrapper } from './contentful-page.styles'

export const ContentfulPage = ({ slug }) => {
  const [page, setPage] = useState(null)
  const hasImage = page?.image?.length > 0
  const isHomePage = slug === '/'

  const getData = async () => {
    const page = await getPageFromSlug(slug)
    setPage(page)
  }

  useEffect(() => {
    getData()
  }, [slug])

  return !page
    ? ''
    : (
      <PageWrapper isHomePage={isHomePage}>
        {hasImage &&
          <>
            <Hero background={`${page.image[0].fields.file.url}?w=1400&h=700&fit=fill`}>
              <h1>
                {page.title}
              </h1>
            </Hero>
            <Break />
          </>}
        <Article>{page.bodyComponents}</Article>
      </PageWrapper>
      )
}
