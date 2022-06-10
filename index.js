const express = require("express");
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

const app = express();
const port = 5050;

app.listen(port, () => {
  console.log(`Mov server listening at http://localhost:${port}`);
}); //포트 5050번에서 이 앱을 실행한다.

app.post("/login", (req, res) => {
  return res.status(200).send();
});
app.get("/book", (req, res) => {
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
