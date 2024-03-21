import React from "react";
import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { MovieListPage } from "./hooks/MovieListPage";
import { MovieCreatePage } from "./hooks/MovieCreatePage";
import { MovieModPage } from "./hooks/MovieModPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Filmek
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/new-movie"} className="nav-link">
                Új film
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path={"/"} element={<MovieListPage />} />
        <Route path={"/new-movie"} element={<MovieCreatePage />} />
        <Route path={"/mod-movie/:id"} element={<MovieModPage />} />
      </Routes>
    </Router>
  );
}

export default App;
