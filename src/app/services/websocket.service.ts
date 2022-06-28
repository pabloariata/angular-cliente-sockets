import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus: boolean = false;
  public usuario!: Usuario | null;

  constructor(private socket: Socket, private router: Router) { 

    this.cargarStorage();
    this.checkStatus();

  }

  checkStatus() {

    this.socket.on('connect', () => {
      
      console.log('Conectado al servidor');
      this.socketStatus = true;
      // para que vuelva a recargarse, si se cae el servidor (sin tener q reiniciar la app de angular)
      this.cargarStorage();

    });

    this.socket.on('disconnect', () => {
      
      console.log('Desconectado del servidor');
      this.socketStatus = false;

    });

  }


  emit(evento: string, payload?: any, callback?: Function) {

    // console.log('Emitiendo', evento);

    this.socket.emit(evento, payload, callback);

  }

  listen(evento: string) {

    return this.socket.fromEvent(evento);
    
  }

  loginWS(nombre: string) {

    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', {nombre}, (resp: any) => {
        

        this.usuario = new Usuario(nombre);
        this.guardarStorage();

        // console.log(resp);

        resolve(true);

      });

    })


  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };
    // le pasamos una funcion vacia, ya que el configurar-usuario espera un callback en el servidor
    this.emit('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    console.log('guardo storage');
    localStorage.setItem('usuario', JSON.stringify(this.usuario));

  }

  cargarStorage() {

    if (localStorage.getItem('usuario')){

      
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      //recargamos el usuario en el servidor, si lo teniamos en el storage
      this.loginWS(this.usuario!.nombre);

    }

  }



}
