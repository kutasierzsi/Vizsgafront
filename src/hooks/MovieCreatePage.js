import { useNavigate } from "react-router-dom";

export function MovieCreatePage() {
  const navigate = useNavigate();
  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Új film</h2>
      <form
        onSubmit={(event) => {
          event.persist();
          event.preventDefault();
          fetch(`https://localhost:7017/Film`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: event.target.elements.name.value,
              kiadasEve: event.target.elements.kiadasEve.value,
              ertekeles: event.target.elements.ertekeles.value,
            }),
          })
            .then(() => {
              navigate("/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Film neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="pl.: Star Wars"
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kiadás éve:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="kiadasEve"
              className="form-control"
              placeholder="pl.: 1977"
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
              placeholder="pl.: 9"
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="kep neve"
              className="form-control"
              placeholder="pl.: starwars.jpg"
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
export default MovieCreatePage;
