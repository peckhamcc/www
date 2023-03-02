import React from 'react'
import * as contentful from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import {
  Button
} from '../components/panels'
import {
  Link
} from 'react-router-dom'
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

export const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height='500px'
            width='100%'
            frameBorder='0'
            scrolling='no'
            title={node.data.target.fields.title}
            allowFullScreen='true'
          />
        )
      }
      if (node.data.target.sys.contentType.sys.id === 'button') {
        return (
          <Button><Link to={node.data.target.fields.url}>{node.data.target.fields.text}</Link></Button>
        )
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}?w=750&h=750`}
          alt={node.data.target.fields.description}
          style={{ borderRadius: '10px', maxWidth: '100%' }}
        />
      )
    }
  }
}
