import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Paper
} from 'material-ui'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class HomePage extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Paper>
            <h1>Peckham Cycle Club</h1>
            <p>We are a group of cyclists, meeting on weekends to ride together and catchup over coffee and climbs. We love meeting new and exciting people and hope that you too will join us some day soon.</p>
          </Paper>
        </Grid>
      </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage)
