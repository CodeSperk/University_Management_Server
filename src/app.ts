import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

const getAController: RequestHandler = (req, res) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

//error handling middleware
app.use(globalErrorHandler);

//not found middleware
app.use(notFound);

export default app;
