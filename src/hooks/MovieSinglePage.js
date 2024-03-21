import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

export function MovieSinglePage(props) {
  const params = useParams();
  const id = params.movieId;
  const [movie, setMovie] = useState([]);
  const [isPending, setPending] = useState(false);
  useEffect(() => {
    setPending(true);

    (async () => {
      try {
        const res = await fetch(`https://localhost:7017/Film/${id}`);
        const movies = await res.json();
        setMovie(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    })();
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !movie.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3">
          <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            <h5>Kiadás éve: {movie.kiadasEve}</h5>
            <h5>Értékelés: {movie.ertekeles}</h5>
            <img
              src={
                movie.kepneve
                  ? process.env.PUBLIC_URL + "/" + movie.kepneve
                  : "https://via.placeholder.com/200"
              }
              className="card-img-top p-3"
              alt="kép"
            />
          </div>
          <div>
            <NavLink to="/">
              <i class="bi bi-backspace"></i>
            </NavLink>{" "}
            &nbsp;&nbsp;&nbsp;
            <NavLink key="y" to={"/mod-movie/" + movie.id}>
              <i class="bi bi-pencil"></i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
export default MovieSinglePage;
