const express = require("express");
const pool = require("../db/pool");
const result = require("../utils/createResult");
const { roleAuthorization } = require("../utils/auth");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users(email, password) VALUES(?,?)";
  const hashedPassword = cryptojs.SHA256(password).toString();
  pool.query(sql, [email, hashedPassword], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = cryptojs.SHA256(password).toString();
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  pool.query(sql, [email, hashedPassword], (error, data) => {
    if (error) {
      return res.send(result.createResult(error));
    }
    if (data.length === 0) {
      return res.send(result.createResult("Invalid email or password"));
    }
    const user = data[0];
    const payload = { email: user.email, role: user.role };
    const token = jwt.sign(payload, config.SECRET);
    res.send(result.createResult(null, { role: user.role, token }));
  });
});

router.get("/", (req, res) => {
  const email = req.headers.email;
  const sql = "SELECT * FROM users WHERE email = ?";
  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/all-studs", roleAuthorization, (req, res) => {
  const sql = "SELECT * FROM users";
  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.delete("/", (req, res) => {
  const email = req.headers.email;
  const sql = "DELETE FROM users WHERE email = ?";
  pool.query(sql, [email], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.get("/profile", (req, res) => {
  const email = req.headers.email;
  if (!email) {
    return res.send(result.createResult("Unauthorized"));
  }

  const sql = `
    SELECT u.email, u.role,
           s.reg_no, s.name, s.course_id, s.mobile_no,
           c.course_name, c.fees, c.start_date, c.end_date
    FROM users u
    LEFT JOIN students s ON u.email = s.email
    LEFT JOIN courses c ON s.course_id = c.course_id
    WHERE u.email = ?
  `;

  pool.query(sql, [email], (error, data) => {
    if (error) {
      return res.send(result.createResult(error));
    }
    if (!data || data.length === 0) {
      return res.send(
        result.createResult(null, {
          user: { email, name: email.split("@")[0], mobile: null },
          enrolledCourses: [],
        }),
      );
    }
    const profileData = {
      user: {
        name: data[0]?.name || email.split("@")[0],
        email: data[0]?.email,
        mobile: data[0]?.mobile_no,
      },
      enrolledCourses: data.filter((row) => row.reg_no),
    };
    res.send(result.createResult(null, profileData));
  });
});

router.post("/change-password", (req, res) => {
  const email = req.headers.email;
  const { newPassword } = req.body;

  if (!email || !newPassword) {
    return res.send(result.createResult("Email or password missing"));
  }

  const hashedNew = cryptojs.SHA256(newPassword).toString();
  const sql = "UPDATE users SET password = ? WHERE email = ?";
  pool.query(sql, [hashedNew, email], (error, data) => {
    if (error || data.affectedRows === 0) {
      return res.send(result.createResult("Password update failed"));
    }
    res.send(
      result.createResult(null, { message: "Password changed successfully" }),
    );
  });
});

module.exports = router;
