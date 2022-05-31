import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
//import Pokedex from 'pokedex-promise-v2';
import './index.css';

//const P = new Pokedex();

function GetPokemon(props) {
  //alert(props.pokemon + " was submitted");
  let [error, setError] = useState(null);
  let [pokemon, setPokemon] = useState([]);
  let [isLoaded, setisLoaded] = useState(false);
  
  useEffect(() => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + props.pokemon;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setPokemon(result);
          setisLoaded(true);
      },
        (error) => {
          setisLoaded(true);
          setError(error);
        }
      )
  }, [props.pokemon])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {Object.keys(pokemon).map(key => (
          <div key={pokemon.id}>
            <li>Name: {pokemon.name}</li> 
            <li>ID: {pokemon.id}</li>
            <li>Abilities: {pokemon.abilities && pokemon.abilities.map((abilityObject) => abilityObject.ability.name).join(", ")}</li>
            <li>Height: {pokemon.height}</li>
            <li>Weight: {pokemon.weight}</li>
            <li>Type: {pokemon.types && pokemon.types.map((typesObject) => typesObject.type.name).join(", ")}</li>
            <li>Stats: {pokemon.stats && pokemon.stats.map((statsObject) => <ul>{statsObject.stat.name}: {statsObject.base_stat}</ul>)}</li>
            <p></p>
          </div>
        ))}
      </ul>
    );
  }
}

class Submit extends React.Component{
  constructor(props){
    super(props);
    this.state = {pokemon:"", submitting: false, isLoaded:false, Error:null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
      submitting: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({submitting: true});
    alert(this.state.pokemon + " was submitted. ");
  }


  render() {
    return(
      <div className="wrapper">
        <h1>Online Pokedex</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>
              <p>Enter a Pokemon (lowercase):</p>
              <input type="text" name="pokemon" value={this.state.pokemon} onChange={this.handleChange}/>
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
        <div>
        {this.state.submitting &&
        <div>
          {<GetPokemon
            pokemon={this.state.pokemon}
          />}
        </div>
        } 
        </div>
      </div>
    );
  }
}



/*
        {this.state.submitting &&
        <div>
          {<GetPokemon
            pokemon={this.state.pokemon}
          />}
        </div>
     }
*/

// class App extends React.Component{
  
//   render() {
//   return(
//     <main>
//       <Submit/>
//     </main>
//     );
//   }
// }

ReactDOM.render(
  <Submit/>,
  document.getElementById("root")
);