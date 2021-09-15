import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
import Characters from './components/characters';
import CharacterCards from './components/characterCards';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataPeople: [],
      searchInput: ""
    }
  }
  // componentDidMount(){
  //   async function getPeople(){
  //     let peopleData = await fetch('https://swapi.dev/api/people')
  //     let dataPeople = peopleData.json();
  //     this.setState({dataPeople: dataPeople})
  //   }
  //   getPeople()
  // }
  getCharacters = async()=>{
        // async function getPeople(){
        // let peopleData = await fetch('https://swapi.dev/api/people/?format=json')
        // let dataPeople = await peopleData.json();
        fetch('https://swapi.dev/api/people/?format=json')
        .then((data)=>data.json())
        .then((response)=>{
            if (response.error) alert('Data not found')
            // let dataPeople = [];
            this.setState({dataPeople: response.results})
            // console.log(this.state.dataPeople)
        }

        )
    }
    componentDidMount(){
        this.getCharacters();
    }

    render(){
      return(
        <Router>
          <main>
            <Header/>
              <Route exact path="/" component={Home}/>
              <Route path="/characters" component={Characters}/>
              <Route path={`/characters/0`} component={CharacterCards}/>
                {/* <CharacterCards/>
              </Route> */}
          </main>
        </Router>
      )
  }
}

export default App;