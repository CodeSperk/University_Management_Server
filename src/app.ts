import express, {
  Application,
  Request,
  RequestHandler,
  Response,
} from 'express';
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

//error handling middleware
app.use(globalErrorHandler);

//test route
const test = async (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', test);

//not found middleware
app.use(notFound);

export default app;
