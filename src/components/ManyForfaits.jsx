import { useState, useEffect } from "react";
import SingleForfait from "./SingleForfait";
import { Link, useLocation } from "react-router-dom";

const ManyForfaits = ({ forfaits, onDelete }) => {
  let divAddForfait = "";
  if (location.pathname === "/forfaits") {
    divAddForfait = (
      <div className="flex justify-end">
        <Link to="/AddForfait" className="text-blue-700 hover:underline">
          Ajouter un forfait
        </Link>
      </div>
    );
  }
  return (
    <>
      {divAddForfait}
      {/* <div className="flex justify-end">
        <Link to="/AddForfait" className="text-blue-700 hover:underline">
          Ajouter un forfait
        </Link>
      </div> */}
      <div className="grid grid-cols-3 gap-4">
        {forfaits.map((forfait) => (
          <SingleForfait
            forfait={forfait}
            key={forfait.id}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
};
export default ManyForfaits;
