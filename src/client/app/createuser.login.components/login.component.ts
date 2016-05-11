import {Component} from 'angular2/core';

@Component({
    moduleId: __moduleName,
    styleUrls: ['login.component.css'],
    template: `
        <h2>Logga in</h2>
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
            <div>
                <label for="E-mail">Mail</label>
                <input ngControl="email" type="text" id="mail" requeried>
            </div>
            <div> 
                <label for="password">Lösenord</label>
                <input ngControl="password" type="text" id="password" required>
            </div>
            <button type="submit">Bekräfta</button>
        </form>
    `
})

export class LoginComponent {
    
}