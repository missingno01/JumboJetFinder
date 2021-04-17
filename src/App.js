import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import IssueDetails from './IssueDetails';
import IssueList from './IssueList';





class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
  }

  render(){
    return (
      <Router>
      <Switch>
        <Route exact path="/" render={() => <IssueList setDetails={(thing) => this.setState({details: thing})}/>}></Route>
        <Route path="/IssueDetails" render={() => <IssueDetails details={this.state.details}/>}></Route>
      </Switch>
      </Router>
    )
  }
}

export default App;
