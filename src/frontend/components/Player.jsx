import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import { requestMorePokemons, getPokemonsError } from '../actions';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import PokemonCard from '../components/PokemonCard';
import logoPokemon from '../assets/static/Pokemon_logo.svg';
import '../assets/styles/Player.scss';
import en from '../lang/en';
import es from '../lang/es';

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);

const Player = props => {
  const {
    pokemonList,
    requestMorePokemons,
    nextUrlPokemonsList,
    getPokemonsError,
    lang
  } = props;

  counterpart.setLocale(lang ? lang : 'es');

  const loaderUrl = useRef(nextUrlPokemonsList);
  useEffect(() => {
    loaderUrl.current = nextUrlPokemonsList;
  }, [nextUrlPokemonsList]);

  const [searchPokemon, setSearchPokemon] = useState({
    isSearching: false,
    pokemonSearched: {},
    nameOrId: '',
    message: ''
  });

  const handleInput = (event) => {
    setSearchPokemon({
      ...searchPokemon,
      nameOrId: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchPokemon.nameOrId) {
      setSearchPokemon({
        ...searchPokemon,
        isSearching: true,
        message: 'Loading...'
      });

      const fetchData = async () => {
        try {
          const nameOrIdPokemon = searchPokemon.nameOrId.toLowerCase();
          const response = await axios.get(`/pokemon/${nameOrIdPokemon}`);

          setSearchPokemon({
            ...searchPokemon,
            isSearching: true,
            pokemonSearched: response.data,
          });
        } catch (error) {
          getPokemonsError(error);

          setSearchPokemon({
            ...searchPokemon,
            isSearching: true,
            pokemonSearched: {},
            message: 'No encontrado'
          });
        }
      };

      fetchData();
    } else {
      setSearchPokemon({
        ...searchPokemon,
        isSearching: false
      });
    }
  };

  const hanldeChangeInView = (inView, entry) => {
    if(inView){
      requestMorePokemons(loaderUrl.current);
    }
  };

  return (
    <section className='home--player'>
      <Translate content='choosePokemon' component='h2'/>
      {pokemonList.length > 0 && (
        <Carousel>
          {!searchPokemon.isSearching &&
            pokemonList.map((item, index) => (
              <CarouselItem key={index} {...item} />
            ))}

          {!searchPokemon.isSearching && (
            <InView onChange={hanldeChangeInView}>
              <div className='observer'></div>
            </InView>  
          )}

          {searchPokemon.isSearching &&
            (Object.keys(searchPokemon.pokemonSearched).length > 0 ? (
              <PokemonCard
                name={searchPokemon.pokemonSearched.name}
                urlPicture={searchPokemon.pokemonSearched.sprites.front_default}
              />
            ) : (
              <PokemonCard name={searchPokemon.message} urlPicture={logoPokemon} />
            ))}
        </Carousel>
      )}
      <div className='player--search'>
        <form onSubmit={handleSubmit}>
          <Translate 
            component='input'
            type='text'
            onChange={handleInput}
            attributes={{placeholder: 'placeholderSearch'}}
          />
          <button type='submit'>⟶</button>
        </form>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    pokemonList: state.pokemonList,
    nextUrlPokemonsList: state.nextUrlPokemonsList
  };
};

const mapDispatchToProps = {
  requestMorePokemons,
  getPokemonsError
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
