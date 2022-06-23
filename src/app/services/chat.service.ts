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
      de: 'Pablo',
      cuerpo: mensaje
    };

    this.wsSrv.emit('mensaje', payload);

  }

  getMessages() {
    return this.wsSrv.listen('mensaje-nuevo');
  }

}
