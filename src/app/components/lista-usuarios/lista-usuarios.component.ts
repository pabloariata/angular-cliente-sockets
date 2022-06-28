import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs!: Observable<any>;

  constructor(public chatSrv: ChatService) { }

  ngOnInit(): void {

    this.usuariosActivosObs = this.chatSrv.getUsuariosActivos();

    // obtener los usuarios activos al login
    this.chatSrv.emitirObtenerUsuariosActivos();

  }

}
