import React from 'react'
import { ContentfulPage } from '../components/contentful-page'
import { useLocation } from 'react-router-dom'

const DynamicPage = () => {
  const location = useLocation()

  return <ContentfulPage slug={location.pathname} />
}

export default DynamicPage
