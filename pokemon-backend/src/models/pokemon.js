'use strict';

const Sequelize = require('sequelize');
const sequelize = require('./index');

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: { type: Sequelize.STRING, unique: true }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'pokemons',
});

module.exports = Pokemon
