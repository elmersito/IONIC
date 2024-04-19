import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost/api'; // La URL base de tu API

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-appointments.php`);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete.php?id=${id}`);
  }
}
