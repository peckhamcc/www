import React, {
  Component
} from 'react'
import styled from 'styled-components'
import BigCalendar from 'react-big-calendar'
import {
  PageWrapper,
  Panel,
  ShortHero
} from '../components/panels'
import aboutBackground from '../../assets/about-bg.jpg'
import moment from 'moment'

moment.locale('en-GB', {
  week: {
    dow: 1 // Monday is the first day of the week.
  }
})

const localiser = BigCalendar.momentLocalizer(moment)

let allViews = ['month']

const CalendarPanel = styled.div`
  height: 1000px;
`

class CalendarPage extends Component {
  state = {
    date: new Date(),
    loading: false,
    error: false,
    events: []
  }

  componentDidMount () {
    this.setState({
      loading: true
    })

    this.loadEvents(new Date())
  }

  loadEvents = (month) => {
    this.setState({
      loading: true
    })

    const since = new Date(month.getFullYear(), month.getMonth(), 1, 0, 0, 0, 0)
    const until = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999)

    global.FB.api(
      `/556723371039577/events?since=${parseInt(since.getTime() / 1000)}&until=${parseInt(until.getTime() / 1000)}`, {
        access_token: 'blahblahblah'
      }, (response) => {
        const state = {
          loading: false,
          date: month
        }

        if (!response) {
          state.error = true
        } else if (response.error) {
          state.error = true
        } else {
          state.error = false

          state.events = response.data.map(event => {
            return {
              title: event.name,
              start: new Date(event.start_time),
              end: new Date(event.end_time),
              allDay: false,
              resource: null,
              link: `https://facebook.com/events/${event.id}`
            }
          })
        }

        this.setState(s => {
          return {
            ...s,
            ...state
          }
        })
      }
    )
  }

  onNavigate = (_, view, direction) => {
    let {
      date
    } = this.state

    if (direction === 'PREV') {
      if (view === 'month') {
        date.setMonth(date.getMonth() - 1)
      } else if (view === 'week') {
        date.setDate(date.getDate() - 7)
      }
    } else if (direction === 'NEXT') {
      if (view === 'month') {
        date.setMonth(date.getMonth() + 1)
      } else if (view === 'week') {
        date.setDate(date.getDate() + 7)
      }
    } else if (direction === 'TODAY') {
      date = new Date()
    }

    this.setState({
      date
    })

    this.loadEvents(date)
  }

  onSelectEvent = (event) => {
    window.open(event.link, '_blank')
  }

  render () {
    const {
      date,
      events
    } = this.state

    return (
      <PageWrapper>
        <ShortHero background={aboutBackground.src} />
        <Panel>
          <h2>Calendar</h2>
          <CalendarPanel>
            <BigCalendar
              date={date}
              events={events}
              views={allViews}
              showMultiDayTimes
              localizer={localiser}
              onNavigate={this.onNavigate}
              onSelectEvent={this.onSelectEvent}
            />
          </CalendarPanel>
        </Panel>
      </PageWrapper>
    )
  }
}

export default CalendarPage
