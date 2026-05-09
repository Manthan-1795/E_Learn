const express = require("express");
const pool = require("../db/pool");
const result = require("../utils/createResult");
const cryptojs = require("crypto-js");

const router = express.Router();

router.post("/register-to-course", (req, res) => {
  const { name, email, course_id, mobile_no } = req.body;

  if (!name || !email || !course_id || !mobile_no) {
    return res.send({ status: "error", message: "All fields are required" });
  }

  // Step 1: Check already registered for this course
  pool.query(
    "SELECT * FROM students WHERE email = ? AND course_id = ?",
    [email, course_id],
    (err, rows) => {
      if (err) return res.send({ status: "error", error: err });

      if (rows.length > 0) {
        return res.send({
          status: "exists",
          message: "Already registered for this course",
        });
      }

      // Step 2: Check if user account exists
      pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, users) => {
          if (err) return res.send({ status: "error", error: err });

          if (users.length === 0) {
            // New user — create account FIRST, then register student inside callback
            const hashedPassword = cryptojs.SHA256("student").toString();
            pool.query(
              "INSERT INTO users(email, password) VALUES (?, ?)",
              [email, hashedPassword],
              (err) => {
                if (err) return res.send({ status: "error", error: err });

                // User saved — now insert student
                pool.query(
                  "INSERT INTO students(name, email, course_id, mobile_no) VALUES(?, ?, ?, ?)",
                  [name, email, course_id, mobile_no],
                  (err, data) => {
                    if (err) return res.send({ status: "error", error: err });
                    return res.send({ status: "success", data });
                  },
                );
              },
            );
          } else {
            // Existing user — just register student
            pool.query(
              "INSERT INTO students(name, email, course_id, mobile_no) VALUES(?, ?, ?, ?)",
              [name, email, course_id, mobile_no],
              (err, data) => {
                if (err) return res.send({ status: "error", error: err });
                return res.send({ status: "success", data });
              },
            );
          }
        },
      );
    },
  );
});

router.put("/change-password", (req, res) => {
  const email = req.headers.email;
  const { newPassword, confirmPassword } = req.body;
  if (newPassword == confirmPassword) {
    const hashedPassword = cryptojs.SHA256(newPassword).toString();
    const sql = `UPDATE users SET password = ? WHERE email = ?`;
    pool.query(sql, [hashedPassword, email], (error, data) => {
      res.send(result.createResult(error, data));
    });
  } else {
    res.send(`Password Does Not Match`);
  }
});

router.get("/my-courses/:email", (req, res) => {
  const { email } = req.params;

  const sql = `
    SELECT DISTINCT c.course_id, c.course_name, c.description, c.fees
    FROM courses c
    JOIN students s ON c.course_id = s.course_id
    WHERE s.email = ?
  `;

  pool.query(sql, [email], (err, data) => {
    if (err) {
      res.send({ status: "error", error: err });
    } else {
      res.send({ status: "success", data });
    }
  });
});

router.get("/my-course-with-videos", (req, res) => {
  const email = req.headers.email;
  if (!email) {
    return res.send(result.createResult("Unauthorized"));
  }
  const sql = `
    SELECT DISTINCT
      c.course_id,
      v.video_id,
      v.title,
      v.description,
      v.youtube_url,
      v.added_at
    FROM students s
    JOIN courses c ON c.course_id = s.course_id
    JOIN videos v ON v.course_id = c.course_id
    WHERE s.email = ?
    AND DATE_ADD(v.added_at, INTERVAL c.video_expire_days DAY) >= CURDATE()
  `;
  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

module.exports = router;
