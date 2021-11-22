import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthServices } from "./auth.services";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent{
    signinForm: FormGroup;

    constructor (private AuthServices: AuthServices){}

    onSubmit(){
        //document.getElementById("sucessDiv").innerHTML = "";
        //document.getElementById("errorDiv").innerHTML = "";
        var email = this.signinForm.value.emailTS;
        var pass = this.signinForm.value.passwordTS;
        this.AuthServices.login(email, pass)
        .subscribe(
            dadosSucesso => {
                var retorno = dadosSucesso.json();

                localStorage.setItem("uid", retorno.uID);
                localStorage.setItem("uFName", retorno.uFName);
                localStorage.setItem("uLName", retorno.uLName);
                localStorage.setItem("uEmail", retorno.uEmail);
               
                
                //document.getElementById("sucessDiv").innerHTML = retorno.myMsgSucess
            },
            //dadosErro => document.getElementById("errorDiv").innerHTML = dadosErro.myErrorTitle
        );
        this.signinForm.reset();
    }

    ngOnInit(){
        this.signinForm = new FormGroup({
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });
    }
}