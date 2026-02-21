import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import SingleForfait from "./SingleForfait";

const Forfait = () => {
  const { id } = useParams();
  const [forfait, setForfait] = useState([]);
  useEffect(() => {
    const fetchForfait = async () => {
      try {
        const response = await fetch(`http://localhost:5000/forfaits/${id}`);
        const data = await response.json();
        setForfait(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchForfait();
  }, [id]);
  return (
    <>
      <SingleForfait forfait={forfait} key={forfait.id} />
      <div className="flex justify-end">
        {" "}
        <Link to="/forfaits" className="text-blue-700 hover:underline">
          Go Back
        </Link>
      </div>
    </>
  );
};
export default Forfait;
