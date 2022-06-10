const express = require("express");
const odb = require("oracledb");

const config = {
  user: "d201802145",
  password: "9378",
  connectString: "localhost:1521/xe",
};

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Mov server listening at http://localhost:${port}`);
});

app.get("/", async (req, res) => {
  try {
    const conn = await odb.getConnection(config);
    const result = await conn.execute("SELECT * FROM TEAM");
  } catch (e) {
    return res.status(400).send(e);
  }
  return res.status(200).send(result);
});

app.post("/login", (req, res) => {
  return res.status(200).send();
});

app.post("/book", (req, res) => {
  return res.status(200).send();
});

app.get("/list", (req, res) => {
  return res.status(200).send();
});

app.get("/schedule", (req, res) => {
  return res.status(200).send();
});

app.get("/booklist", (req, res) => {
  return res.status(200).send();
});

app.get("/runtime", (req, res) => {
  return res.status(200).send();
});

app.get("/userlist", (req, res) => {
  return res.status(200).send();
});

app.post("/cancel", (req, res) => {
  return res.status(200).send();
});
