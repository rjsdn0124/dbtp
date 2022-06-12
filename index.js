const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "d201802145",
  password: "9378",
  database: "termproject",
  multipleStatements: true,
});

const app = express();
const port = 5050;
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  connection.connect();
  console.log(`Mov server listening at http://localhost:${port}`);
});

/**************post*************************** */
// 로그인
app.post("/login", async (req, res) => {
  const { id, pwd } = req.body;
  connection.query(
    "SELECT * from user where userid=?",
    id,
    function (error, result) {
      if (error) throw error;
      if (result.length) {
        if (result[0].password === pwd) {
          return res.status(200).send(result[0].userid);
        } else {
          return res.status(200).send("wrong password");
        }
      } else {
        return res.status(200).send("no id");
      }
    }
  );
});

// 예약
app.post("/book", (req, res) => {
  const { seats, userid, schid } = req.body;
  connection.query(
    "insert into ticketing_record(tdate,seats,status,userid,schid) values (curdate(),?,'b',?,?);update moschedule set sum=sum+? where schid=?;",
    [seats, userid, schid, seats, schid],
    function (error, result) {
      if (error) throw error;
      return res.status(200).send("true");
    }
  );
});

// 예약 취소
app.post("/cancel", (req, res) => {
  const { tid } = req.body;
  connection.query(
    "update ticketing_record set status = 'c', tdate=curdate() where tid=?;update moschedule set sum=sum-(select seats from ticketing_record where tid=?) where schid=(select schid from ticketing_record where tid=?);",
    [tid, tid, tid],
    function (error, result) {
      if (error) throw error;
      return res.status(200).send("true");
    }
  );
});

/**************get*************************** */

// 영화 목록
app.get("/list", (req, res) => {
  connection.query(
    "SELECT *, date_format(date,'%Y-%m-%d') date,date_format(date_add(date, interval 10 day),'%Y-%m-%d') expire, s.sum sum from movie inner join (select sum(sum) sum, mid from moschedule group by mid) s where movie.mid = s.mid",
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});

app.get("/actors", (req, res) => {
  const { mid } = req.query;
  connection.query(
    "SELECT * from movie_actors where mid=?",
    mid,
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});

// 영화 스케쥴
app.get("/schedule", (req, res) => {
  const { mid } = req.query;
  console.log(mid);
  connection.query(
    "SELECT *, date_format(sdate,'%Y-%m-%d %H') sdate from moschedule s inner join theater t where s.tname = t.tname and mid=?",
    mid,
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});

// 조인을 이용하여 유저의 예약 목록.
app.get("/booklist", (req, res) => {
  const { userid } = req.query;
  console.log(userid);
  connection.query(
    "SELECT *, date_format(tdate,'%Y-%m-%d') tdate, date_format(date,'%Y-%m-%d') date, date_format(sdate,'%Y-%m-%d %H') sdate from ticketing_record t inner join moschedule s inner join movie m where t.schid = s.schid and s.mid = m.mid and userid=? order by tdate desc",
    userid,
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});

// 롤업 함수 사용하여 영화별 영화관 할당 개수 반환
app.get("/admin/theatercountmov", (req, res) => {
  connection.query(
    "SELECT m.mtitle, count(s.tname) count from movie m inner join moschedule s where m.mid = s.mid group by m.mtitle with rollup;",
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});

// 롤업 함수 사용하여 영화관별 영화 할당 개수 반환
app.get("/admin/movcounttheater", (req, res) => {
  connection.query(
    "SELECT s.tname, count(m.mtitle) count, sum(m.time_length) sum from movie m inner join moschedule s where m.mid = s.mid group by s.tname with rollup;",
    function (error, result) {
      if (error) throw error;
      console.log(result);
      return res.status(200).send(result);
    }
  );
});

// 윈도우 함수를 사용하여 관객별 영화 예매 총 횟수 출력.(인원수로 합을 구함.)
app.get("/admin/watchcount", (req, res) => {
  connection.query(
    "select * from user u inner join (SELECT userid, sum(seats) sum from ticketing_record group by userid) t where u.userid=t.userid order by sum desc;",
    function (error, result) {
      if (error) throw error;
      return res.status(200).send(result);
    }
  );
});
