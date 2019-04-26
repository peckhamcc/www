import React, {
  Component
} from 'react'
import {
  PageWrapper,
  ShortHero
} from '../components/panels'
import calendarBackground from '../../assets/calendar-bg.jpg'
import qs from 'querystring'

class CalendarPage extends Component {
  render () {
    const url = `https://calendar.google.com/calendar/b/2/embed?${qs.stringify({
      wkst: 1,
      bgcolor: '#ffffff',
      ctz: 'Europe/London',
      hl: 'en_GB',
      src: [
        'ZTE1dXBkZ2p0aTEzbDJobmxya3ZuM2JyczRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
        'N3A4MWhsMzFldmpvMnVwNjlmMmFtNmdqMW9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
        'bmQ4MjYxNjlldGFvdnV2Z2F1djczNmJodjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ',
        'cGczYzY3YTdlOHViNWdxbG8xNmVzN2lrMmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ'
      ],
      color: [
        '#039BE5',
        '#D81B60',
        '#009688',
        '#F6BF26'
      ],
      showTitle: 0,
      showNav: 1,
      showTabs: 0,
      showPrint: 0,
      showCalendars: 0,
      showTz: 0
    })}`

    return (
      <PageWrapper>
        <ShortHero background={calendarBackground.src} />
        <iframe src={url} style={{ borderWidth: 0, marginTop: 20 }} width='100%' height={600} frameBorder={0} scrolling='no' />
      </PageWrapper>
    )
  }
}

export default CalendarPage
