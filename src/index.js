import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const index = express();


index.use(cors());
index.use(helmet());
index.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

index.use(limiter);

index.get('/', (req, res) =>{
  res.send('Welcome to the server')
})

export default index;
