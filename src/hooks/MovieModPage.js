import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function MovieModPage(props) {
  const params = useParams();
  const id = params.movieId;
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [modname, setModname] = useState("");
  const [modkiadasEve, setModKiadasEve] = useState("");
  const [modertekeles, setModErtekeles] = useState("");
  const [modkepnev, setModkepnev] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://localhost:7017/Film/${id}`);
        const movies = await res.json();
        setMovie(movies);
        setModname(movies.name);
        console.log(modname);
        setModKiadasEve(movies.kiadasEve);
        console.log(modkiadasEve);
        setModErtekeles(movie.ertekeles);
        console.log(modertekeles);
        setModkepnev(movies.kepnev);
        console.log(modkepnev);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, modname, modkepnev]);

  const modName = (event) => {
    setModname(event.target.value);
  };
  const modKepnev = (event) => {
    setModkepnev(event.target.value);
  };
  const modKiadasEve = (event) => {
    setModKiadasEve(event.target.value);
  };
  const modErtekeles = (event) => {
    setModErtekeles(event.target.value);
  };

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Filmek módosítása</h2>
      <form
        onSubmit={(event) => {
          event.persist();
          event.preventDefault();
          fetch(`https://localhost:7017/Film/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: event.target.elements.id.value,
              name: event.target.elements.name.value,
              kiadasEve: event.target.elements.kiadasEve.value,
              ertekeles: event.target.elements.ertekeles.value,
              kepnev: event.target.elements.kepnev.value,
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Film ID:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="id"
              className="form-control"
              value={movie.id}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Film neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              defaultValue={movie.name}
              onChange={modName}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kiadás éve:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="kiadaseve"
              className="form-control"
              defaultValue={movie.kiadasEve}
              onChange={modKiadasEve}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Értékelés:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="ertekeles"
              className="form-control"
              defaultValue={movie.ertekeles}
              onChange={modErtekeles}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="kepnev"
              className="form-control"
              defaultValue={movie.kepnev}
              onChange={modKepnev}
            />
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
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}
export default MovieModPage;
