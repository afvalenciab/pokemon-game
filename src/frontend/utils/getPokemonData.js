import axios from 'axios';

const getPokemonData = async (nameOrId, player) => {
  let pokemon = {
    name: '',
    picture: '',
    lifeBar: 0,
    moves: []
  };

  try {
    const response = await axios.get(`/pokemon/${nameOrId}`);
    const maximumPower = await getMaximumPower(response.data.moves);

    pokemon = {
      name: response.data.name,
      picture: player === 'PlayerOne' ? response.data.sprites.front_default : response.data.sprites.back_default,
      pictureDefault: response.data.sprites.front_default,
      lifeBar: 100,
      moves: maximumPower
    };
  } catch (error) {
    pokemon = {
      ...pokemon,
      name: 'Error Buscando Pokemon',
    };
  }

  return pokemon;
};

const getMaximumPower = async (moves) => {
  const movesArray = [];
  const numberOfMovements = moves.length;
  let limitOfMovements;

  if (numberOfMovements <= 6) {
    limitOfMovements = numberOfMovements;
  } else {
    limitOfMovements = 6;
  }

  while (movesArray.length < limitOfMovements) {
    let randomNumber = Math.floor(Math.random() * (numberOfMovements));

    try {
      const response = await axios.post('/fetch', { url: moves[randomNumber].move.url });
      if (response.data.priority === 0 && response.data.power) {
        movesArray.push({ name: response.data.name, power: response.data.power });
      }
    } catch (error) {
      console.log(error);
      //Continuar consultado el siguiente movimiento
    }
  }

  return movesArray;
};


export default getPokemonData;