# Paridhi Jain

## Project Overview

This project exposes a Mini web app to check list of all the pokemon APIs. It offers certain features like adding your favorite pokemon, search pokemon by name, see list of favorite pokemons. It used React in Frontend and Node in backend.

## Frontend Tech stack

Tools and technologies used:

- React
- Redux
- vite
- HTML
- CSS
- Redux Thunk

## Running the Frontend application: Folder pokemon-frontend

Install all the dependencies `npm i`

```
npm run dev:frontend
```

## Backend Tech stack

Tools and technologies used:

- Node
- Express
- Mysql \*\* For persisting data
- Sequelize
- Sequelize-CLI
- Postman
- Pokémon APIs

## Backend Description

Application consist of pokémon APIs integration. It have below endpoints exposed

- Get All Pokemon `GET /pokemons` supports pagination with limit and offset
- Create favorites Pokemon `POST /pokemons`, does upsert in favourite table
- Get Pokemon by name `GET /pokemons/:name`
- Delete Pokemon by name `GET /pokemons/:name`
- Get all favorites pokemon with pagination `GET /favorites?page&limit&offset`
- Get Pokemon details like abilities, types and evolution by name `Get /pokemons/:name/info`

## Running the backend application: Folder pokemon-frontend

Install all the dependencies `npm i`

```
npm run dev:backend
```

Run migrations

```
npm run migrate
```

or

```
npx sequelize-cli db:migrate
```

Undo migration

```
npx sequelize-cli db:migrate:undo
```

or

```
npm run down
```

## Connect to Mysql using Command Line

```
mysql -u root -p
```

Enter the password if set or set using `ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';`
Connection to database

```
use pokemon_db;
```

See all tables

```
SHOW tables;
```

Fetch Favourites

```
SELECT * from favorites;
```

## Scope of Future Enhancements

- User login/logout
- Favourite can belong to user
- Authentication of user using JWT

Frontend

- Load all favourites on load
- Lazy loading on scroll
- Show pagination for list

## Additional Features: OUT OF THE BOX

- Implemented migrations for all the models
- Implemented mysql to persist data
- Added postman collection with example of each end point `Pokémon.postman_collection.json`
