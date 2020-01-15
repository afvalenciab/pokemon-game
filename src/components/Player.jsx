import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { requestMorePokemons, getPokemonsError } from '../actions';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import PokemonCard from '../components/PokemonCard';
import logoPokemon from '../assets/static/Pokemon_logo.svg';
import '../assets/styles/Player.scss';

const Player = props => {
  const {
    pokemonList,
    requestMorePokemons,
    nextUrlPokemonsList,
    getPokemonsError
  } = props;

  const loaderUrl = useRef(nextUrlPokemonsList);
  const [element, setElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          requestMorePokemons(loaderUrl.current);
        }
      },
      { rootMargin: '0px 500px 0px 0px' }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

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
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nameOrIdPokemon}`
          );
          const data = await response.json();
          setSearchPokemon({
            ...searchPokemon,
            isSearching: true,
            pokemonSearched: data
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

  return (
    <section className='home--player'>
      <h2>Selecciona un Pokémon</h2>
      {pokemonList.length > 0 && (
        <Carousel>
          {!searchPokemon.isSearching &&
            pokemonList.map((item, index) => (
              <CarouselItem key={index} {...item} />
            ))}

          {!searchPokemon.isSearching && (
            <div className='observer' ref={setElement}></div>
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
          <input
            type='text'
            placeholder='Buscar Pokémon por nombre o Id'
            onChange={handleInput}
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
