export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  image: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  type: string[];
}

export interface PokemonEvolution {
  chain: {
    species: {
      name: string;
    };
    evolves_to: {
      species: {
        name: string;
      };
      evolves_to: {
        species: {
          name: string;
        };
      }[];
    }[];
  };
}

export interface PokemonDetails {
  "id": number,
  "name": string,
  "image": string
  "types": string[]
  "abilities": string[]
  "evolution": PokemonEvolution
}