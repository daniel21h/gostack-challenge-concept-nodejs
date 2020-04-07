const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Realizando busca
app.get("/repositories", (request, response) => {
  
  // Filtrando busca
  const { title } = request.query;

  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;
  
  const newRepository = { 
    id: uuid(), 
    title,
    url, 
    techs: [techs],
    likes: 0, 
  };

  repositories.push(newRepository)

  return response.json(newRepository)
});

// Realizando alteração
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // Procurando a posição do project dentro do vetor
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' })
  };

  const updateRepository = {
    id,
    title,
    url,
    techs: [techs],
    likes: repositories[repositoriesIndex].likes,
  };

  repositories[repositoryIndex] = updateRepository;

  return response.json(updateRepository);
});

// Deletar
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return this.response.status(400).json({ error: 'Repository not found.' })
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {

});

module.exports = app;
