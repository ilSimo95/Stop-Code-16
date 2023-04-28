import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

//VALIDAZIONE //////////

/*
  Criterio di validazione per la password:
  - almeno 8 caratteri
  - almeno un carattere minuscolo
  - almeno un carattere maiuscolo
  - almeno un carattere numerico [0..9]
  - almeno un carattere  speciale (_ ? ! @ #)
  */

  strongRegExp:any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  /*
  L'API restituisce un TOKEN, ovvero un'identità (espressa tramite una stringa univoca per l'utente che sta entrando e che mi consentirà di utilizzare anche, una volta entrato, le altre funzionalità dell'applicazione Yii2, fino alla scadenza del token).
  Però questo non è che il primo degli step. 
  Il secondo step sarà, come proposto da Yii2, che consiste nell'utilizzare il token per generare a sua volta un altro token di accesso valido per tutte le rotte lato client (Angular)
  
  Questo vuol dire che una volta generato il primo token dovremo eseguire una seconda API
  al seguente endpoint: http://api.labforweb.it/backend/web/index.php/1/accesstoken

  A questo punto sarò autenticato anche lato client e potrò accedere a tutte le funzionalità relative alle tipologie di utente (ADMIN, STUDENTE, DOCENTE, GUEST)
  La prima cosa che si può fare è visualizzare l'anagraica completa chiamando una terza API al seguente endpoint: http://api.labforweb.it/backend/web/index.php/1/me

  */

  validateForm(user:any):boolean{
    
    if(user.username == "" || 
      user.password =="" || 
      !this.strongRegExp.test(user.password)
    ){return false}
    else{return true}
    
  }


////////////////////////////////////////////////////////////////////////////////////////////////

//dichiariamo una proprietà privata che mi dice se l'utente è loggato oppure no 
private isLoggedIn:boolean = false; //per default l'utente NON è loggato

//metodo che controlla se l'utente è loggato andando a leggere il valore della proprietà isLoggedIn
isUserLoggedIn():boolean{
  return this.isLoggedIn;
}

//metodo che ci consente di modificare lo stato della proprietà isLoggedIn
setLoggedIn(value:boolean){
  //value è un parametro che assume i valori true/false
  this.isLoggedIn = value;
}

  //API da chiamare per l'autenticazione
  wsAuthorize:string = 'http://api.labforweb.it/backend/web/index.php/1/authorize';

  /*
  metodo per fare l'autenticazione a livello service
  Debbo fare una chiamata POST all'API il cui endpoint è this.wsAuthorize
  La chiamata POST si fa tramite il service esterno HttpClient

  http.get, http.post, http.put, http.delete, http.patch  //metodi per fare chiamate REST
  chiamate ad API fatte secondo dei criteri particolari nel descrivere a livello di documentazione le chiamate stesse 
  
  Vogliamo informare il browser scrivendo
  "Content-type: application/json"  che il contenuto restituito sarà di tipo JSON
  Access-Control-Allow-Origin: * //l'API accetta tutte le richieste (da ogni IP)
  */

  authorize(user:any):Observable<any> {
    //user: username + password

  const httpOptions = {
    headers: new HttpHeaders(
      { //HttpHeaders non è una injectable class quindi va istanziata 
      'Content-type': 'application/json'}),
      //params: new HttpParams().set('username', user.username)
  }
    return this.http.post(this.wsAuthorize, user, httpOptions); //definizione del task asincrono
  }
}
