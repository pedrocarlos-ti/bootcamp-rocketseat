import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointment {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // List all Appointments
  public all(): Appointment[] {
    return this.appointments;
  }

  // Create new Appointment
  public create({ provider, date }: CreateAppointment): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  // Find Appointment by Date
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }
}

export default AppointmentRepository;
