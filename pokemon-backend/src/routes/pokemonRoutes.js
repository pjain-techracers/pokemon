const express = require('express');
const PokemonController = require('../controllers/pokemonController.js');

const router = express.Router();

router.get('/pokemons', PokemonController.getAllPokemon);
router.post('/favorites', PokemonController.addFavorite);
router.delete('/favorites/:name', PokemonController.removeFavorite);
router.get('/favorites', PokemonController.getFavorites);
router.get('/pokemons/:name', PokemonController.getPokemonByName);
router.get('/pokemons/:name/info', PokemonController.getPokemonDetails);

module.exports = router;
