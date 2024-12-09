import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoute.js";

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
