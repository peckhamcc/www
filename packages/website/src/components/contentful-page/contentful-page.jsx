import React, { useState, useEffect } from 'react'
import { PageWrapper, Panel, Hero, LinkPanel } from '../panels'
import { getPageFromSlug } from './helpers/page'
import SlideShow from '../slide-show'
import { shuffle } from './helpers/images'
import { Logo } from './contentful-page.styles'
import { Link } from 'react-router-dom'

export const ContentfulPage = ({ slug }) => {
  const [page, setPage] = useState(null)
  const hasImage = page?.image?.length > 0
  const hasMultiImages = page?.image?.length > 1
  const multiImageArray = page?.image?.map(
    (image) => image.fields.file.url + '?w=1100&h=700&fit=fill'
  )

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
      <PageWrapper>
        {slug === '/' && <Logo>Peckham Cycle Club</Logo>}
        {hasImage &&
          (hasMultiImages
            ? (
              <SlideShow slides={shuffle(multiImageArray)} />
              )
            : (
              <Hero
                background={`${page.image[0].fields.file.url}?w=1100&h=700&fit=fill`}
              />
              ))}
        <Panel>{page.bodyComponents}</Panel>
        {page?.previousPage?.fields?.image[0]?.fields.file.url && (
          <LinkPanel
            background={page?.previousPage?.fields?.image[0]?.fields.file.url}
          >
            <Link to='/diversity'>{page.previousPage.fields.title}</Link>
          </LinkPanel>
        )}
        {page?.nextPage?.fields?.image[0]?.fields.file.url && (
          <LinkPanel background={page.nextPage.fields.image[0]?.fields.file.url}>
            <Link to='/diversity'>{page.nextPage.fields.title}</Link>
          </LinkPanel>
        )}
      </PageWrapper>
      )
}
