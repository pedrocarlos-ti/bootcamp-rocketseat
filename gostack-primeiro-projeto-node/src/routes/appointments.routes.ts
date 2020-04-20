import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const AppointmentRepository = new AppointmentsRepository();

// GET ROUTE
appointmentsRouter.get('/', (request, response) => {
  const appointments = AppointmentRepository.all();

  return response.json(appointments);
});

// POST ROUTE
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      AppointmentRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json(error.message);
  }
});

export default appointmentsRouter;
