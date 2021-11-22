import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.services";
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    //styles: [``]
})
export class MessageComponent{   
    @Input() MessageVarClasse : Message =  new Message ("","");
    @Input('inputMessage') messageVarClasseAlias : Message = new Message ("","");

    @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();
    @Output('outputMessage') editClicked_MessageMetodoClasseAlias = new EventEmitter();

    constructor(private messageServiceObj: MessageService){}

    onEdit(){
        this.editClicked_MessageMetodoClasse.emit("texto do filho pro pai");
        this.editClicked_MessageMetodoClasseAlias.emit("texto do filho pro pai alias");
    }
    onEditService(){
        this.messageServiceObj.editMessage(this.MessageVarClasse);
    }
    deleteMessage(){
        this.messageServiceObj.deleteMessage(this.MessageVarClasse);
    }
    onMudaStyle(){
        
    }
}