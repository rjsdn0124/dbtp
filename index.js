const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Mov server listening at http://localhost:${port}`);
}); //포트 5050번에서 이 앱을 실행한다.

app.get("/", (req, res) => {
  return res.status(200).send("hing");
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
