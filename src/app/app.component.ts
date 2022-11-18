import { Component, OnInit } from '@angular/core';
import { UivityUserServices } from './services/iuvityUser.services';
import { Usuario } from './models/usuario.model'
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-iuvity';
  users: any[];
  usuario = new Usuario;
  buttonValue: boolean;

  constructor(private uvityUserServices: UivityUserServices,
    private messageService: MessageService) {
    this.users = [];
    this.buttonValue = true;
  }

  ngOnInit() {
    this.listUsers()
  }

  listUsers() {
    this.uvityUserServices.getAllUsers().subscribe(
      (resp: any) => {
        if (resp.code === 0) {
          this.users = resp.detail;
        } else {

        }
      }
    )
  }

  createUser() {
    this.uvityUserServices.createUser(this.usuario).subscribe(
      (resp: any) => {
        if (resp.code === 0) {
          this.listUsers();
          this.usuario = new Usuario;
        } else {

        }
      }
    )
  }

  deleteUser(event: any) {
    this.uvityUserServices.deleteUser(event).subscribe(
      (resp: any) => {
        if (resp.code === 0) {
          this.listUsers();
        } else {

        }
      }
    )
  }

  updateUser() {
    this.uvityUserServices.updateUser(this.usuario).subscribe(
      (resp: any) => {
        if (resp.code === 0) {
          this.buttonValue = true;
          this.usuario = new Usuario;
          this.listUsers();
          this.messageServiceResponse('Success','Notification','Usuario actualizado correctamente')
        } else {

        }
      }
    )
  }

  chargeUser(event: any){
    this.buttonValue = false;
    this.usuario = new Usuario;
    this.usuario.nombres = event.nombres;
    this.usuario.apellidos = event.apellidos;
    this.usuario.edad = event.edad;
    this.usuario.email = event.email;
    this.usuario.id = event.id;
  }

  messageServiceResponse(warn: any,tipo: any, message: any){
    console.log('dasdsada');
    this.messageService.add({
      severity: warn,
      summary: tipo,
      detail: message,
      life: 3000
    });
  }
}
