import React, { Component } from 'react';
import IssueView from './IssueView';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pageNum: 1,
      issues: [],
      airlines: "",
      acType: "",
      status: 0,
    };
    this.leftClick = this.leftClick.bind(this)
    this.rightClick = this.rightClick.bind(this)
    this.handleAirlines = this.handleAirlines.bind(this)
    this.handleAircraft = this.handleAircraft.bind(this)
  }

  leftClick() {

    // Changing state 
    if (this.state.pageNum > 1) {
      this.setState({ pageNum: this.state.pageNum - 1 })
    }
  }
  rightClick() {

    // Changing state
    if (this.state.pageNum < this.state.issues.length / 10) {
      this.setState({ pageNum: this.state.pageNum + 1 })
    }
  }
  handleAirlines(e) {
    this.setState({ airlines: e.target.value });
  }

  handleAircraft(e) {
    this.setState({ acType: e.target.value });
  }

  handleSubmit(e) {
    this.setState({isLoaded: false, status: 0});
    e.preventDefault();
    var config = {
      headers: {
        'Authorization': 'Bearer g2g7vkdmwzx7dt6stvvrt35s'
      }
    };
    if(this.state.airlines === '' || this.state.acType === '') {
      alert('Please select airlines and aircraft');
      return;
    }

    axios.get('https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=' + this.state.airlines + '&startDate=01JUN21&endDate=09JUN21&daysOfOperation=1234567&timeMode=UTC&aircraftTypes=' + this.state.acType, config).then((res) => {
      console.log(res)
      if (res.status === 200 || res.status === 206) {
        console.log(res.data);
        this.setState({isLoaded: true, issues: res.data, status: res.status})
      }
    }).catch((err) => {
      console.log(err)
      this.setState({ status: err.response.status });
    })
  }

  render() {

    let emissions = new Map([
        ['74H', '2.82 L/100 km'],
        ['744', '3.34 L/100 km'],
        ['343', '3.49 L/100 km'],
        ['359', '2.39 L/100 km'],
        ['333', '2.98 L/100 km'],
        ['100', '9.99 L/100 km'],
        ['141', '9.99 L/100 km'],
        ['142', '9.99 L/100 km'],
        ['143', '9.99 L/100 km'],
        ['312', '9.99 L/100 km'],
        ['313', '9.99 L/100 km'],
        ['318', '9.99 L/100 km'],
        ['319', '2.95 L/100 km'],
        ['31A', '9.99 L/100 km'],
        ['31B', '2.89 L/100 km'],
        ['31N', '1.93 L/100 km'],
        ['320', '2.61 L/100 km'],
        ['321', '2.50 L/100 km'],
        ['32A', '2.56 L/100 km'],
        ['32B', '2.45 L/100 km'],
        ['77W', '2.91 L/100 km'],
    ])

    const { classes } = this.props;
    let issueViews;
    if (this.state.isLoaded) {
      issueViews = this.state.issues.slice((this.state.pageNum - 1) * 10, this.state.pageNum * 10).map(
        issue => <IssueView key={issue.id} issue={issue} setDetails={this.props.setDetails} />
      )
    }
    return (
      <div className="container">
        <h1>Jumbo Jet Finder| List of Flights</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Airlines</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.airlines}
              onChange={this.handleAirlines}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'LH'}>Lufthansa</MenuItem>
              <MenuItem value={'LX'}>Swiss Air</MenuItem>
            </Select>
            <FormHelperText>Select an airline</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Aircraft type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.acType}
              onChange={this.handleAircraft}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'744'}>Boeing 747-400</MenuItem>
              <MenuItem value={'74H'}>Boeing 747-800</MenuItem>
              <MenuItem value={'343'}>Airbus A340-300</MenuItem>
              <MenuItem value={'359'}>Airbus A350-900</MenuItem>
              <MenuItem value={'333'}>Airbus A330-300</MenuItem>
              <MenuItem value={'100'}>Fokker 100</MenuItem>
              <MenuItem value={'141'}>BAE Systems 146-100</MenuItem>
              <MenuItem value={'142'}>BAE Systems 146-200</MenuItem>
              <MenuItem value={'143'}>BAE Systems 146-300</MenuItem>
              <MenuItem value={'312'}>Airbus A310-200</MenuItem>
              <MenuItem value={'313'}>Airbus A310-300</MenuItem>
              <MenuItem value={'318'}>Airbus A318</MenuItem>
              <MenuItem value={'319'}>Airbus A319</MenuItem>
              <MenuItem value={'31A'}>Airbus A318 (sharklets)</MenuItem>
              <MenuItem value={'31B'}>Airbus A319 (sharklets)</MenuItem>
              <MenuItem value={'31N'}>Airbus A139neo</MenuItem>
              <MenuItem value={'320'}>Airbus A320</MenuItem>
              <MenuItem value={'321'}>Airbus A321</MenuItem>
              <MenuItem value={'32A'}>Airbus A320 (sharklets)</MenuItem>
              <MenuItem value={'32B'}>Airbus A321 (sharklets)</MenuItem>
              <MenuItem value={'77W'}>Boeing 777-300ER</MenuItem>
            </Select>
            <FormHelperText>Select an aircraft type</FormHelperText>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
        {this.state.isLoaded ?
          <div>
            <h3>Page: {this.state.pageNum}</h3>
            {(this.state.pageNum > 1) ? <button onClick={this.leftClick}>
              Left
          </button> : null}
            {(this.state.pageNum < this.state.issues.length / 10) ? <button onClick={this.rightClick}>
              Right
          </button> : null}
          </div>
          : null
        }


        {this.state.isLoaded ? issueViews : null}
        {this.state.status === 400 ? <h1>Invalid parameters found, try again</h1> : null}
        {this.state.status === 404 ? <h1>Couldn't find a flight with select parameters, try again</h1> : null}
        {this.state.status === 500 ? <h1>Looks like the service is being overloaded, try again in a minute</h1> : null}
      </div>
    );

  }
}

export default withStyles(styles, { withTheme: true })(IssueList);
