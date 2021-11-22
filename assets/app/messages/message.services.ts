import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Message } from "./message.model";
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService{
    private messageService: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http){}

    addMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'})
        return this.http.post('http://localhost:3000/message', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                const newObjMessage = new Message(aux.objMessageSave.content, localStorage.getItem('uFName')+" "+localStorage.getItem('uLName') , aux.objMessageSave._id, null);
                this.messageService.push(newObjMessage);
                return newObjMessage;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
    editMessage(message: Message){
        this.messageIsEdit.emit(message);
    }
    updateMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/message/'+ message.messageId, bodyReq, {headers: myHeaders})
        .map((responseRecebida: Response) => responseRecebida.json())
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
    getMessages(){
        return this.http.get('http://localhost:3000/message')
        .map((responseRecebida: Response) => {
            const responseEmJSON = responseRecebida.json();
            const messagesResponseRecebida = responseEmJSON.objsMessagesRecuperados;
            let transformedCastMessagesModelFrontend: Message[] = [];
                for(let msg of messagesResponseRecebida){
                    transformedCastMessagesModelFrontend.push(
                        new Message(msg.content, 'Elisa', msg._id, null)
                    );
                }
        this.messageService = transformedCastMessagesModelFrontend;
        return transformedCastMessagesModelFrontend;
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }    

    deleteMessage(message: Message){
        this.messageService.splice(this.messageService.indexOf(message), 1);
    }
}