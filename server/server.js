import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db/db-connection.js";

const app = express();
const PORT = 1020;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello from the server");
});

app.get("/players", async (req, res) => {
  try {
    const players = await db.any("SELECT * FROM players ORDER BY score", [
      true,
    ]);
    res.send(players);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/players", async (req, res) => {
  const newPlayer = {
    name: req.body.name,
    score: req.body.score,
  };
  console.log(newPlayer);
  try {
    const createdPlayer = await db.any(
      "INSERT INTO players(name, score) VALUES($1, $2) RETURNING *",
      [newPlayer.name, newPlayer.score]
    );
    // res.send(createdPlayer);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.put("players/:id", (req, res) => {
  console.log(req.params.id);
  // console.log(req.body);
});

app.delete("/players", async (req, res) => {
  try {
    await db.any("DELETE FROM players", [true]);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.listen(PORT, () => console.log(`sup, you're listening to port ${PORT}`));
