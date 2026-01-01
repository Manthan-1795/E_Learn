const express = require("express");
const pool = require("../db/pool");
const { authUser, roleAuthorization } = require("../utils/auth");
const result = require("../utils/createResult");

const router = express.Router();

router.get("/all-active-courses", (req, res) => {
  const sql =
    "SELECT * FROM courses WHERE CURDATE() BETWEEN start_date AND end_date";
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/all-courses", (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = "SELECT * FROM courses";
  const params = [];

  if (startDate && endDate) {
    sql += " WHERE start_date <= ? AND end_date >= ?";
    params.push(endDate, startDate);
  }

  pool.query(sql, params, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.post("/add", roleAuthorization, (req, res) => {
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;
  const sql =
    "insert into courses(course_name , description , fees , start_date , end_date , video_expire_days) values (?,?,?,?,?,?)";
  pool.query(
    sql,
    [course_name, description, fees, start_date, end_date, video_expire_days],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.put("/update/:course_id", roleAuthorization, (req, res) => {
  const { course_id } = req.params;
  const {
    course_name,
    description,
    fees,
    start_date,
    end_date,
    video_expire_days,
  } = req.body;

  const sql = `
    UPDATE courses
    SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ?
    WHERE course_id = ?
  `;

  pool.query(
    sql,
    [
      course_name,
      description,
      fees,
      start_date,
      end_date,
      video_expire_days,
      course_id,
    ],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.delete("/delete/:course_id", roleAuthorization, (req, res) => {
  const { course_id } = req.params;

  const sql = "DELETE FROM courses WHERE course_id = ?";

  pool.query(sql, [course_id], (error, data) => {
    if (error) {
      return res.send(result.createResult(error));
    }

    if (data.affectedRows === 0) {
      return res.send(result.createResult("Course not found"));
    }

    res.send(result.createResult(null, "Course deleted successfully"));
  });
});

module.exports = router;
