import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  appointments: any[] = [];
  login: boolean = false;

  constructor(private appointmentService: AppointmentService, private auth: AuthService) {
    this.auth.stateUser().subscribe( res =>{
      if(res){
        console.log('Usuario iniciado');
        this.login = true;
      }
      else{
        console.log('Usuario no iniciado');
        this.login = false;
      }
    })
  }

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
        this.appointments = this.appointments.filter(appointment => appointment.appointment_id !== id);
      },
      (error) => {
        console.error('Error deleting appointment:', error);
      }
    );
  }
}