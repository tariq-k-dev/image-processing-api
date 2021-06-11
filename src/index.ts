import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import routes from './routes/index';

const app = express();
const PORT = (process.env.PORT as unknown as number) || 3000;
const HOST = 'http://localhost:';

app.use(favicon(path.resolve('dist', 'images', 'favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('../views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(express.static('dist'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening at ${HOST + PORT}`);
});

export default app;
