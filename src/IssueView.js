import React from 'react';
import {Link} from "react-router-dom";
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
        <Link to="/IssueDetails" >Get Details</Link>
      </div>
      </div>
    )
  }
}

export default IssueView;
