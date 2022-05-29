import { setupClient } from '../../../shared/contentful'

export const getContentBlocks = async () => {
  const client = setupClient()
  const entries = await client.getEntries({
    content_type: 'contentBlock',
    limit: 100,
    include: 10
  })
  const items = entries?.items || null
  if (!items.length > 0) return null

  return items
}
