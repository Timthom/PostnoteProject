import {Component} from 'angular2/core';

@Component({
    moduleId: __moduleName,
    styleUrls: ['create-user-account.component.css'],
    template: `
        <h2>Skapa konto</h2>
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
            <div>
                <label for="E-mail">Mail</label>
                <input ngControl="email" type="text" id="mail" requeried>
            </div>
            <div> 
                <label for="password">Lösenord</label>
                <input ngControl="password" type="text" id="password" required>
            </div>
            <div>
                <label for="confirm-password">Bekfräfta lösenord</label> 
                <input ngControl="confirm-password" type="text" id="confirm-password" required>               
            </div>
            <button type="submit">Bekräfta</button>
        </form>
    `
})

export class CreateUserAccountComponent {
    
}