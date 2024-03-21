import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7017/Film")
      .then((res) => res.json())
      .then((moviess) => setMovies(moviess))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Filmek</h2>
          {movies.map((movie) => (
            <div className="card col-sm-3 d-inline-block m-1 p-2" key={movie.id}>
              <p className="text-dark">{movie.name}</p>
              <div className="card-body">
                <NavLink to={"/movie/" + movie.id}>{movie.name}</NavLink>
                <br />
                <NavLink to={"/mod-movie/" + movie.id}>
                  <i className="bi bi-pencil"></i>
                </NavLink>{" "}
                &nbsp;&nbsp;
                <NavLink to={"/del-movie/" + movie.id}>
                  <i className="bi bi-trash3"></i>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieListPage;