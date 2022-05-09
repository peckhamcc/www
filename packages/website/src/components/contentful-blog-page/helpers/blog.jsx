import { setupClient, renderOptions } from '../../../shared/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const getBlogFromSlug = async (slug = '') => {
  const client = setupClient()
  const entries = await client.getEntries({
    content_type: 'blog',
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

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(entry.fields.date)
  const dateFormatted = date.toLocaleDateString('en-GB', options)

  return {
    ...entry.fields,
    bodyComponents,
    dateFormatted
  }
}
