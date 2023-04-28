import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void { //nella fase di caricamento della pagina
    if(localStorage.getItem('token')){
      //se esiste l'item chiamato "token" nel localStorage significa che abbiamo fatto già l'accesso e ci siamo autenticati rilasciando alla fine una coppia chiave-valore nel localstorage
      this.router.navigate(['dashboard', localStorage.getItem('token')])
    }
  }

  username:string=""
  password:string=""
  myMessage:string=""

  myClass:string="alert alert-warning"
  
 
  invioDati(){
    console.log(this.username, this.password)

    const user = {
      username:this.username,
      password:this.password
    }

    /*

    Quest'oggetto, che ci consente di impacchettare i dati da passare alla API che effettua il Login deve essere prima validato (i dati immessi sono validi?) e poi processato (l'utente esiste o non esiste nel DB?)
    Entrambe le funzioni di validazione e di autenticazione dovranno risiedere in un service
    
    */

    if(this.loginService.validateForm(user)){
      console.log("Dati Validi")
      this.myMessage = "Dati validi"
      this.myClass="alert alert-success"

      //Autenticazione: eseguo il task definito nel service e sottoscrivo l'observable per permettermi di accedere ai dati

      //L'account di test antonio, Antonio1!
      /*

      "Nuova versione" del metodo .subscribe()
      .subscribe(
        {
          next: (user) => {}, //succes
          error: (error) => {}, //error
          complete: () => {} //fine processo
        }
      )
      
      */
      
      this.loginService.authorize(user).subscribe(
        //risposta andata a buon fine; status code HTTP = 200
        (data)=>{ //data => i dati restituiti dalla response
          console.log(data) //esaminiamo la risposta 
          //this.auth_data = data
          this.myMessage = `L'utente ${user.username} è autenticato con il seguente Token: ${data.data.authorization_code}`
    
          //potremmo continuare con il secondo step dell'autenticazione

          this.myClass="alert alert-success"
        //Possiamo cambiare la classe CSS del nostro div message tramite alcune direttive di "attributo" di Angular come NgStyle o NgClass. Un esempio all'indirizzo https://codecraft.tv/courses/angular/built-in-directives/ngstyle-and-ngclass/
        
        //possiamo introdurre in ritardo di 3 secondi e fare un redirect alla rotta /dashboard/<token>

        setTimeout(
          ()=>{
          /*
          se sono arrivato qui è perchè sono autenticato, allora imposto la proprietà isLoggedIn del Service a true 
          */
            this.loginService.setLoggedIn(true)
            //il redirect
            this.router.navigate(['dashboard', data.data.authorization_code])

          },3000
        )

        },

        //seconda funzione di callback come argomento del metodo subscribe
        //Si è verificato un errore nella response; da 400 a 499 se l'errore è lato client
        //Si può verificare anche un errore lato server: i codici di errore possono andare da 500 a 599
        //codici dei errore HTTP per la response
        //
        (err)=>{
          
          this.loginService.setLoggedIn(false)
          /*
          
          Intrappoliamo l'eccezione e impostiamo la proprietà isLoggedIn del Service a false in modo da inibire anche la guard canActivate 
          
          
          */

          /*
          status code HTTP della response diverso da 200. 
          Possibilità? 
          - 400 bad request
          - 404 not found
          - 500 internal server error 
          */
          console.log(err)
          this.myMessage = `Si è verificato il seguente errore: ${err.error.errors.message}`
          this.myClass="alert alert-danger"
        }
      )


    }else{
      console.log("Dati non validi. Riprova!")
      this.myMessage = "Dati non validi. Riprova!"
      this.myClass="alert alert-warning"
    }



  }
}
