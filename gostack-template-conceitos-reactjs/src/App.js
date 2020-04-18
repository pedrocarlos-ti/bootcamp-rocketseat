import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    function loadRepositories() {
      api
        .get("/repositories")
        .then(({ data }) => setRepositories(data))
        .catch((error) => console.log(error));
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    api
      .post("/repositories", {
        title: "Adicionar",
        author: "Pedro Santos #7159c1",
      })
      .then(({ data }) => setRepositories([...repositories, data]))
      .catch((error) => console.log(error));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then((_) => {
        setRepositories(repositories.filter((repo) => repo.id !== id));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
