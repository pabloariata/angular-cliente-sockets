import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsSrv: WebsocketService
  ) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsSrv.getUsuario()!.nombre,
      cuerpo: mensaje
    };

    this.wsSrv.emit('mensaje', payload);

  }

  getMessages() {
    return this.wsSrv.listen('mensaje-nuevo');
  }

  getMessagesPrivados() {
    return this.wsSrv.listen('mensaje-privado');
  }

  getUsuariosActivos() {
    return this.wsSrv.listen('usuarios-activos');
  }

  emitirObtenerUsuariosActivos() {
    this.wsSrv.emit('obtener-usuarios');
  }

}
