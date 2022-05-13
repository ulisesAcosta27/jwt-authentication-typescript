import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

import authRoutes from "./routes/auth.routes";
import spacialRoutes from './routes/special.routes'

//Initialization
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
passport.use(passportMiddleware)

//Routes
app.get("/", (req, res) => {
  res.send(`THE API is in http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(spacialRoutes);

export default app;
