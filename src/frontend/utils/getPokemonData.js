
const getPokemonData = async (nameOrId, player) => {
  let pokemon = {
    name: '',
    picture: '',
    lifeBar: 0,
    moves: []
  };

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    const data = await response.json();
    const maximumPower = await getMaximumPower(data.moves);

    pokemon = {
      name: data.name,
      picture: player === 'PlayerOne' ? data.sprites.front_default : data.sprites.back_default,
      pictureDefault: data.sprites.front_default,
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
      const responseMove = await fetch(moves[i].move.url);
      const dataMove = await responseMove.json();

      if (dataMove.priority === 0 && dataMove.power) {
        movesArray.push({ name: dataMove.name, power: dataMove.power });
      }
    } catch (error) {
      //Continuar consultado el siguiente movimiento
    }
  }

  return movesArray.sort((a, b) => b.power - a.power).slice(0, 6);
};

export default getPokemonData;