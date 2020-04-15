const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepo = {
    id: uuid(),
    // id: "1",
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepo);

  response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ error: "Repository not Found" });
  }

  const updateRepo = {
    ...repositories[index],
    title,
    url,
    techs,
  };

  repositories[index] = updateRepo;

  response.json(updateRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index === -1) {
    return response.status(400).json({ error: "Repository not Found" });
  }

  repositories.splice(index, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find((repo) => repo.id === id);

  // If repo exists
  if (repo) {
    repo.likes++;

    repositories.splice(
      repositories.findIndex((item) => item.id === repo.id),
      1,
      repo
    );
    return response.json(repo);
  } else {
    return response.status(400).json({ error: "Repository not Found" });
  }
});

module.exports = app;
