const Pokemon = require('../models/pokemon');

module.exports = {
  getAllPokemon: async (req, res) => {
    try {
      const { limit = 100, offset = 0 } = req.query
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      res.status(500).json({ error: 'Failed to fetch Pokemon' });
    }
  },

  getPokemonByName: async (req, res) => {
    try {
      const { name } = req.params
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      res.json(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      res.status(500).json({ error: 'Failed to fetch Pokemon' });
    }
  },
  getPokemonDetails: async (req, res) => {
    try {
      const { name } = req.params
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();


      const speciesData = await fetch(data?.species?.url);
      const species = await speciesData.json()

      const evolutionData = await fetch(species?.evolution_chain?.url);
      const evolution = await evolutionData.json()

      const details = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(a => a.ability.name),
        evolution
      }

      res.json(details);

    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      res.status(500).json({ error: 'Failed to fetch Pokemon' });
    }
  },

  addFavorite: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Pokemon Name is required' });
      }

      await Pokemon.upsert({ name }, { name });

      res.json({ message: 'Pokemon added to favorites' });
    } catch (error) {
      console.error('Error adding favorite:', error);
      res.status(500).json({ error: 'Failed to add Pokemon to favorites' });
    }
  },

  removeFavorite: async (req, res) => {
    try {
      const name = req.params.name;
      const result = await Pokemon.destroy({
        where: {
          name
        }
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Pokemon not found in favorites' });
      }

      res.json({ message: 'Pokemon removed from favorites' });
    } catch (error) {
      console.error('Error removing favorite:', error);
      res.status(500).json({ error: 'Failed to remove Pokemon from favorites' });
    }
  },

  getFavorites: async (req, res) => {
    try {
      const page = parseInt(req?.query?.page) || 1;
      const limit = parseInt(req?.query?.limit) || 20;
      const offset = (page - 1) * limit;

      const { rows, count } = await Pokemon.findAndCountAll({
        limit,
        offset,
        order: [['created_at', 'DESC']]
      });

      res.json({
        favoritePokemon: rows,
        pagination: {
          total: count,
          page,
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Failed to fetch favorite Pokemon' });
    }
  },
}
