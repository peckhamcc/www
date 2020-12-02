import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import styled from 'styled-components'
import {
  connect
} from 'react-redux'
import config from '../../config'
import {
  clearRouletteToken
} from '../../store/actions'
import {
  Toggle,
  MultipleChoice,
  GreenButton,
  BlueButton,
  HelpText
} from '../forms'
import {
  Spinner,
  SmallSpinner
} from '../panels'

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

const Route = Object.freeze({
  NoRoute: 'no-route',
  HasRoute: 'has-route'
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

const ROUTE_DESCRIPTIONS = {
  [Route.NoRoute]: 'No route in mind',
  [Route.HasRoute]: 'I have a route in mind'
}

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

const RidesPageLink = styled(HelpText)`
  margin-bottom: 20px;
  text-align: center;
`

class Rides extends Component {
  state = {
    loading: false,
    rides: [],
    error: null
  }

  componentDidMount () {
    if (!this.props.user.email) {
      this.props.clearRouletteToken()
    }

    this._loadRides()
      .catch(() => {})
  }

  async _loadRides () {
    if (!this.props.token) {
      return
    }

    this.setState({
      loading: true
    })

    try {
      const response = await global.fetch(config.lambda.rideRouletteRidesGet, {
        method: 'GET',
        headers: {
          Authorization: global.btoa(JSON.stringify({ token: this.props.token, email: this.props.user.email, name: this.props.user.name }))
        }
      })

      if (response.status === 200) {
        const rides = await response.json()

        this.setState({
          rides: rides.map(ride => ({
            ...ride,
            saved: Boolean(ride.riding)
          }))
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

  handleWantToRideChange (ride) {
    let removedPreference = false

    ride.saved = false

    if (ride.riding) {
      ride.riding = false
      removedPreference = true
    } else {
      ride.riding = true
      ride.distance = 'short'
      ride.speed = 'social'
      ride.type = 'road'
      ride.route = 'no-route'
    }

    this.setState({
      rides: this.state.rides
    })

    if (removedPreference) {
      this.handleSaveRidePreferences().catch(err => console.error(err))
    }
  }

  handleChoice (ride, type, value) {
    ride[type] = value

    this.setState({
      rides: this.state.rides
    })
  }

  handleSaveRidePreference = async (ride) => {
    await this.handleSaveRidePreferences()
    ride.saved = true

    const {
      rides
    } = this.state

    this.setState({
      rides: rides.map(r => {
        if (r.date === ride.date) {
          r.saved = true
        }

        return r
      })
    })
  }

  handleUpdateRidePreference = (ride) => {
    const {
      rides
    } = this.state

    this.setState({
      rides: rides.map(r => {
        if (r.date === ride.date) {
          delete r.saved
        }

        return r
      })
    })
  }

  handleSaveRidePreferences = async () => {
    const rides = this.state.rides

    this.setState({
      loading: true
    })

    try {
      const response = await global.fetch(config.lambda.rideRoulettePreferencesSet, {
        method: 'PUT',
        headers: {
          Authorization: global.btoa(JSON.stringify({ token: this.props.token, email: this.props.user.email, name: this.props.user.name })),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rides.map(ride => ({
          ...ride,
          saved: undefined
        })))
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
    if (!this.props.token || !this.props.user.name) {
      return null
    }

    const {
      loading,
      rides
    } = this.state

    if (loading && !rides.length) {
      return (
        <Spinner />
      )
    }

    const content = rides
      .map(ride => {
        const timestamp = ride.date
        const date = new Date(timestamp)

        if (ride.ride) {
          if (!ride.riding) {
            // missed the deadline for a ride
            return (
              <RidePreferences key={timestamp}>
                <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
                <p>You have not been assigned to a ride for this day</p>
              </RidePreferences>
            )
          }

          // have been assigned a ride
          return (
            <RidePreferences key={timestamp}>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <p>Ride {ride.ride}</p>
            </RidePreferences>
          )
        } else if (ride.saved) {
          // just saved this one
          return (
            <RidePreferences key={timestamp}>
              <ToggleHeader>
                <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
                <Toggle
                  onChange={() => this.handleWantToRideChange(ride)}
                  state
                  disabled={loading}
                />
              </ToggleHeader>
              <p>Your preferences have been saved, check back before the ride to see which group you are in!</p>
              <BlueButton
                onClick={() => this.handleUpdateRidePreference(ride)}
                disabled={loading}
              >Update
              </BlueButton>
            </RidePreferences>
          )
        } else if (ride.riding) {
          // want to ride on this day
          return (
            <RidePreferences key={timestamp}>
              <ToggleHeader>
                <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
                <Toggle
                  onChange={() => this.handleWantToRideChange(ride)}
                  state
                  disabled={loading}
                />
              </ToggleHeader>
              <ChoiceHeader>Type</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Type)}
                descriptions={TYPE_DESCRIPTIONS}
                value={ride.type}
                onChoose={(value) => this.handleChoice(ride, 'type', value)}
                disabled={loading}
              />
              <ChoiceHeader>Distance</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Distance)}
                descriptions={DISTANCE_DESCRIPTIONS}
                value={ride.distance}
                onChoose={(value) => this.handleChoice(ride, 'distance', value)}
                disabled={loading}
              />
              <ChoiceHeader>Speed</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Speed)}
                descriptions={SPEED_DESCRIPTIONS}
                value={ride.speed}
                onChoose={(value) => this.handleChoice(ride, 'speed', value)}
                disabled={loading}
              />
              <ChoiceHeader>Route</ChoiceHeader>
              <MultipleChoice
                choices={Object.values(Route)}
                descriptions={ROUTE_DESCRIPTIONS}
                value={ride.route}
                onChoose={(value) => this.handleChoice(ride, 'route', value)}
                disabled={loading}
              />
              <RidesPageLink>Checkout the <Link to='/routes'>routes page</Link> for inspiration!</RidesPageLink>
              {
                loading ? (
                  <SmallSpinner />
                ) : (
                  <GreenButton
                    onClick={() => this.handleSaveRidePreference(ride)}
                    disabled={loading}
                  >Save
                  </GreenButton>
                )
              }
            </RidePreferences>
          )
        }

        // not riding this day
        return (
          <RidePreferences key={timestamp}>
            <ToggleHeader>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <Toggle
                onChange={() => this.handleWantToRideChange(ride)}
                state={false}
                disabled={loading}
              />
            </ToggleHeader>
          </RidePreferences>
        )
      })

    return (
      <>
        <p>Choose the type of ride you want to do and check back the afternoon before to see which group you are in</p>
        {content}
      </>
    )
  }
}

Rides.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = ({ roulette: { token }, user }) => ({
  token,
  user
})

const mapDispatchToProps = {
  clearRouletteToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Rides)
