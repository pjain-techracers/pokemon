import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-purple-600 text-white p-4">
          <h1 className="text-2xl font-bold">Pokémon</h1>
        </nav>
        <main className="container mx-auto py-8">
          <PokemonList />
          <PokemonDetail />
        </main>
      </div>
    </Provider>
  );
}

export default App;
