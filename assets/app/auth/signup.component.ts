import { Http, Response, Headers } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthServices } from "./auth.services";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    signupForm: FormGroup;

    constructor (private AuthServices: AuthServices){}

    ngOnInit(){
        this.signupForm = new FormGroup({
            fristNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS: new FormControl(null, Validators.required)
        });  
    }
    onSubmit(){
        document.getElementById("sucessDiv").innerHTML = "";
        document.getElementById("errorDiv").innerHTML = "";
        var email = this.signupForm.value.emailTS;
        var nome = this.signupForm.value.fristNameTS;
        var sobrenome = this.signupForm.value.lastNameTS;
        var pass = this.signupForm.value.passwordTS;
        var NewUser = new User(email, pass, nome, sobrenome);
        this.AuthServices.createUser(NewUser)
        .subscribe(
            dadosSucesso => {
                var cu = dadosSucesso.json()
                document.getElementById("sucessDiv").innerHTML = cu.myMsgSucess
            },
            dadosErro => document.getElementById("errorDiv").innerHTML = dadosErro.myErrorTitle
            //dadosErro => console.log(dadosErro)
        );
        this.signupForm.reset();
    }
}