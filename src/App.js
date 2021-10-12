import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/header';
import Home from './components/home';
// import Characters from '';
// import CharacterCards from './components/characters/characterCards';
import Planets from './screens/planets';
import PlanetCards from './screens/planets/planetCard';
import Films from './components/films';
import FilmCards from './components/films/filmsCards';
import Species from './components/species';
import SpecieCards from './components/species/speciesCards';
import Vehicles from './components/vehicles';
import VehicleCards from './components/vehicles/vehiclesCards';
import Starships from './components/starships';
import StarshipCards from './components/starships/starshipsCards';
import Characters from './screens/characters';
import CharacterCards from './screens/characters/characterCard';
class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Router>
        <main>
          <Header/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/characters" component={Characters}/>
            <Route path={`/characters/:charId`} component={CharacterCards}/>
            <Route exact path={`/planets`} component={Planets}/>
            <Route path={`/planets/:planetId`} component={PlanetCards}/>
            <Route exact path={`/films`} component={Films}/>
            <Route path={`/films/:filmId`} component={FilmCards}/>
            <Route exact path={`/species`} component={Species}/>
            <Route path={`/species/:specieId`} component={SpecieCards}/>
            <Route exact path={`/vehicles`} component={Vehicles}/>
            <Route path={`/vehicles/:vehicleId`} component={VehicleCards}/>
            <Route exact path={`/starships`} component={Starships}/>
            <Route path={`/starships/:starshipId`} component={StarshipCards}/>
          </main>
      </Router>
    )
  }
}

export default App;