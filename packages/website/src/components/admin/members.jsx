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
  panelLevel2Border
} from '../../colours'
import {
  spacing
} from '../../units'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  border-bottom: 1px solid ${panelLevel2Border};
`

const TBody = styled.tbody`
`

const Row = styled.tr`

`

const Header = styled.th`
  text-align: left;
  vertical-align: top;
  padding: ${spacing(1)};
`

const Cell = styled.td`
  vertical-align: top;
  padding: ${spacing(1)};
`

function MemberList ({ members, onShowMember }) {
  return (
    <Table>
      <THead>
        <Row>
          <Header>Name</Header>
          <Header>Emergency Contact</Header>
          <Header>Actions</Header>
        </Row>
      </THead>
      <TBody>
        {
          members.map(member => (
            <Row key={member.id}>
              <Cell>{member.name}</Cell>
              <Cell>-</Cell>
              <Cell><Button style={{ margin: 0 }} onClick={() => onShowMember(member)}>Details</Button></Cell>
            </Row>
          ))
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
    if (this.props.members.length) {
      return
    }

    await Promise.all([
      this._loadMembers()
    ])
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
        this.props.setMembers(await response.json())

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

  handleShowMember = (order) => {
    this.setState({
      order
    })
  }

  handleShowMember = () => {
    this.setState({
      order: null
    })
  }

  handleSearchChange = (event) => {
    this.setState({
      filter: event.target.value.trim().toLowerCase()
    })
  }

  render () {
    const {
      loadingMembers,
      members
    } = this.props
    const {
      member,
      filter
    } = this.state

    if (member) {
      return (
        null // <Member member={member} onShowMembers={this.handleShowMembers} />
      )
    }

    let filteredMembers = members

    if (filter) {
      filteredMembers = filteredMembers.filter(member => {
        return member.name.toLowerCase().includes(filter)
      })
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
            <div>
              <Input type='search' placeholder='Search' value={filter} onChange={this.handleSearchChange} />
            </div>
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
