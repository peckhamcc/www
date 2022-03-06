import contentful from 'contentful'

export const setupClient = () => {
  const client = contentful.createClient({
    space: '6dcasuqyhf2a',
    accessToken: '9BIPHbYi-pk3yqZJlaJMgp8iVaTJY1Pj2pVIE-uc61A'
  })

  return client
}
