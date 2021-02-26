import 'whatwg-fetch'
import './app'

// redirect to non 'www.' site
if (window.location.href.includes('www.')) {
  window.location.href = window.location.href.replace(/www\./, '')
}
