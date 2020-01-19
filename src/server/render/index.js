
const render = (html, preloadedState) => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link href="assets/app.css" rel="stylesheet">
      <title>Batalla Pokémon</title>
    </head>
    <body>
      <div id='home'>${html}</div>
      <div id="modal-container"></div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script type="text/javascript" src="assets/app.js"></script>
    </body>
    </html>
  `);
};

export default render;
