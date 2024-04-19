import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'appointments.page.html',
  styleUrls: ['appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointments: any[] = [];

  showForm = false;
  newAppointment = {
    date: '',
    time: '',
    notes: ''
  };

  constructor(private appointmentService: AppointmentService, private firestore: AngularFirestore) {}

  ngOnInit() {
    //this.loadAppointments();
    this.getAppointmentList();
  }

  //Función mpara ostrar el formulario cuando se hace clic en el botón "Add".
  showAddForm() {
    this.showForm = true;
  }

  //Función para ocultar el formulario cuando se hace clic en el botón "Cancelar".
  cancelAddForm() {
    this.showForm = false;
  }

  //Función para agregar una nueva cita hacia firebase database.
  addAppointment() {
    if (!this.newAppointment.date || !this.newAppointment.time) {
      console.log('Por favor, complete todos los campos obligatorios');
      return;
    }
    this.firestore.collection('appointments').add(this.newAppointment)
      .then(() => {
        console.log('Nueva cita agregada correctamente a Firebase');
        this.newAppointment = {
          date: '',
          time: '',
          notes: ''
        };
        this.showForm = false;
      })
      .catch((error) => {
        console.error('Error al agregar la cita a Firebase:', error);
      });
  }


  //Función para obtener los datos de la lista desde firebase database.
  getAppointmentList() {
    this.firestore.collection('appointments').valueChanges().subscribe((appointments: any[]) => {
      this.appointments = appointments;
    });
  }

  //Función para eliminar los datos desde firebase database.
  deleteAppointment(appointment: any) {
    this.firestore.collection('appointments', ref => 
      ref.where('date', '==', appointment.date)
         .where('notes', '==', appointment.notes)
         .where('time', '==', appointment.time)
         .limit(1)
    ).get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        const appointmentId = doc.id;
        console.log("ID del registro:", appointmentId);
        this.firestore.collection('appointments').doc(appointmentId).delete()
          .then(() => {
            console.log("Documento eliminado exitosamente");
          })
          .catch(error => {
            console.error("Error al eliminar el documento:", error);
          });
      });
    });
  }
}