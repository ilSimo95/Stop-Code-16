import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegioniService {

  constructor(private http:HttpClient) { }

  /*qui troviamo proprietà e metodi condivisi con gli altri component che volessero usarli

  Angular fornisce un meccanismo (Dependency Injection -- è un pattern di programmazione avanzata OOP che hanno anche altri linguaggi come Java)
  Noi vogliamo accedere da più component ai metodi di una classe service
  Dovremmo istanziare ogni volta il service (New ...). Per evitare questo, cioè la ridondanza delle istanziazioni il framework ci fornisce un meccanismo, appunto da DI, per il quale iniettando il service nel costruttore del component, troviamo già il service istanziato per cui siamo pronti ad utilizzare direttamente i suoi metodi e proprietà 
  Il meccanismo della DI viene implementato in Angular tramite le risorse HttpClientModule, la classe Injectable ed il suo decorator
  */

  wsRegioni:string = "http://l4com.labforweb.it/backend/web/test/ws/regioni/province.controller.php?r=listaRegioni"

  //un metodo per effettuare la chiamata get a questa risorsa
  
  /*
  Per effettuare una chiamata HTTP ajax utilizziamo una risorsa estern chiamata HttpClient
  */
  getRegioni():Observable<any>{

    return this.http.get(this.wsRegioni) //definizione del task da compiere

    /*
Quando parliamo di Observable parlaimo di uno dei costituenti più importanti delle programmazione Reattiva (Reactive Programming). Questo tipo di programazione si interessa delle emissioni di dati (daTA STREAM) da un certo fenomeno PER ESEMPIO
- emissione/ricezione di dati json da una chiamata http ajax
- una serie di coordinate emesse dai click del mouse sul browser
- una serie di variazioni dei valori dei campi di una form che invia dati ad una certa destinazione
- .... altro
    */
  }

  //Per accedere alla lista delle province di una certa regione
  wsRegioneDetail="http://l4com.labforweb.it/backend/web/test/ws/regioni/province.controller.php?r=RegioneDetail"

  //vediamo come inserire nella chiamata anche l'ultimo pezzo (il parametro - &regione=Liguria/Campania/Lazio.....)

  /*
  - definizione della rotta parametrica app-routing.module.ts
  - definire il metodo per la chiamata API nel Service (nb questa è una chiamata http con parametri)
   */

getRegioneDetail(request:string):Observable<any>{
  let params = new HttpParams().set("regione", request);
  return this.http.get(this.wsRegioneDetail,{params})
}
}
