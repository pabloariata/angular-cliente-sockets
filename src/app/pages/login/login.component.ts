import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string = '';

  constructor(public webSocketSrv: WebsocketService, private router: Router) { }

  ngOnInit(): void {
  }

  ingresar() {

    this.webSocketSrv.loginWS(this.nombre).then(() => {

      this.router.navigateByUrl('/mensajes');

    });

  }

}
