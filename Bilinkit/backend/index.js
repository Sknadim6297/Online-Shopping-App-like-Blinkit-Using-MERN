const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userRoute");

const app = express();
const port = 8000 || process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,  
  })
);
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
