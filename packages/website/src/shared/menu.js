import { setupClient } from './contentful'

export const getMainMenu = async () => {
  const client = setupClient()
  const entries = await client.getEntries({
    content_type: 'menu',
    limit: 1,
    include: 10,
    'fields.title': 'Main'
  })
  const entry = entries?.items[0] || null
  if (!entry) return null

  return {
    ...entry
  }
}
