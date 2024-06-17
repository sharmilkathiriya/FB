// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
//
// const index = express();
//
//
// index.use(cors());
// index.use(helmet());
// index.use(express.json());
//
// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,
// });
//
// index.use(limiter);
//
// index.get('/', (req, res) =>{
//   res.send('Welcome to the server')
// })
// const PORT = process.env.PORT || 5000;
//
// index.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
//
// export default index;
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const server = express();
const PORT = 8000;

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json({ limit: "25mb" }));
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => res.send("<h1>Api Run</h1>"));

const option = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect("mongodb://localhost:27017/test", option)
    .then(() => {
      server.listen(PORT, () => console.log(`Server Start ${PORT}`));
    })
    .catch(err => console.error("MongoDB connection error:", err));