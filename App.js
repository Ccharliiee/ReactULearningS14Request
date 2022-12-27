import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const dummyMovies = [
    {
      id: 1,
      title: "Some Dummy Movie",
      openingText: "This is the opening text of the movie",
      releaseDate: "2021-05-18",
    },
    {
      id: 2,
      title: "Some Dummy Movie 2",
      openingText: "This is the second opening text of the movie",
      releaseDate: "2021-05-19",
    },
  ];

  const [moviesState, setMoviesState] = useState(dummyMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const getStarWarsMovies = async () => {
    setIsLoading(true);
    setErrorState(null);

    try {
      const starWarsMoviesResponse = await fetch("https://swapi.dev/api/films/")
        .then((Response) => {
          return Response.json();
        })
        .catch((e) => {
          throw e;
        });
      const moviesFormated = starWarsMoviesResponse.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMoviesState(moviesFormated);
      setIsLoading(false);
    } catch (error) {
      setErrorState(error.message + "errorfilms");
    }
    setIsLoading(false);
  };

  return (
    <>
      <section>
        <button onClick={getStarWarsMovies}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>loading movies</p>}
        {errorState && <p>{errorState}</p>}
        {!isLoading && !errorState && <MoviesList movies={moviesState} />}
      </section>
    </>
  );
}

export default App;
