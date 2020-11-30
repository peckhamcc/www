import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  PageWrapper,
  Panel
} from '../panels'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import config from '../../config'
import {
  clearRouletteToken
} from '../../store/actions'
import pccLogo from '../../../assets/pcc-logo-round.png'
import {
  Toggle,
  MultipleChoice
} from '../forms'

const DAYS = [
  'Sun',
  'Mon',
  'Tues',
  'Weds',
  'Thurs',
  'Fri',
  'Sat'
]

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

const Distance = Object.freeze({
  Short: 'short', // 60-80km
  Medium: 'medium', // 80-110km
  Long: 'long', // 110-160km
  Epic: 'epic' // 160km+
})

const Speed = Object.freeze({
  Social: 'social',
  SocialPlus: 'social-plus',
  AntiSocial: 'antisocial',
  PainTrain: 'pain-train'
})

const Type = Object.freeze({
  Road: 'road',
  Mud: 'mud',
  MountainBiking: 'mtb'
})

const DISTANCE_DESCRIPTIONS = {
  [Distance.Short]: 'Short - 60km',
  [Distance.Medium]: 'Medium - 80-110km',
  [Distance.Long]: 'Long - 110-160km',
  [Distance.Epic]: 'Epic - 160km+'
}

const SPEED_DESCRIPTIONS = {
  [Speed.Social]: 'Social - 21kph',
  [Speed.SocialPlus]: 'Social Plus - 24kph',
  [Speed.AntiSocial]: 'Antisocial - 28kph',
  [Speed.PainTrain]: 'Pain Train - 30kph+'
}

const TYPE_DESCRIPTIONS = {
  [Type.Road]: 'Road',
  [Type.Mud]: 'Mud/Cross/Gravel',
  [Type.MountainBiking]: 'Mountain Biking'
}

const CenteredPanel = styled(Panel)`
  max-width: 376px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  padding-top: 20px;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

const ToggleHeader = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  h3 {
    flex-grow: 1
  }

  label {
    flex-grow: 0
  }
`

const ChoiceHeader = styled.h4`
  margin-top: 0;
`

const RidePreferences = styled.div`
  margin-bottom: 20px;
`

class Rides extends Component {
  state = {
    loading: false,
    rides: [],
    error: null
  }

  componentDidMount () {
    this._loadRides()
      .catch(() => {})
  }

  async _loadRides () {
    if (!this.props.token || !this.props.email) {
      return
    }

    this.setState({
      loading: true
    })

    try {
      const response = await global.fetch(config.lambda.rideRouletteRidesGet, {
        method: 'GET',
        headers: {
          Auth: global.btoa(JSON.stringify({ token: this.props.token, email: this.props.email }))
        }
      })

      if (response.status === 200) {
        this.setState({
          rides: await response.json()
        })

        return
      }

      if (response.status === 401) {
        this.props.clearRouletteToken()

        return
      }
    } catch (error) {
      this.setState({
        error
      })

      console.error('load preferences error')
      console.error(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  handleWantToRideChange (event, timestamp) {
    event.preventDefault()
    const rides = this.state.rides

    rides.forEach(ride => {
      if (ride.date === timestamp) {
        if (ride.riding) {
          ride.riding = false
        } else {
          ride.riding = true
          ride.distance = 'short'
          ride.speed = 'social'
          ride.type = 'road'
        }
      }
    })

    if (rides[timestamp]) {
      rides[timestamp] = false
    } else {
      rides[timestamp] = {
        distance: 'short',
        speed: 'social',
        type: 'road'
      }
    }

    this.setState({
      rides
    })

    this._saveRidePreferences().catch(err => console.error(err))
  }

  handleChoice (timestamp, type, value) {
    const rides = this.state.rides

    rides.forEach(ride => {
      if (ride.date === timestamp) {
        ride[type] = value
      }
    })

    this.setState({
      rides
    })

    this._saveRidePreferences().catch(err => console.error(err))
  }

  _saveRidePreferences = async () => {
    const rides = this.state.rides

    this.setState({
      loading: true
    })

    try {
      const response = await global.fetch(config.lambda.rideRoulettePreferencesSet, {
        method: 'PUT',
        headers: {
          Auth: global.btoa(JSON.stringify({ token: this.props.token, email: this.props.email })),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rides)
      })

      this.setState({
        error: null
      })

      if (response.status === 200) {
        return
      }

      if (response.status === 401) {
        this.props.clearRouletteToken()

        return
      }
    } catch (error) {
      this.setState({
        error
      })

      console.error('save preferences error')
      console.error(error)
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    if (!this.props.token) {
      return null
    }

    const {
      loading,
      rides
    } = this.state

    const content = rides
      .map(ride => {
        const timestamp = ride.date
        const date = new Date(timestamp)

        if (ride.ride) {
          // have been assigned a ride
          return (
            <RidePreferences key={timestamp}>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <p>Ride {ride.ride}</p>
            </RidePreferences>
          )
        } else if (ride.riding) {
          // want to ride on this day
          return (
            <RidePreferences key={timestamp}>
              <ToggleHeader>
                <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
                <Toggle
                  onChange={(event) => this.handleWantToRideChange(event, timestamp)}
                  state
                  disabled={loading}
                />
              </ToggleHeader>
              <ChoiceHeader>Type</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Type)}
                descriptions={TYPE_DESCRIPTIONS}
                value={ride.type}
                onChoose={(value) => this.handleChoice(timestamp, 'type', value)}
                disabled={loading}
              />
              <ChoiceHeader className='pa0 ma0 mt4 f6 fw7 tracked gray ttu'>Distance</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Distance)}
                descriptions={DISTANCE_DESCRIPTIONS}
                value={ride.distance}
                onChoose={(value) => this.handleChoice(timestamp, 'distance', value)}
                disabled={loading}
              />
              <ChoiceHeader className='pa0 ma0 mt4 f6 fw7 tracked gray ttu'>Speed</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Speed)}
                descriptions={SPEED_DESCRIPTIONS}
                value={ride.speed}
                onChoose={(value) => this.handleChoice(timestamp, 'speed', value)}
                disabled={loading}
              />
            </RidePreferences>
          )
        }

        // not riding this day
        return (
          <RidePreferences key={timestamp}>
            <ToggleHeader>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <Toggle
                onChange={(event) => this.handleWantToRideChange(event, timestamp)}
                state={false}
                disabled={loading}
              />
            </ToggleHeader>
          </RidePreferences>
        )
      })

    return (
      <PageWrapper>
        <CenteredPanel>
          <img src={pccLogo.src} width='300' height='300' />
          <h2>Ride Roulette</h2>
          <p>Choose the type of ride you want to do and check back the afternoon before to see which group you are in</p>
          {content}
        </CenteredPanel>
      </PageWrapper>
    )
  }
}

Rides.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ roulette: { token }, user: { email } }) => ({
  token,
  email
})

const mapDispatchToProps = {
  clearRouletteToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Rides)
