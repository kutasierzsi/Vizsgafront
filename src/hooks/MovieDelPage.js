import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export function MovieDelPage(props) {
  const params = useParams();
  const id = params.movieId;
  const navigate = useNavigate();
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
            <h5 className="card-title">Törlendő elem: {movie.name}</h5>
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
          <form
            onSubmit={(event) => {
              event.persist();
              event.preventDefault();
              fetch(`https://localhost:7017/Film/${id}`, {
                method: "DELETE",
              })
                .then(() => {
                  navigate("/");
                })
                .catch(console.log);
            }}
          >
            <div>
              <NavLink to={"/"}>
                <button className="bi bi-backspace">&nbsp;Mégsem</button>
              </NavLink>
              &nbsp;&nbsp;
              <button className="bi bi-trash3">&nbsp;Törlés</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default MovieDelPage;
