import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { User } from "./user.model";

@Injectable()
export class AuthServices{
    
    constructor(private http: Http){}

    createUser(user : User){
        const bodyReq = JSON.stringify(user);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                return responseRecebida;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));

    }
    login(email: String, pass: String) {
        var obj = {email: email, pass: pass}
        const bodyReq = JSON.stringify(obj);
        console.log (bodyReq);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/login', bodyReq, { headers: myHeaders })
            .map((responseRecebida: Response) => {
                const aux = responseRecebida.json();
                return responseRecebida;
            })
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}