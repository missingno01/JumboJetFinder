import React, { Component } from 'react';
import IssueView from './IssueView';

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pageNum: 1,
      issues: []
    };
    this.leftClick = this.leftClick.bind(this)
    this.rightClick = this.rightClick.bind(this)
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
    fetch("https://api.lufthansa.com/v1/flight-schedules/flightschedules/passenger?airlines=LH&startDate=01JUN21&endDate=09JUN21&daysOfOperation=1234567&timeMode=UTC&origin=FRA", requestOptions)
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
  render() {
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

export default IssueList;
