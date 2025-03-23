import { createRateLimiter } from './apiRateLimiter';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
const cspDirectives = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'script-src': ["'self'", "'unsafe-eval'"],
};

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        ...cspDirectives,
      },
    },
  })
);

// Parses the body of POST/PUT request
// to JSON
app.use(bodyParser.json({ limit: '10mb' }));

// Configure the Entity routes
const routes = express.Router();

require('./assignment').default(routes);
require('./session').default(routes);
require('./student').default(routes);

// Add the routes to the /api endpoint
app.use('/api', routes);

export default app;
