import contentful from 'contentful'
import {
  config
} from '@peckhamcc/config'

export const setupClient = () => {
  const client = contentful.createClient({
    space: config.contentful.space,
    accessToken: config.contentful.accessToken
  })

  return client
}
