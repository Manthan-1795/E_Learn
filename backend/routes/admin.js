const express = require("express");
const { roleAuthorization } = require("../utils/auth");
const pool = require("../db/pool");
const result = require("../utils/createResult");
const router = express.Router();


router.get("/enrolledstudents", roleAuthorization, (req, res) => {
  const { course_id } = req.query;

  let sql = `
    SELECT s.name, c.course_id, c.course_name
    FROM students s
    INNER JOIN courses c ON s.course_id = c.course_id
  `;

  const params = [];

  if (course_id) {
    sql += " WHERE c.course_id = ?";
    params.push(course_id);
  }

  pool.query(sql, params, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

module.exports = router;