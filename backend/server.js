require("dotenv").config();

const express = require("express");
const coursesRouter = require("./routes/courses");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/students");
const { authUser } = require("./utils/auth");
const userRouter = require("./routes/users");
const videosRouter = require("./routes/videos");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "token", "email", "role"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authUser);

app.use("/users", userRouter);
app.use("/admin/", adminRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentRouter);
app.use("/video", videosRouter);

app.listen(PORT, () => {
  console.log(`Server Started At Port ${PORT}`);
});
