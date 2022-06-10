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

app.get("/", (req, res) => {
  odb.getConnection(config, function (err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute("SELECT * FROM TEAM", function (err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log(result.metaData);
      console.log(result.rows);

      doRelease(connection);
      return res.status(200).send(result);
    });
  });
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
