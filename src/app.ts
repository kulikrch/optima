import express from 'express';
import config from 'config';

import * as db from './mini_db';
import * as routes from './routes';
import * as errors from './errors';

const app: express.Express = express();
const port = config.get("port");

app.use(express.json());

app.use('/app', routes.router);

app.use(errors.errorMiddleware);

const startApp = async () => {
  try {
    await db.connect(config.get("dbUrl"));

    if (db.connection === null) {
      return;
    }

    console.debug('Connection to the db');

    app.listen(port, () => console.log(`Running on port ${port}`));
} catch (error) {
    console.error('Unable to connect to the db:', error);
}
};

startApp();

export default app;