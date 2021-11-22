import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.services";

@Component({
    selector: 'app-message-list',
    templateUrl: './Message-list.component.html'
})

export class MessageListComponent implements OnInit {
    messages: Message[] = [];

    constructor(private messageService: MessageService) { };

    ngOnInit(): void {
        //messages aponta para o array do messageService
        //que armazena todas as mensagens 
        //this.messages = this.messageService.getMessages()
        this.messageService.getMessages()
            .subscribe(
                (dadosSucesso: Message[]) => {
                    this.messages = dadosSucesso;
                    console.log(dadosSucesso)
                },
                dadosErro => console.log(dadosErro)
            );
    }
}