import { setupClient, renderOptions } from '../../../shared/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const getPageFromId = async (entryId) => {
  const client = setupClient()
  const entry = await client.getEntry(entryId, {
    include: 10
  })
  const bodyComponents = documentToReactComponents(
    entry.fields.body,
    renderOptions
  )

  return {
    ...entry.fields,
    bodyComponents
  }
}

export const getPageFromSlug = async (slug = '') => {
  const client = setupClient()
  const entries = await client.getEntries({
    content_type: 'page',
    limit: 1,
    include: 10,
    'fields.url': slug
  })
  const entry = entries?.items[0] || null
  if (!entry) return null

  const bodyComponents = documentToReactComponents(
    entry.fields.body,
    renderOptions
  )

  return {
    ...entry.fields,
    bodyComponents
  }
}
