import { Component } from '@angular/core';
import { Message } from './messages/message.model';
import { MessageService } from './messages/message.services';
import { AuthServices } from './auth/auth.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService, AuthServices]
    
})
export class AppComponent {
    mostrarElemento: boolean = true;
    valorNgSwitch: number;
    messages: Message[] = [
        new Message("testando uma mensagem maneira", "Gustav Wagner"),
        new Message("Eu preciso escrever algo", "GRW"),
        new Message("Só vem merda na minha cabeça", "TETEUS")
    ]
    onMudaMostrarElemento(){
        this.mostrarElemento = !this.mostrarElemento;
    }
}