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

  for (let i in moves) {
    try {
      const response = await axios.post('/fetch', { url: moves[i].move.url })
      if (response.data.priority === 0 && response.data.power) {
        movesArray.push({ name: response.data.name, power: response.data.power });
      }
    } catch (error) {
      //Continuar consultado el siguiente movimiento
    }
  }

  return movesArray.sort((a, b) => b.power - a.power).slice(0, 6);
};

export default getPokemonData;