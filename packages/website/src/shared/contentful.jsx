import React from 'react'
import contentful from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import {
  Button
} from '../components/panels'
import {
  Link
} from 'react-router-dom'

export const setupClient = () => {
  const client = contentful.createClient({
    space: '6dcasuqyhf2a',
    accessToken: '9BIPHbYi-pk3yqZJlaJMgp8iVaTJY1Pj2pVIE-uc61A'
  })

  return client
}

export const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      console.log(node.data.target.sys.contentType.sys.id);
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
        );
      }
      if (node.data.target.sys.contentType.sys.id === 'button') {
        return (
          <Button><Link to={node.data.target.fields.url}>{node.data.target.fields.text}</Link></Button>
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      console.log('run');
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          alt={node.data.target.fields.description}
          style={{borderRadius: '10px', maxWidth: '100%'}}
        />
      );
    },
  },
};
