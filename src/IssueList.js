import React, { Component } from "react";
import IssueView from "./IssueView";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

let emissions = new Map([
  ["74H", "2.82 L/100 km"],
  ["744", "3.34 L/100 km"],
  ["343", "3.49 L/100 km"],
  ["359", "2.39 L/100 km"],
  ["333", "2.98 L/100 km"],
  ["100", "9.99 L/100 km"],
  ["141", "9.99 L/100 km"],
  ["142", "9.99 L/100 km"],
  ["143", "9.99 L/100 km"],
  ["312", "9.99 L/100 km"],
  ["313", "9.99 L/100 km"],
  ["318", "9.99 L/100 km"],
  ["319", "2.95 L/100 km"],
  ["31A", "9.99 L/100 km"],
  ["31B", "2.89 L/100 km"],
  ["31N", "1.93 L/100 km"],
  ["320", "2.61 L/100 km"],
  ["32N", "2.25 L/100 km"],
  ["321", "2.50 L/100 km"],
  ["32A", "2.56 L/100 km"],
  ["32B", "2.45 L/100 km"],
  ["77W", "2.91 L/100 km"],
  ["787", "2.49 L/100 km"],
]);

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
      isLoading: false,
      startDate: new Date(),
      endDate: new Date(),
      status: 0,
    };
    this.leftClick = this.leftClick.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.handleAirlines = this.handleAirlines.bind(this);
    this.handleAircraft = this.handleAircraft.bind(this);
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleDest = this.handleDest.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleEndMonth = this.handleEndMonth.bind(this);
    this.handleEndDay = this.handleEndDay.bind(this);
    this.handleEndYear = this.handleEndYear.bind(this);
  }

  leftClick() {
    // Changing state
    if (this.state.pageNum > 1) {
      this.setState({ pageNum: this.state.pageNum - 1 });
    }
  }
  rightClick() {
    // Changing state
    if (this.state.pageNum < this.state.issues.length / 10) {
      this.setState({ pageNum: this.state.pageNum + 1 });
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
        Authorization: "Bearer 46cbcfqj8jbezhz8d9aecfpg",
      },
    };
    if (this.state.airlines === "") {
      alert("Please select airlines");
      return;
    }

    if (
      (parseInt(this.state.startDate.getDate()[0]) > 3 &&
        this.state.startDate.getDate().length > 1) ||
      (parseInt(this.state.startDate.getDate()) < 10 &&
        this.state.startDate.getDate().length < 2)
    ) {
      alert("please fix start day");
      return;
    }

    if (
      (parseInt((this.state.endDate.getDate() + "")[0]) > 3 &&
        this.state.endDay.length > 1) ||
      (parseInt(this.state.endDate.getDate()) < 10 &&
        this.state.endDay.length < 2)
    ) {
      alert("please fix end day");
      return;
    }

    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    let startDay =
      this.state.startDate.getDate() < 10
        ? "0" + this.state.startDate.getDate()
        : this.state.startDate.getDate();

    let endDay =
      this.state.endDate.getDate() < 10
        ? "0" + this.state.endDate.getDate()
        : this.state.endDate.getDate();

    let url =
      "https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=" +
      this.state.airlines +
      "&startDate=" +
      startDay +
      monthNames[this.state.startDate.getMonth()] +
      (this.state.startDate.getFullYear() + "").slice(-2) +
      "&endDate=" +
      endDay +
      monthNames[this.state.endDate.getMonth()] +
      (this.state.endDate.getFullYear() + "").slice(-2) +
      "&daysOfOperation=1234567&timeMode=UTC";
    if (this.state.acType.length > 0) {
      url += "&aircraftTypes=" + this.state.acType;
    }

    if (this.state.origin.length > 0 && this.state.origin.length !== 3) {
      alert("ICAO code should be 3 letters for origin");
      return;
    }
    if (this.state.origin.length > 0) {
      url += "&origin=" + this.state.origin;
    }
    if (this.state.dest.length > 0 && this.state.dest.length !== 3) {
      alert("ICAO code should be 3 letters for destination");
      return;
    }
    if (this.state.dest.length > 0) {
      url += "&destination=" + this.state.dest;
    }

    this.setState({ isLoading: true });

    axios
      .get(url, config)
      .then((res) => {
        if (res.status === 200 || res.status === 206) {
          console.log(res.data);
          this.setState({
            isLoading: false,
            isLoaded: true,
            issues: res.data,
            status: res.status,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false, status: err.response.status });
      });
  }

  render() {
    const { classes } = this.props;
    let issueViews;
    if (this.state.isLoaded) {
      issueViews = this.state.issues
        .sort(
          (a, b) =>
            (emissions.get(a.legs[0].aircraftType)
              ? parseFloat(
                  emissions.get(a.legs[0].aircraftType).substring(0, 4)
                )
              : 1000) -
            (emissions.get(b.legs[0].aircraftType)
              ? parseFloat(
                  emissions.get(b.legs[0].aircraftType).substring(0, 4)
                )
              : 1000)
        )
        .slice((this.state.pageNum - 1) * 10, this.state.pageNum * 10)
        .map((issue) => (
          <IssueView
            key={issue.id}
            issue={issue}
            setDetails={this.props.setDetails}
          />
        ));
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="container">
          <h1>ecoJet | List of Flights</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <FormControl required className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Airlines
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.airlines}
                    onChange={this.handleAirlines}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"LH"}>Lufthansa</MenuItem>
                    <MenuItem value={"LX"}>Swiss Air</MenuItem>
                    <MenuItem value={"WK"}>Air Dolomiti</MenuItem>
                    <MenuItem value={"XQ"}>SunExpress</MenuItem>
                    <MenuItem value={"WK"}>Edelweiss</MenuItem>
                    <MenuItem value={"OS"}>Austrian</MenuItem>
                    <MenuItem value={"SN"}>Brussels Airlines</MenuItem>
                    <MenuItem value={"EW"}>Eurowings</MenuItem>
                  </Select>
                  <FormHelperText>Select an airline</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Aircraft type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.acType}
                    onChange={this.handleAircraft}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"744"}>Boeing 747-400</MenuItem>
                    <MenuItem value={"74H"}>Boeing 747-800</MenuItem>
                    <MenuItem value={"343"}>Airbus A340-300</MenuItem>
                    <MenuItem value={"359"}>Airbus A350-900</MenuItem>
                    <MenuItem value={"333"}>Airbus A330-300</MenuItem>
                    <MenuItem value={"100"}>Fokker 100</MenuItem>
                    <MenuItem value={"141"}>BAE Systems 146-100</MenuItem>
                    <MenuItem value={"142"}>BAE Systems 146-200</MenuItem>
                    <MenuItem value={"143"}>BAE Systems 146-300</MenuItem>
                    <MenuItem value={"312"}>Airbus A310-200</MenuItem>
                    <MenuItem value={"313"}>Airbus A310-300</MenuItem>
                    <MenuItem value={"318"}>Airbus A318</MenuItem>
                    <MenuItem value={"319"}>Airbus A319</MenuItem>
                    <MenuItem value={"31A"}>Airbus A318 (sharklets)</MenuItem>
                    <MenuItem value={"31B"}>Airbus A319 (sharklets)</MenuItem>
                    <MenuItem value={"31N"}>Airbus A139neo</MenuItem>
                    <MenuItem value={"320"}>Airbus A320</MenuItem>
                    <MenuItem value={"32N"}>Airbus A320 NEO</MenuItem>
                    <MenuItem value={"321"}>Airbus A321</MenuItem>
                    <MenuItem value={"32A"}>Airbus A320 (sharklets)</MenuItem>
                    <MenuItem value={"32B"}>Airbus A321 (sharklets)</MenuItem>
                    <MenuItem value={"77W"}>Boeing 777-300ER</MenuItem>
                  </Select>
                  <FormHelperText>Select an aircraft type</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="Origin ICAO"
                  onChange={(e) => this.handleOrigin(e)}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="Dest. ICAO"
                  onChange={(e) => this.handleDest(e)}
                />
              </Grid>

              <Grid item>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  value={this.state.startDate}
                  onChange={(e) => {
                    this.setState({ startDate: e });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change start date",
                  }}
                />
              </Grid>

              <Grid item>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  format="MM/dd/yyyy"
                  value={this.state.endDate}
                  onChange={(e) => {
                    this.setState({ endDate: e });
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change end date",
                  }}
                />
              </Grid>

              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Find flights
                </Button>
              </Grid>
            </Grid>
          </form>

          {this.state.isLoading && <h3>Loading...</h3>}

          {this.state.isLoaded ? (
            <div>
              <h3>Page: {this.state.pageNum}</h3>
              {this.state.pageNum > 1 ? (
                <button onClick={this.leftClick}>Prev Page</button>
              ) : null}
              {this.state.pageNum < this.state.issues.length / 10 ? (
                <button onClick={this.rightClick}>Next Page</button>
              ) : null}
            </div>
          ) : null}

          {this.state.isLoaded ? issueViews : null}
          {this.state.status === 400 ? (
            <h1>Invalid parameters found, try again</h1>
          ) : null}
          {this.state.status === 404 ? (
            <h1>Couldn't find a flight with select parameters, try again</h1>
          ) : null}
          {this.state.status === 500 ? (
            <h1>
              Looks like the service is being overloaded, try again in a minute
            </h1>
          ) : null}
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(IssueList);
