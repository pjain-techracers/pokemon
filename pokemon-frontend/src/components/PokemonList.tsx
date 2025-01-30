import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, HeartOff, Search, X } from 'lucide-react';
import { RootState, AppDispatch } from '../store/store';
import { 
  fetchPokemonList, 
  toggleFavorite,
  searchPokemon,
  clearSearchResult,
  getPokemonDetails,
} from '../store/pokemonSlice';
import { Pokemon } from '../types/pokemon';

const PokemonList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemonList, favorites, loading, error, searchResult } = useSelector((state: RootState) => state.pokemon);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPokemonList({}));
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchPokemon(searchTerm.trim()));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    dispatch(clearSearchResult());
  };

  const filteredPokemon = showFavoritesOnly
    ? pokemonList.filter(pokemon => favorites.includes(pokemon.name))
    : pokemonList;

  const renderPokemonCard = (pokemon: Pokemon, index?: number) => (
    <div
      key={pokemon.id ?? index}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
      onClick={() => dispatch(getPokemonDetails(pokemon.name))}
    >
      <div className="relative">
        <img
          src={pokemon?.sprites?.front_default ??`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(pokemon.name));
          }}
          className="absolute top-0 right-0 p-2"
        >
          {favorites.includes(pokemon.name) ? (
            <Heart className="w-6 h-6 text-red-500 fill-current" />
          ) : (
            <HeartOff className="w-6 h-6 text-gray-400" />
          )}
        </button>
      </div>
      <h2 className="text-xl font-semibold text-center capitalize mt-2">
        {pokemon.name}
      </h2>
    </div>
  );

  if (loading) return <div className="text-center py-8">Loading Pokémon...</div>;

  return (
    <div className="p-4">
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pokémon List</h1>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            disabled={loading}
          >
            {showFavoritesOnly ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Pokémon by name..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!searchTerm.trim() || loading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center py-2">{error}</div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResult ? (
          renderPokemonCard(searchResult)
        ) : (
          filteredPokemon.map(renderPokemonCard)
        )}
      </div>
    </div>
  );
}

export default PokemonList;