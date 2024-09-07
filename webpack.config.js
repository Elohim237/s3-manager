const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: '/.env', // Optionnel : spécifie le chemin du fichier .env
    }),
  ],
};
