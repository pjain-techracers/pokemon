import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { RootState, AppDispatch } from '../store/store';
import { getPokemonDetails } from '../store/pokemonSlice';

const PokemonDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPokemon } = useSelector((state: RootState) => state.pokemon);

  if (!selectedPokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={() => dispatch(getPokemonDetails(null))}
          className="absolute top-4 right-4"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-48 h-48"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-3xl font-bold capitalize mb-4">{selectedPokemon.name}</h2>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Types</h3>
              <div className="flex gap-2">
                {selectedPokemon.types.map(( type ) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Abilities</h3>
              <ul className="list-disc list-inside">
                {selectedPokemon.abilities.map((ability ) => (
                  <li key={ability} className="capitalize">
                    {ability.replace('-', ' ')}
                  </li>
                ))}
              </ul>
            </div>

            {selectedPokemon.evolution && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Evolution Chain</h3>
                <div className="flex items-center gap-4">
                  <span className="capitalize">{selectedPokemon.evolution.chain.species.name}</span>
                  {selectedPokemon.evolution.chain.evolves_to.map(evolution => (
                    <React.Fragment key={evolution.species.name}>
                      <span>→</span>
                      <span className="capitalize">{evolution.species.name}</span>
                      {evolution.evolves_to.map(finalEvolution => (
                        <React.Fragment key={finalEvolution.species.name}>
                          <span>→</span>
                          <span className="capitalize">{finalEvolution.species.name}</span>
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail