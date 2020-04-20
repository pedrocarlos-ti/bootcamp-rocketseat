import { Router } from 'express';
import Appointments from './appointments.routes';

const routes = Router();

routes.use('/appointments', Appointments);

export default routes;
