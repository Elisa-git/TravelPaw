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
        new Message("Mensagem aqui", "Mesquita"),
        new Message("Message here", "Nascimento"),
        new Message("Teste try one", "Elisa")
    ]
    onMudaMostrarElemento(){
        this.mostrarElemento = !this.mostrarElemento;
    }
}
