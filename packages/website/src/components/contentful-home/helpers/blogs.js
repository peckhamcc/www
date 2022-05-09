import { setupClient } from '../../../shared/contentful'

export const getBlogs = async () => {
  const client = setupClient()
  const entries = await client.getEntries({
    content_type: 'blog',
    limit: 6,
    include: 10
  })
  const items = entries?.items || null
  if (!items.length > 0) return null

  const blogs = []
  items.forEach((item) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(item.fields.date)
    const dateFormatted = date.toLocaleDateString('en-GB', options)
    blogs.push(
      {
        ...item.fields,
        dateFormatted
      }
    )
  })

  return blogs
}
