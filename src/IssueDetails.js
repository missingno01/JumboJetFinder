import React from "react";
const IssueDetails = (props) => {
    const issue = props.details;
  return (
    <div className="message">
        <div className="field">
          <span className="label2">Flight Number:&nbsp; </span>
          <span className="value">{issue.airline + issue.flightNumber}</span>
        </div>
        <div className="field">
          <span className="label2">Airline:&nbsp; </span>
          <span className="value">{issue.airline}</span>
        </div>
        <div className="field">
          <span className="label2">Aircraft:&nbsp; </span>
          <span className="value">{issue.legs[0].aircraftType}</span>
        </div>
        <div className="field">
          <span className="label2">Departure Airport:&nbsp; </span>
          <span className="value">{issue.legs[0].origin}</span>
        </div>
        <div className="field">
          <span className="label2">Departure Time (Local):&nbsp; </span>
          <span className="value">{issue.legs[0].aircraftDepartureTimeLT}</span>
        </div>
        <div className="field">
          <span className="label2">Arrival Airport:&nbsp; </span>
          <span className="value">{issue.legs[0].destination}</span>
        </div>
        <div className="field">
          <span className="label2">Arrival Time (Local):&nbsp; </span>
          <span className="value">{issue.legs[0].aircraftArrivalTimeLT}</span>
        </div>
 
      </div>
  );
}
export default IssueDetails;