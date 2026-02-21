import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddForfait = ({ onAdd }) => {
  const [nom, setnom] = useState("");
  const [description, setdescription] = useState("");
  const [prix, setprix] = useState("");
  const [categorie, setcategorie] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nom) {
      alert("Please add a forfait!");
      return;
    }
    if (!description) {
      alert("Please add a description!");
      return;
    }
    if (!prix) {
      alert("Please add a price!");
      return;
    }
    if (!categorie) {
      alert("Please add a category!");
      return;
    }
    onAdd({ nom, description, prix, categorie });
    setnom("");
    setdescription("");
    setprix("");
    setcategorie("");

    navigate("/forfaits");
  };
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control mb-4">
        <label>Forfait</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
          placeholder="Nom du forfait"
        />
      </div>
      <div className="form-control mb-4">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          placeholder="Description du forfait"
        />
      </div>
      <div className="form-control mb-4">
        <label>Prix</label>
        <input
          type="number"
          value={prix}
          onChange={(e) => setprix(e.target.value)}
          placeholder="Prix du Forfait"
        />
      </div>
      <div className="form-control mb-4">
        <label>Catégorie</label>
        <select
          value={categorie}
          onChange={(e) => setcategorie(e.target.value)}
        >
          <option value="">Sélectionner une catégorie</option>
          <option value="Plage">Plage</option>
          <option value="Culture">Culture</option>
          <option value="Aventure">Aventure</option>
        </select>
      </div>
      <input
        type="submit"
        className="btn btn-gray btn-block mt-4"
        value="Enregistrer le Forfait"
      />
    </form>
  );
};
export default AddForfait;
