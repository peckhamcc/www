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
  expiredToken
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
  SmallSpinner,
  Info
} from '../panels'
import {
  panelLevel2Background,
  panelLevel2Border,
  panelLevel2Header
} from '../../colours'
import {
  spacing
} from '../../units'

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
  [Type.Road]: {
    [Distance.Short]: 'Short - 60km',
    [Distance.Medium]: 'Medium - 80-110km',
    [Distance.Long]: 'Long - 110-150km',
    [Distance.Epic]: 'Epic - 150km+'
  },
  [Type.Mud]: {
    [Distance.Short]: 'Short - 30km',
    [Distance.Medium]: 'Medium - 40km',
    [Distance.Long]: 'Long - 50km',
    [Distance.Epic]: 'Epic - 60km+'
  },
  [Type.MountainBiking]: {
    [Distance.Short]: 'Short - 2hrs',
    [Distance.Medium]: 'Medium - 4hrs',
    [Distance.Long]: 'Long - 6hrs',
    [Distance.Epic]: 'Epic - 8hrs+'
  }
}

const SPEED_DESCRIPTIONS = {
  [Type.Road]: {
    [Speed.Social]: 'Social - 21kph',
    [Speed.SocialPlus]: 'Social Plus - 24kph',
    [Speed.AntiSocial]: 'Antisocial - 26kph',
    [Speed.PainTrain]: '🎷🐩🚴‍♀️🚴‍♂️🚴‍♀️🚴‍♂️💨 - 28kph+'
  },
  [Type.Mud]: {
    [Speed.Social]: 'Social - 16kph',
    [Speed.SocialPlus]: 'Social Plus - 20kph',
    [Speed.AntiSocial]: 'Antisocial - 22kph',
    [Speed.PainTrain]: '🎷🐩🚴‍♀️🚴‍♂️🚴‍♀️🚴‍♂️💨 - 24kph+'
  },
  [Type.MountainBiking]: {
    [Speed.Social]: 'Social - 12kph',
    [Speed.SocialPlus]: 'Social Plus - 14kph',
    [Speed.AntiSocial]: 'Antisocial - 16kph',
    [Speed.PainTrain]: '🎷🐩🚴‍♀️🚴‍♂️🚴‍♀️🚴‍♂️💨 - 18kph+'
  }
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

const GroupDetails = styled.table`
  background-color: ${panelLevel2Background};
  border: 1px solid ${panelLevel2Border};
  color: ${panelLevel2Header};
  width: 100%;
  border-collapse: collapse;
`

const GroupHeader = styled.th`
  text-align: left;
  vertical-align: top;
  padding: ${spacing(0.25)} ${spacing(0.5)};
  border: 1px solid ${panelLevel2Border};
`

const GroupCell = styled.td`
  border: 1px solid ${panelLevel2Border};
  padding: ${spacing(0.25)} ${spacing(0.5)};

  ul {
    padding: 0;
    margin: 0 0 0 ${spacing(1)};

    li {
      padding: 0;
      margin: 0;
    }
  }
`

const GroupName = styled(GroupCell)`
  font-size: 6em;
  text-align: center;
  color: #000;
  line-height: 1;
`

class Rides extends Component {
  state = {
    loading: false,
    rides: {},
    preferences: {},
    error: null
  }

  componentDidMount () {
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
      const response = await globalThis.fetch(config.lambda.rideRouletteRidesGet, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        const {
          rides,
          preferences
        } = await response.json()

        this.setState({
          rides,
          preferences: Object.keys(preferences).reduce((acc, curr) => {
            acc[curr] = {
              ...preferences[curr],
              saved: true
            }

            return acc
          }, {})
        })

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

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

  handleWantToRideChange (date) {
    const {
      preferences
    } = this.state

    if (preferences[date]) {
      delete preferences[date]

      this.handleSaveRidePreferences().catch(err => console.error(err))
    } else {
      preferences[date] = {
        distance: 'short',
        speed: 'social',
        type: 'road',
        route: 'no-route'
      }
    }

    this.setState({
      preferences
    })
  }

  handleChoice (preference, type, value) {
    preference[type] = value

    this.setState({
      preferences: this.state.preferences
    })
  }

  handleSaveRidePreference = async (preference) => {
    await this.handleSaveRidePreferences()
    preference.saved = true

    this.setState({
      preferences: this.state.preferences
    })
  }

  handleUpdateRidePreference = (preference) => {
    delete preference.saved

    this.setState({
      preferences: this.state.preferences
    })
  }

  handleSaveRidePreferences = async () => {
    const preferences = this.state.preferences

    this.setState({
      loading: true
    })

    try {
      const response = await globalThis.fetch(config.lambda.rideRoulettePreferencesSet, {
        method: 'PUT',
        headers: {
          Authorization: this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.keys(preferences)
          .reduce((acc, curr) => {
            acc[curr] = {
              ...preferences[curr],
              saved: undefined
            }

            return acc
          }, {})
        )
      })

      this.setState({
        error: null
      })

      if (response.status === 200) {
        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

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
      rides,
      preferences
    } = this.state

    if (loading && !rides.length) {
      return (
        <>
          <Info>Loading rides</Info>
          <Spinner />
        </>
      )
    }

    const content = Object.keys(rides).map(timestamp => {
      const date = new Date(timestamp)
      const generatedRide = rides[timestamp]
      const preference = preferences[timestamp]

      if (generatedRide === false) {
        // rides have not been generated yet, show user preferences
      }

      if (generatedRide) {
        if (generatedRide.riding === false) {
          // Not assigned to a ride on this day
          return (
            <RidePreferences key={timestamp}>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <p>Rest day!</p>
              <p>If you've changed your mind and want to ride, try asking in Slack if you can join another ride.</p>
            </RidePreferences>
          )
        }

        // have been assigned to a ride
        let routeChoice

        const ridersWithRoutes = generatedRide.riders
          .filter(rider => rider.hasRoute)
          .map(rider => rider.name)

        if (ridersWithRoutes.length === 0) {
          routeChoice = (
            <p>No-one in your group has a route planned, check out the <Link to='/routes'>routes page</Link> for inspiration!</p>
          )
        } else if (ridersWithRoutes.length === 1) {
          routeChoice = (
            <p>{ridersWithRoutes[0]} has a route planned.</p>
          )
        } else {
          const routers = ridersWithRoutes.slice(0, ridersWithRoutes.length - 1).join(', ') + ' and ' + ridersWithRoutes[ridersWithRoutes.length - 1]

          routeChoice = (
            <p>{routers} {ridersWithRoutes.length === 2 ? 'both' : 'all'} have routes planned.</p>
          )
        }

        const riderList = generatedRide.riders.map((rider, index) => {
          return (
            <li key={index}>{rider.name}</li>
          )
        })

        if (riderList.length === 1) {
          routeChoice = (
            <>
              <p>It looks like you're the only person who wanted to ride this distance today!</p>
              <p>If you'd prefer company try asking if there's space on another ride in Slack.</p>
            </>
          )
        }

        // have been assigned a ride
        return (
          <RidePreferences key={timestamp}>
            <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
            <GroupDetails>
              <tbody>
                <tr>
                  <GroupHeader>Group:</GroupHeader>
                  <GroupName>{generatedRide.name}</GroupName>
                </tr>
                <tr>
                  <GroupHeader>Speed:</GroupHeader>
                  <GroupCell>{SPEED_DESCRIPTIONS[generatedRide.type][generatedRide.speed]}</GroupCell>
                </tr>
                <tr>
                  <GroupHeader>Distance:</GroupHeader>
                  <GroupCell>{DISTANCE_DESCRIPTIONS[generatedRide.type][generatedRide.distance]}</GroupCell>
                </tr>
                <tr>
                  <GroupHeader>Riders:</GroupHeader>
                  <GroupCell>
                    <ul>
                      {riderList}
                    </ul>
                  </GroupCell>
                </tr>
              </tbody>
            </GroupDetails>
            {routeChoice}
            {
              riderList.length > 1
                ? (
                  <>
                    <p>Rides leave the <a href='https://www.southwark.gov.uk/libraries/find-a-library?chapter=12'>library</a> at 8am (summer) or 8:30am (winter) unless your group has decided otherwise.</p>
                    <p>Please turn up 5-10 minutes early to find your group and make sure you have everything on the <Link to='/equipment'>equipment list</Link>.</p>
                  </>
                  )
                : null
            }
          </RidePreferences>
        )
      }

      if (!preference) {
        // not riding this day
        return (
          <RidePreferences key={timestamp}>
            <ToggleHeader>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <Toggle
                onChange={() => this.handleWantToRideChange(timestamp)}
                state={false}
                disabled={loading}
              />
            </ToggleHeader>
          </RidePreferences>
        )
      }

      if (preference.saved) {
        // just saved this one
        return (
          <RidePreferences key={timestamp}>
            <ToggleHeader>
              <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
              <Toggle
                onChange={() => this.handleWantToRideChange(timestamp)}
                state
                disabled={loading}
              />
            </ToggleHeader>
            <p>Your preferences have been saved, check back before the ride to see which group you are in!</p>
            <BlueButton
              onClick={() => this.handleUpdateRidePreference(preference)}
              disabled={loading}
              centred
            >Update
            </BlueButton>
          </RidePreferences>
        )
      }

      // want to ride on this day
      return (
        <RidePreferences key={timestamp}>
          <ToggleHeader>
            <h3>{DAYS[date.getDay()]} {MONTHS[date.getMonth()]} {date.getDate()}</h3>
            <Toggle
              onChange={() => this.handleWantToRideChange(timestamp)}
              state
              disabled={loading}
            />
          </ToggleHeader>
          <ChoiceHeader>Type</ChoiceHeader>
          <MultipleChoice
            choices={Object.values(Type)}
            descriptions={TYPE_DESCRIPTIONS}
            value={preference.type}
            onChoose={(value) => this.handleChoice(preference, 'type', value)}
            disabled={loading}
          />
          <ChoiceHeader>Distance</ChoiceHeader>
          <MultipleChoice
            choices={Object.values(Distance)}
            descriptions={DISTANCE_DESCRIPTIONS[preference.type]}
            value={preference.distance}
            onChoose={(value) => this.handleChoice(preference, 'distance', value)}
            disabled={loading}
          />
          <ChoiceHeader>Speed</ChoiceHeader>
          <MultipleChoice
            choices={Object.values(Speed)}
            descriptions={SPEED_DESCRIPTIONS[preference.type]}
            value={preference.speed}
            onChoose={(value) => this.handleChoice(preference, 'speed', value)}
            disabled={loading}
          />
          <ChoiceHeader>Route</ChoiceHeader>
          <MultipleChoice
            choices={Object.values(Route)}
            descriptions={ROUTE_DESCRIPTIONS}
            value={preference.route}
            onChoose={(value) => this.handleChoice(preference, 'route', value)}
            disabled={loading}
          />
          <RidesPageLink>Check out the <Link to='/routes'>routes page</Link> for inspiration!</RidesPageLink>
          {
            loading
              ? (
                <SmallSpinner />
                )
              : (
                <GreenButton
                  onClick={() => this.handleSaveRidePreference(preference)}
                  disabled={loading}
                  centred
                >Save
                </GreenButton>
                )
          }
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

const mapStateToProps = ({ session: { token }, user }) => ({
  token,
  user
})

const mapDispatchToProps = {
  expiredToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Rides)
