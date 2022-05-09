import React from 'react'
import { ContentfulBlogList } from '../components/contentful-blog-list'
import { ContentfulBlogPage } from '../components/contentful-blog-page'
import { ContentfulPage } from '../components/contentful-page'
import { ContentfulHome } from '../components/contentful-home'
import { useLocation } from 'react-router-dom'

const DynamicPage = ({ template = 'page' }) => {
  const location = useLocation()

  if (template === 'home') {
    return <ContentfulHome slug={location.pathname} />
  } else if (template === 'blog') {
    return <ContentfulBlogList slug={location.pathname} />
  } else if (template === 'blog-page') {
    return <ContentfulBlogPage slug={location.pathname} />
  } else {
    return <ContentfulPage slug={location.pathname} />
  }
}

export default DynamicPage
