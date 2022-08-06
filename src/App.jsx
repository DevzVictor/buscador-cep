import { FiSearch } from "react-icons/fi";
import "./App.css";
import { useState } from "react";
import API from "./services/Api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Digite algum CEP");
      return;
    }

    try {
      const response = await API.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Digite um cep valido");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador erro ao iniciar CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
