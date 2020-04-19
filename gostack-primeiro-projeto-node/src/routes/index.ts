import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  console.log(request);
  response.json({ message: 'Hello World2' });
});

export default routes;
