import { FaTimes, FaEye } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

const SingleForfait = ({ forfait, onDelete }) => {
  const location = useLocation();
  let deleteButton = "";
  let viewButton = "";
  let updateButton = "";
  if (location.pathname === "/forfaits") {
    deleteButton = (
      <div className="flex items-center pb-2">
        <FaTimes
          className="text-red-600 cursor-pointer ml-auto"
          onClick={() => onDelete(forfait.id)}
        />
      </div>
    );
    viewButton = (
      <Link to={`/forfait/${forfait.id}`} className="mr-3 text-blue-900">
        <FaEye />
      </Link>
    );
    updateButton = (
      <Link to={`/UpdateForfait/${forfait.id}`} className="mr-3 text-blue-900">
        <GrUpdate />
      </Link>
    );
  }

  return (
    <div className="bg-blue-200 p-2 my-4 px-4 rounded shadow">
      {deleteButton}
      <img
        src={forfait.imageUrl}
        alt={forfait.nom}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg flex justify-between items-center">
          {forfait.nom}
        </h3>
        {viewButton}
      </div>
      <p className="text-sm text-gray-700">{forfait.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold mt-2">{forfait.prix} $</p> {updateButton}
      </div>
      <p className="text-xs text-blue-900 mt-1">
        Catégorie : {forfait.categorie}
      </p>
    </div>
  );
};

export default SingleForfait;
