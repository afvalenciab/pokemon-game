import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { gettingPokemons, setPokemonsList, getPokemonsError } from '../actions';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

const App = (props) => {
  useEffect(() => {
    props.gettingPokemons();
    try {
      const fetchData = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        props.setPokemonsList(data);
      };
  
      fetchData();
    } catch (error) {
      props.getPokemonsError(error);
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = {
  gettingPokemons,
  setPokemonsList,
  getPokemonsError
};

export default connect(null, mapDispatchToProps)(App);