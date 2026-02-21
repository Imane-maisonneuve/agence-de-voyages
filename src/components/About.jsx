import { Link } from "react-router-dom";
import { useEffect } from "react";
const About = () => {
  return (
    <>
      <div className="p-4 max-w-3xl mx-auto">
        <p className="mb-3">
          Depuis notre création, nous avons pour mission de faire de chaque
          voyage une expérience unique et inoubliable. Que vous rêviez de{" "}
          <strong>séjours culturels</strong>, d'
          <strong>aventures palpitantes</strong> ou de{" "}
          <strong>moments de détente sur la plage</strong>, notre équipe
          sélectionne pour vous les meilleurs forfaits touristiques adaptés à
          vos envies et à votre budget.
        </p>

        <p className="mb-3">
          Nous croyons que{" "}
          <strong>voyager, c’est découvrir le monde autrement</strong>, et nous
          nous engageons à vous offrir des services personnalisés, fiables et
          faciles à réserver. Notre passion pour le voyage se reflète dans la
          qualité de nos forfaits et dans notre accompagnement attentif à chaque
          étape de votre projet.
        </p>

        <p className="mb-5">
          Explorez notre site pour découvrir nos forfaits et laissez-nous
          transformer vos rêves de voyage en réalité !
        </p>

        <Link to="/" className="text-blue-700 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    </>
  );
};
export default About;
