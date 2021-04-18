import React, { Component } from 'react';
import IssueView from './IssueView';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';



const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
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
      origin: "",
      dest: "",
      month: "",
      day: "",
      year: "",
      endMonth: "",
      endDay: "",
      endYear: "",
      status: 0,
    };
    this.leftClick = this.leftClick.bind(this)
    this.rightClick = this.rightClick.bind(this)
    this.handleAirlines = this.handleAirlines.bind(this)
    this.handleAircraft = this.handleAircraft.bind(this)
    this.handleOrigin = this.handleOrigin.bind(this)
    this.handleDest = this.handleDest.bind(this)
    this.handleMonth = this.handleMonth.bind(this)
    this.handleDay = this.handleDay.bind(this)
    this.handleYear = this.handleYear.bind(this)
    this.handleEndMonth = this.handleEndMonth.bind(this)
    this.handleEndDay = this.handleEndDay.bind(this)
    this.handleEndYear = this.handleEndYear.bind(this)
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

  handleOrigin(e) {
    this.setState({ origin: e.target.value });
  }

  handleMonth(e) {
    this.setState({ month: e.target.value });
  }

  handleDay(e) {
    this.setState({ day: e.target.value });
  }

  handleYear(e) {
    this.setState({ year: e.target.value });
  }

  handleEndMonth(e) {
    this.setState({ endMonth: e.target.value });
  }

  handleEndDay(e) {
    this.setState({ endDay: e.target.value });
  }

  handleEndYear(e) {
    this.setState({ endYear: e.target.value });
  }

  handleDest(e) {
    this.setState({ dest: e.target.value });
  }

  handleAircraft(e) {
    this.setState({ acType: e.target.value });
  }

  handleSubmit(e) {
    this.setState({ isLoaded: false, status: 0, issues: [] });
    e.preventDefault();
    var config = {
      headers: {
        'Authorization': 'Bearer g2g7vkdmwzx7dt6stvvrt35s'
      }
    };
    if (this.state.airlines === '') {
      alert('Please select airlines');
      return;
    }

    if ((parseInt(this.state.day[0]) > 3 && this.state.day.length > 1) || (parseInt(this.state.day) < 10 && this.state.day.length < 2)) {
      alert("please fix start day")
      return;
    }

    if ((parseInt(this.state.endDay[0]) > 3 && this.state.endDay.length > 1) || (parseInt(this.state.endDay) < 10 && this.state.endDay.length < 2)) {
      alert("please fix end day")
      return;
    }

    let url = 'https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=' + this.state.airlines + '&startDate=' + this.state.day + this.state.month +
     this.state.year + '&endDate=' + this.state.endDay + this.state.endMonth + this.state.endYear + '&daysOfOperation=1234567&timeMode=UTC';
    if (this.state.acType.length > 0) {
      url += '&aircraftTypes=' + this.state.acType;
    }

    if (this.state.origin.length > 0 && this.state.origin.length !== 3) {
      alert('ICAO code should be 3 letters for origin')
      return;
    }
    if (this.state.origin.length > 0) {
      url += '&origin=' + this.state.origin;
    }
    if (this.state.dest.length > 0 && this.state.dest.length !== 3) {
      alert('ICAO code should be 3 letters for destination')
      return;
    }
    if (this.state.dest.length > 0) {
      url += '&destination=' + this.state.dest;
    }

    axios.get(url, config).then((res) => {
      if (res.status === 200 || res.status === 206) {
        console.log(res.data);
        this.setState({ isLoaded: true, issues: res.data, status: res.status })
      }
    }).catch((err) => {
      console.log(err)
      this.setState({ status: err.response.status });
    })
  }

  render() {

    const { classes } = this.props;
    let issueViews;
    if (this.state.isLoaded) {
      issueViews = this.state.issues.slice((this.state.pageNum - 1) * 10, this.state.pageNum * 10).map(
        issue => <IssueView key={issue.id} issue={issue} setDetails={this.props.setDetails} />
      )
    }
    return (
      <div className="container">
        <h1>Jumbo Jet Finder | List of Flights</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <FormControl required className={classes.formControl}>
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
            </Grid>
            <Grid item>
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
                  <MenuItem value={'32N'}>Airbus A320 NEO</MenuItem>
                  <MenuItem value={'321'}>Airbus A321</MenuItem>
                  <MenuItem value={'32A'}>Airbus A320 (sharklets)</MenuItem>
                  <MenuItem value={'32B'}>Airbus A321 (sharklets)</MenuItem>
                  <MenuItem value={'77W'}>Boeing 777-300ER</MenuItem>
                </Select>
                <FormHelperText>Select an aircraft type</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField id="standard-basic" label="Origin ICAO" onChange={(e) => this.handleOrigin(e)} />
            </Grid>
            <Grid item>
              <TextField id="standard-basic" label="Dest. ICAO" onChange={(e) => this.handleDest(e)} />
            </Grid>
            <Grid item>
              <FormControl required className={classes.formControl}>
                <InputLabel required id="demo-simple-select-helper-label">Start Month</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.month}
                  onChange={this.handleMonth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'JAN'}>January</MenuItem>
                  <MenuItem value={'FEB'}>February</MenuItem>
                  <MenuItem value={'MAR'}>March</MenuItem>
                  <MenuItem value={'APR'}>April</MenuItem>
                  <MenuItem value={'MAY'}>MAY</MenuItem>
                  <MenuItem value={'JUN'}>June</MenuItem>
                  <MenuItem value={'JUL'}>July</MenuItem>
                  <MenuItem value={'AUG'}>August</MenuItem>
                  <MenuItem value={'SEP'}>September</MenuItem>
                  <MenuItem value={'OCT'}>October</MenuItem>
                  <MenuItem value={'NOV'}>November</MenuItem>
                  <MenuItem value={'DEC'}>December</MenuItem>
                </Select>
                <FormHelperText>Select Start month</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
            <FormControl required className={classes.formControl}>
                <TextField required id="standard-basic" label="Start Day" onChange={(e) => this.handleDay(e)} />
                <FormHelperText>Enter two digits</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Start Year</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.year}
                  onChange={this.handleYear}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'01'}>2001</MenuItem>
                  <MenuItem value={'02'}>2002</MenuItem>
                  <MenuItem value={'03'}>2003</MenuItem>
                  <MenuItem value={'04'}>2004</MenuItem>
                  <MenuItem value={'05'}>2005</MenuItem>
                  <MenuItem value={'06'}>2006</MenuItem>
                  <MenuItem value={'07'}>2007</MenuItem>
                  <MenuItem value={'08'}>2008</MenuItem>
                  <MenuItem value={'09'}>2009</MenuItem>
                  <MenuItem value={'10'}>2010</MenuItem>
                  <MenuItem value={'11'}>2011</MenuItem>
                  <MenuItem value={'12'}>2012</MenuItem>
                  <MenuItem value={'13'}>2013</MenuItem>
                  <MenuItem value={'14'}>2014</MenuItem>
                  <MenuItem value={'15'}>2015</MenuItem>
                  <MenuItem value={'16'}>2016</MenuItem>
                  <MenuItem value={'17'}>2017</MenuItem>
                  <MenuItem value={'18'}>2018</MenuItem>
                  <MenuItem value={'19'}>2019</MenuItem>
                  <MenuItem value={'20'}>2020</MenuItem>
                  <MenuItem value={'21'}>2021</MenuItem>
                </Select>
                <FormHelperText>Select Start Year</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">End Month</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.endMonth}
                  onChange={this.handleEndMonth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'JAN'}>January</MenuItem>
                  <MenuItem value={'FEB'}>February</MenuItem>
                  <MenuItem value={'MAR'}>March</MenuItem>
                  <MenuItem value={'APR'}>April</MenuItem>
                  <MenuItem value={'MAY'}>MAY</MenuItem>
                  <MenuItem value={'JUN'}>June</MenuItem>
                  <MenuItem value={'JUL'}>July</MenuItem>
                  <MenuItem value={'AUG'}>August</MenuItem>
                  <MenuItem value={'SEP'}>September</MenuItem>
                  <MenuItem value={'OCT'}>October</MenuItem>
                  <MenuItem value={'NOV'}>November</MenuItem>
                  <MenuItem value={'DEC'}>December</MenuItem>
                </Select>
                <FormHelperText>Select End Month</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required className={classes.formControl}>
                <TextField required id="standard-basic" label="End Day" onChange={(e) => this.handleEndDay(e)} />
                <FormHelperText>Enter two digits</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">End Year</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={this.state.endYear}
                  onChange={this.handleEndYear}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'01'}>2001</MenuItem>
                  <MenuItem value={'02'}>2002</MenuItem>
                  <MenuItem value={'03'}>2003</MenuItem>
                  <MenuItem value={'04'}>2004</MenuItem>
                  <MenuItem value={'05'}>2005</MenuItem>
                  <MenuItem value={'06'}>2006</MenuItem>
                  <MenuItem value={'07'}>2007</MenuItem>
                  <MenuItem value={'08'}>2008</MenuItem>
                  <MenuItem value={'09'}>2009</MenuItem>
                  <MenuItem value={'10'}>2010</MenuItem>
                  <MenuItem value={'11'}>2011</MenuItem>
                  <MenuItem value={'12'}>2012</MenuItem>
                  <MenuItem value={'13'}>2013</MenuItem>
                  <MenuItem value={'14'}>2014</MenuItem>
                  <MenuItem value={'15'}>2015</MenuItem>
                  <MenuItem value={'16'}>2016</MenuItem>
                  <MenuItem value={'17'}>2017</MenuItem>
                  <MenuItem value={'18'}>2018</MenuItem>
                  <MenuItem value={'19'}>2019</MenuItem>
                  <MenuItem value={'20'}>2020</MenuItem>
                  <MenuItem value={'21'}>2021</MenuItem>
                </Select>
                <FormHelperText>Select start year</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Find flights
              </Button>
            </Grid>
          </Grid>
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
