import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import ManyForfaits from "./components/ManyForfaits";
import AddForfait from "./components/AddForfait";
import Forfait from "./components/Forfait";
import UpdateForfait from "./components/UpdateForfait";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import listeForfaits from "./data/listeForfaits.jsx";

function App() {
  const [serverAvailable, setServerAvailable] = useState(true);
  const [forfaits, setForfaits] = useState([]);

  useEffect(() => {
    const getForfaits = async () => {
      try {
        const forfaitFromServer = await fetchForfaits(
          "http://localhost:5000/forfaits",
        );

        setForfaits(forfaitFromServer);
        setServerAvailable(true);
        console.log("Scénario 2 : Serveur simulé");
      } catch (error) {
        console.log("Scénario 1 : Client-side");

        setForfaits(listeForfaits);
        setServerAvailable(false);
      }
    };

    getForfaits();
  }, []);

  const fetchForfaits = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const addForfait = async (forfait) => {
    if (serverAvailable) {
      const res = await fetch("http://localhost:5000/forfaits", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(forfait),
      });
      const newForfait = await res.json();
      setForfaits([...forfaits, newForfait]);
    } else {
      const lastId = forfaits.length > 0 ? forfaits[forfaits.length - 1].id : 0;
      const id = lastId + 1;
      const newForfait = { id, ...forfait };
      setForfaits([...forfaits, newForfait]);
    }
  };

  const deleteForfait = async (id) => {
    if (serverAvailable) {
      await fetch(`http://localhost:5000/forfaits/${id}`, {
        method: "Delete",
      });
    }
    setForfaits(forfaits.filter((forfait) => forfait.id !== id));
  };

  const updateForfait = async (id, nouveauPrix) => {
    const forfaitUpdate = await fetchForfaits(
      `http://localhost:5000/forfaits/${id}`,
    );
    const updForfait = {
      ...forfaitUpdate,
      prix: Number(nouveauPrix),
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
        forfait.id === id ? { ...forfait, ...data } : forfait,
      ),
    );
  };

  return (
    <BrowserRouter>
      <div className="font-sans min-h-screen">
        <div className="container mx-auto p-8 mt-16 max-w-3xl rounded-lg">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <ManyForfaits forfaits={forfaits} onDelete={deleteForfait} />
              }
            />

            <Route
              path="/forfaits"
              element={
                <ManyForfaits forfaits={forfaits} onDelete={deleteForfait} />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/forfait/:id" element={<Forfait />} />
            <Route
              path="/AddForfait"
              element={<AddForfait onAdd={addForfait} />}
            />
            <Route
              path="/UpdateForfait/:id"
              element={<UpdateForfait onUpdate={updateForfait} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
