import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MessageService } from "./message.services";
import { Message } from "./message.model"

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
    //providers: [MessageService]
})
export class MessageInputComponent implements OnInit{

    constructor (private messageService: MessageService){}

    messageLoad : Message;

    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.messageLoad = message
        );
    }

    onSubmit(form: NgForm){
        if(this.messageLoad){
            this.messageLoad.content = form.value.myContentNgForm;
            this.messageService.updateMessage(this.messageLoad)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
            this.messageLoad = null;
        }
        else {
            const messageAux = new Message(form.value.myContentNgForm, "GG");
            this.messageService.addMessage(messageAux)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosError => console.log(dadosError)
            )
        }
        
        console.log(form);
        form.resetForm();
    }

    onSave(textoConsole: string){
        const messageAux = new Message(textoConsole, "GG");
        this.messageService.addMessage(messageAux);
        console.log(textoConsole);
    }
}