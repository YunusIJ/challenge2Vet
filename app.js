import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import xssClean from  "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import connectDB from "./src/database/db.js";
import adminSeed from './src/database/adminseed.js';


import logger from "./src/utils/log/logger.js";


import adminRoute from './src/routes/admin.routes.js';
import userRoute from './src/routes/user.routes.js';
import petRoute from  './src/routes/pet.routes.js';

const app = express();

import dotenv from "dotenv";
dotenv.config()
 
const port = process.env.PORT




app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xssClean());

app.use(mongoSanitize());


app.get("/", (req, res) => {
    res.send("Welcome to Vetly Pet Store");
  });
  
  const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 5, 
    message: "Too many requests from this IP, please try again later.",
    
  });
  
  app.use("/api/v1/*", limiter);

  app.use("/api/v1/admin", adminRoute );
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/pet", petRoute)

  const server = app.listen(port, async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        await adminSeed();
        logger.info(`Server is running on port ${port}`);
    } catch (error) {
        logger.error(error)
    }
});