import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pokemon, PokemonDetails } from '../types/pokemon';

interface PokemonState {
  pokemonList: Pokemon[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  selectedPokemon: PokemonDetails | null;
  searchResult: Pokemon | null;
  nextOffset: number;
  loadingPokemons: boolean
}

const initialState: PokemonState = {
  pokemonList: [],
  favorites: [],
  loading: false,
  error: null,
  selectedPokemon: null,
  searchResult: null,
  nextOffset: 0,
  loadingPokemons: false
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async ({ limit = 150, offset = 0 }: { limit?: number; offset?: number }) => {
    limit = limit ?? 150;
    offset = offset ?? 0;
    const response = await axios.get(`http://localhost:3000/api/pokemons?limit=${limit}&offset=${offset}`);
    const pokemonDetails = response.data.results;

    return pokemonDetails;
  }
);

export const searchPokemon = createAsyncThunk(
  'pokemon/searchPokemon',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/pokemons/${name.toLowerCase()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Pokémon not found');
    }
  }
);
export const addFavouritePokemon = createAsyncThunk(
  'pokemon/addFavorite',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/favorites`, {
        name
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Cannot create favourite');
    }
  }
);
export const removeFavouritePokemon = createAsyncThunk(
  'pokemon/removeFavorite',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/favorites/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Cannot create favourite');
    }
  }
);
export const fetchFavourite = createAsyncThunk(
  'pokemon/fetchFavourite',
  async () => {
    const response = await axios.get(`http://localhost:3000/api/favorites`);
    return response.data;
  }
);

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (name: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const state: any = getState();
      const isFavorite = state?.pokemon.favorites?.includes(name);

      if (isFavorite) {
        await dispatch(removeFavouritePokemon(name));
      } else {
        await dispatch(addFavouritePokemon(name));
      }

      return name;
    } catch (error) {
      return rejectWithValue(error);
    }

  }
);

export const getPokemonDetails = createAsyncThunk(
  'pokemon/getPokemonDetails',
  async (name: string | null, { rejectWithValue }) => {
    try {
      if (!name) {
        return Promise.resolve(null)
      }
      const response = await axios.get(`http://localhost:3000/api/pokemons/${name}/info`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Cannot create favourite');
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    clearSearchResult: (state) => {
      state.searchResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
        state.nextOffset = state.pokemonList.length;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemon';
      })
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResult = null;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const name = action.payload;
        if (state.favorites.includes(name)) {
          state.favorites = state.favorites.filter((item) => item !== name);
        } else {
          state.favorites.push(name);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload.favoritePokemon;
      })
      .addCase(fetchFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPokemon = action.payload;
      })
      .addCase(getPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResult } = pokemonSlice.actions;
export default pokemonSlice.reducer;  