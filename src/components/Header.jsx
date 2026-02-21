import { Link, useLocation } from "react-router-dom";

const Header = ({ title = "Agence de voyages" }) => {
  const location = useLocation();

  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 ">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">{title}</h1>

      <nav className="flex gap-4 mb-4 md:mb-0">
        <Link
          to="/"
          className={`hover:underline ${
            location.pathname === "/" ? "font-bold" : ""
          }`}
        >
          Accueil
        </Link>
        <Link
          to="/forfaits"
          className={`hover:underline ${
            location.pathname === "/forfaits" ? "font-bold" : ""
          }`}
        >
          Forfaits
        </Link>
        <Link
          to="/about"
          className={`hover:underline ${
            location.pathname === "/about" ? "font-bold" : ""
          }`}
        >
          À propos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
