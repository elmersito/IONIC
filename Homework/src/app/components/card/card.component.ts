import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (data) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(
      () => {
        // Eliminar la cita localmente después de eliminarla en el servidor
        this.appointments = this.appointments.filter(appointment => appointment.id !== id);
      },
      (error) => {
        console.error('Error deleting appointment:', error);
        console.log('Response:', error.error); // Imprime la respuesta del servidor
      }
    );
  }

}





  

  