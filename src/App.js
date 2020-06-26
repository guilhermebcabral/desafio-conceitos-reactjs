import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const { data } = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`
    })

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    await api.delete(`/repositories/${id}`) 
    const newRepo = repositories.filter(repository => repository.id !== id)
    setRepositories(newRepo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          console.log(repository)
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
            </button>
            </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
