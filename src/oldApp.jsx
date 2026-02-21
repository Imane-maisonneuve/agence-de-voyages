import Header from "./components/Header";
import ManyForfaits from "./components/ManyForfaits";
import AddForfait from "./components/AddForfait";
import Footer from "./components/Footer";
import About from "./components/About";
import Forfait from "./components/Forfait";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [forfaits, setForfaits] = useState([]);

  useEffect(() => {
    const getForfaits = async () => {
      const forfaitFromServer = await fetchForfaits(
        "http://localhost:5000/forfaits",
      );
      setForfaits(forfaitFromServer);
    };

    getForfaits();
    // const forfaitFromServer = [
    //   {
    //     id: "1",
    //     nom: "Séjour à Paris",
    //     description:
    //       "Visite de la tour Eiffel, du Louvre et croisière sur la Seine",
    //     prix: 1200,
    //     categorie: "Culture",
    //   },
    //   {
    //     id: "2",
    //     nom: "Vacances à Bali",
    //     description: "Plages paradisiaques, temples et excursions nature",
    //     prix: 1800,
    //     categorie: "Plage",
    //   },
    //   {
    //     id: "3",
    //     nom: "Safari au Kenya",
    //     description:
    //       "Observation des animaux sauvages dans la savane africaine",
    //     prix: 2500,
    //     categorie: "Aventure",
    //   },
    //   {
    //     id: "4",
    //     nom: "New York City Trip",
    //     description: "Découverte de Manhattan, Times Square et Central Park",
    //     prix: 1500,
    //     categorie: "Culture",
    //   },
    //   {
    //     id: "5",
    //     nom: "Croisière dans les Caraïbes",
    //     description: "Croisière de luxe avec escales sur plusieurs îles",
    //     prix: 2200,
    //     categorie: "Plage",
    //   },
    // ];

    // setForfaits(forfaitFromServer);
  }, []);

  const fetchForfaits = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const deleteForfait = async (id) => {
    await fetch(`http://localhost:5000/forfaits/${id}`, {
      method: "Delete",
    });
    setForfaits(forfaits.filter((forfait) => forfait.id !== id));
  };

  const toggleReminder = async (id) => {
    const forfaitToToggle = await fetchForfaits(
      `http://localhost:5000/forfaits/${id}`,
    );
    const updForfait = {
      ...forfaitToToggle,
      reminder: !forfaitToToggle.reminder,
    };
    const res = await fetch(`http://localhost:5000/forfaits/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updForfait),
    });
    const data = await res.json();
    setForfaits(
      forfaits.map((forfait) =>
        forfait.id === id ? { ...forfait, reminder: data.reminder } : forfait,
      ),
    );
  };

  const addForfait = async (forfait) => {
    // console.log(forfait)
    const res = await fetch("http://localhost:5000/forfaits", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(forfait),
    });
    // const lastId = forfaits.length > 0 ?  forfaits[forfaits.length -1].id : 0
    // const id  = lastId + 1
    // const newForfait = {id, ...forfait}
    const newForfait = await res.json();
    setForfaits([...forfaits, newForfait]);
  };

  const [showAddForfait, setShowAddForfait] = useState(false);

  return (
    <BrowserRouter>
      <div className="font-sans min-h-screen">
        <div className="container mx-auto p-8 mt-16 max-w-screen-md rounded-lg">
          <Header
            toggleForm={() => setShowAddForfait(!showAddForfait)}
            showAdd={showAddForfait}
          />
          {showAddForfait && <AddForfait onAdd={addForfait} />}
          <Routes>
            <Route
              path="/"
              element={
                <ManyForfaits
                  forfaits={forfaits}
                  onDelete={deleteForfait}
                  onToggle={toggleReminder}
                />
              }
            />
            <Route
              path="/forfaits"
              element={
                <ManyForfaits
                  forfaits={forfaits}
                  onDelete={deleteForfait}
                  onToggle={toggleReminder}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/forfait/:id"
              element={<Forfait setShowAddForfait={setShowAddForfait} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
