import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateForfait = ({ onUpdate }) => {
  const { id } = useParams();
  const [prix, setPrix] = useState(0);
  useEffect(() => {
    const fetchForfait = async () => {
      try {
        const response = await fetch(`http://localhost:5000/forfaits/${id}`);
        const data = await response.json();
        setPrix(data.prix);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchForfait();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, prix);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label>Prix</label>
        <input
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          placeholder="Prix du Forfait"
        />
      </div>
      <input
        type="submit"
        className="btn btn-gray btn-block mt-4"
        value="Modifier le prix"
      />
    </form>
  );
};
export default UpdateForfait;
