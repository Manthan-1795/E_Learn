const express = require("express");
const pool = require("../db/pool");
const request = require("../utils/createResult");
const { roleAuthorization } = require("../utils/auth");
const router = express.Router();

/* Get videos by course */
router.get("/course/:course_id", roleAuthorization, (req, res) => {
  const { course_id } = req.params;
  const sql = "SELECT * FROM videos WHERE course_id = ?";

  pool.query(sql, [course_id], (error, data) => {
    res.send(request.createResult(error, data));
  });
});

/* Get all videos */
router.get("/all-videos", roleAuthorization, (req, res) => {
  const sql = "SELECT * FROM videos order by course_id";
  pool.query(sql, (error, data) => {
    res.send(request.createResult(error, data));
  });
});

/* Add video */
router.post("/add", roleAuthorization, (req, res) => {
  const { course_id, title, youtube_url, description } = req.body;

  const sql =
    "INSERT INTO videos (course_id, title, youtube_url, description, added_at) VALUES (?, ?, ?, ?, CURDATE())";

  pool.query(
    sql,
    [course_id, title, youtube_url, description],
    (error, data) => {
      res.send(request.createResult(error, data));
    }
  );
});

/* Delete video */
router.delete("/delete/:video_id", roleAuthorization, (req, res) => {
  const { video_id } = req.params;
  const sql = "DELETE FROM videos WHERE video_id = ?";

  pool.query(sql, [video_id], (error, data) => {
    res.send(request.createResult(error, data));
  });
});

module.exports = router;
