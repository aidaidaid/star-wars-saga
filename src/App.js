import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// function App() {
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
    render(){
      <Switch>
        <Route exact path="/">
          <TMain />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
  }
}

export default App;