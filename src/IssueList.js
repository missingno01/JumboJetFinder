import React, { Component } from 'react';
import IssueView from './IssueView';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

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
      acType: ""
    };
    this.leftClick = this.leftClick.bind(this)
    this.rightClick = this.rightClick.bind(this)
    this.handleAirlines = this.handleAirlines.bind(this)
    this.handleAircraft = this.handleAircraft.bind(this)
  }



  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer g2g7vkdmwzx7dt6stvvrt35s");
    myHeaders.append("accept", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    //https://api.github.com/repos/walmartlabs/thorax/issues
    fetch("https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=LH&startDate=01JUN21&endDate=09JUN21&daysOfOperation=1234567&timeMode=UTC", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            issues: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
    this.setState({airlines: e.target.value});
  }

  handleAircraft(e) {
    this.setState({acType: e.target.value});
    console.log(e);
  }

  render() {
    const {classes} = this.props;
    const issueViews = this.state.issues.slice((this.state.pageNum - 1) * 10, this.state.pageNum * 10).map(
      issue => <IssueView key={issue.id} issue={issue} setDetails={this.props.setDetails} />
    )
    const { error, isLoaded, issues } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <h1>Jumbo Jet Finder| List of Flights</h1>
          <form>
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
              </Select>
              <FormHelperText>Select an aircraft type</FormHelperText>
            </FormControl>
          </form>
          <h3>Page: {this.state.pageNum}</h3>
          {(this.state.pageNum > 1) ? <button onClick={this.leftClick}>
            Left
          </button> : null}
          {(this.state.pageNum < this.state.issues.length / 10) ? <button onClick={this.rightClick}>
            Right
          </button> : null}

          {issueViews}
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(IssueList);
