import 'whatwg-fetch'
import './index.css'
import React from 'react'
import { render } from 'react-dom'
import App from './app'

/* window.fbAsyncInit = function() {
  FB.init({
    appId            : 169606027101581,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.11'
  })
*/

// redirect to non 'www.' site
if (window.location.href.includes('www.')) {
  window.location.href = window.location.href.replace(/www\./, '')
}

const root = document.getElementById('app')

if (process.env.NODE_ENV === 'production') {
  render(<App />, root)
} else {
  const RedBox = require('redbox-react').default

  try {
    render(<App />, root)
  } catch (e) {
    render(<RedBox error={e} />, root)
  }
}
