import React from 'react';
import {Link} from "react-router-dom";

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
        ['32N', '2.25 L/100 km'],
        ['321', '2.50 L/100 km'],
        ['32A', '2.56 L/100 km'],
        ['32B', '2.45 L/100 km'],
        ['77W', '2.91 L/100 km'],
        ['787', '2.49 L/100 km'],
        ['E90', '3.54 L/100 km']
    ])


class IssueView extends React.Component {


  render() {
    const issue = this.props.issue;
    //this.setState({details : issue})
    return(
    <div onClick={() => {this.props.setDetails(issue)}}>
      <div className="message">
        <div className="field">
          <span className="label">Airline: </span>
          <span className="value">{issue.airline}</span>
        </div>
        <div className="field">
          <span className="label">Aircraft: </span>
          <span className="value">{issue.legs[0].aircraftType}</span>
        </div>
        <div className="field content">
          <span className="label">Destination: </span>
          <span className="value">{issue.legs[0].destination}</span>
        </div>
        <div className="field">
          <span className="label2">Fuel per seat:&nbsp; </span>
          <span className="value">{emissions.get(issue.legs[0].aircraftType)}</span>
        </div>
        <Link to="/IssueDetails" >Get Details</Link>
      </div>
      </div>
    )
  }
}

export default IssueView;
