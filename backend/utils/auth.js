const jwt = require("jsonwebtoken");

const result = require("./createResult");
const config = require("../utils/config");

function authUser(req, res, next) {
  const path = req.url;
  console.log(path);
  if (
    path == "/users/signin" ||
    path == "/users/signup" ||
    path == "/courses/all-courses" ||
    path == "/courses/all-active-courses" ||
    path == "/students/register-to-course"
  ) {
    next();
  } else {
    const token = req.headers.token;
    if (!token) {
      res.send(result.createResult(`Token Is Missing`));
    } else {
      try {
        const payload = jwt.verify(token, config.SECRET);
        req.headers.uid = payload.uid;
        req.headers.email = payload.email;
        req.headers.role = payload.role;

        next();
      } catch (ex) {
        res.send(result.createResult(`Token Is Invalid`));
      }
    }
  }
}

function roleAuthorization(req, res, next) {
  const role = req.headers.role;
  if (role === "admin") {
    console.log(`welcome admin`);
    return next();
  } else {
    console.log(`Not Authorized`);
    res.send(`Not Authorized`);
  }
}

module.exports = { authUser, roleAuthorization };
