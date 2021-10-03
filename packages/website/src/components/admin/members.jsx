import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import styled from 'styled-components'
import {
  Spinner,
  Info,
  Button
} from '../panels'
import {
  Input
} from '../forms'
import {
  expiredToken,
  loadMembers,
  setMembers
} from '../../store/actions'
import {
  config
} from '@peckhamcc/config'
import {
  panelLevel1Background,
  panelLevel2Header
} from '../../colours'
import {
  spacing
} from '../../units'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TBody = styled.tbody`
`

const OddRow = styled.tr`

`

const EvenRow = styled.tr`
  background-color: ${panelLevel1Background};
`

const Cell = styled.td`
  vertical-align: top;
  padding: ${spacing(1)};

  h3 {
    color: ${panelLevel2Header};
    padding: 0;
    margin: 0;
  }

  p {
    padding: 0;
    margin: 0;
  }
`

const Filter = styled.div`
  padding: ${spacing(1)} 0;
`

const Query = styled.div`
  display: inline-block;
  margin-right: ${spacing(1)};
`

function MemberList ({ members }) {
  return (
    <Table>
      <TBody>
        {
          members.map((member, index) => {
            const Row = index % 2 === 0 ? EvenRow : OddRow
            let fopccStatus = '😶 Not a Friend'

            if (member.fopcc) {
              if (member.fopcc.status) {
                if (member.fopcc.status === 'active') {
                  fopccStatus = `✅ Stripe managed, renews ${new Date(member.fopcc.renews).toLocaleDateString('en-GB')}`
                } else {
                  fopccStatus = ` ❌ Stripe managed, status "${member.fopcc.status}"`
                }
              }

              if (member.fopcc.bc) {
                if (member.fopcc.expires > Date.now()) {
                  fopccStatus = `✅ BC managed, expires ${new Date(member.fopcc.expires).toLocaleDateString('en-GB')}`
                } else {
                  fopccStatus = ` ❌ BC managed, expired ${new Date(member.fopcc.expires).toLocaleDateString('en-GB')}`
                }
              }
            }

            return (
              <Row key={member.id}>
                <Cell>
                  <h3>{member.name}</h3>
                  <p>Email: {member.email}<br />Phone: {member.phone}<br />FoPCC: {fopccStatus}</p>
                </Cell>
              </Row>
            )
          })
        }
      </TBody>
    </Table>
  )
}

class AdminMembers extends Component {
  state = {
    member: null,
    filter: ''
  }

  async componentDidMount () {
    await this._loadMembers()
      .catch(err => console.error(err))
  }

  async _loadMembers () {
    this.props.loadMembers()

    try {
      const response = await global.fetch(config.lambda.membersGet, {
        method: 'GET',
        headers: {
          Authorization: this.props.token
        }
      })

      if (response.status === 200) {
        const members = await response.json()
        this.props.setMembers(members.sort((a, b) => `${a.name}`.localeCompare(`${b.name}`)))

        return
      }

      if (response.status === 401) {
        this.props.expiredToken()

        return
      }

      throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
    }
  }

  handleSearchChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleQueryChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  handleExport = (filteredMembers) => {
    const escape = (str) => `${str || ''}`.replace(/,/g, '\\,')

    let data = [
      'Name',
      'Email',
      'Phone',
      'FoPCC type',
      'FoPCC status',
      'FoPCC expiry',
      'FoPCC renews'
    ].join(', ')

    filteredMembers.forEach(member => {
      let foPccType = ''
      let foPccStatus = ''
      let foPccExpiry = ''
      let foPccRenews = ''

      if (member.fopcc) {
        if (member.fopcc.bc) {
          foPccType = 'BC'
          foPccStatus = member.fopcc.expires > Date.now() ? 'ok' : 'expired'
          foPccExpiry = new Date(member.fopcc.expires).toLocaleDateString('en-GB')
        }

        if (member.fopcc.status) {
          foPccType = 'Stripe'
          foPccStatus = member.fopcc.status === 'active' ? 'ok' : member.fopcc.status
          foPccRenews = new Date(member.fopcc.renews).toLocaleDateString('en-GB')
        }
      }

      const fields = [
        escape(member.name),
        escape(member.email),
        escape(member.phone),
        foPccType,
        foPccStatus,
        foPccExpiry,
        foPccRenews
      ]

      data += `\n${fields.join(', ')}`
    })

    const blob = new globalThis.Blob([
      data
    ], {
      type: 'text/csv;charset=utf-8'
    })
    const blobUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.target = '_blank'
    anchor.download = `fopcc-export-${Date.now()}.csv`
    anchor.click()
    URL.revokeObjectURL(blobUrl)
  }

  render () {
    const {
      loadingMembers,
      members
    } = this.props
    const {
      member,
      filter,
      query
    } = this.state

    if (member) {
      return (
        null // <Member member={member} onShowMembers={this.handleShowMembers} />
      )
    }

    let filteredMembers = members.filter(member => Boolean(member.name))

    if (filter && filter.trim()) {
      const searchTerm = filter.trim().toLowerCase()

      filteredMembers = filteredMembers.filter(member => {
        return (member.name || '').toLowerCase().includes(searchTerm) ||
          (member.email || '').toLowerCase().includes(searchTerm) ||
          (member.phone || '').toLowerCase().includes(searchTerm)
      })
    }

    const friends = filteredMembers.filter(member => {
      if (!member.fopcc) {
        return false
      }

      // stripe
      if (member.fopcc.status === 'active') {
        return true
      }

      // bc
      if (member.fopcc.bc && member.fopcc.expires > Date.now()) {
        return true
      }

      return false
    })

    const lapsed = filteredMembers.filter(member => {
      if (!member.fopcc) {
        return false
      }

      // stripe
      if (member.fopcc.status && member.fopcc.status !== 'active') {
        return true
      }

      // bc
      if (member.fopcc.bc && member.fopcc.expires <= Date.now()) {
        return true
      }

      return false
    })

    const allCount = filteredMembers.length
    const friendsCount = friends.length
    const lapsedCount = lapsed.length

    if (query) {
      if (query === 'friends') {
        filteredMembers = friends
      } else if (query === 'lapsed') {
        filteredMembers = lapsed
      }
    }

    return (
      loadingMembers
        ? (
          <>
            <Info>Loading members</Info>
            <Spinner />
          </>
          )
        : (
          <>
            <Filter>
              <Input type='search' placeholder='Search' value={filter} onChange={this.handleSearchChange} />
              <div>
                <Query><input type='radio' name='query' value='all' checked={!query || query === 'all'} onChange={this.handleQueryChange} /> All ({allCount})</Query>
                <Query><input type='radio' name='query' value='friends' checked={query === 'friends'} onChange={this.handleQueryChange} /> Friends ({friendsCount})</Query>
                <Query><input type='radio' name='query' value='lapsed' checked={query === 'lapsed'} onChange={this.handleQueryChange} /> Lapsed ({lapsedCount})</Query>
              </div>
              <Button style={{ marginBottom: 0 }} onClick={() => this.handleExport(filteredMembers)}>Export ({filteredMembers.length})</Button>
            </Filter>
            {
            filteredMembers.length
              ? (
                <>
                  <MemberList members={filteredMembers} onShowMember={this.handleShowMember} />
                </>
                )
              : (
                <p>No members to show</p>
                )
          }
          </>
          )
    )
  }
}

const mapStateToProps = ({ session: { token }, user, members: { loadingMembers, members } }) => ({
  user,
  token,
  loadingMembers,
  members
})

const mapDispatchToProps = {
  expiredToken,
  loadMembers,
  setMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMembers)
