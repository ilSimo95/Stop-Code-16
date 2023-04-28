import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegioniService } from '../services/regioni.service';

@Component({
  selector: 'app-regione',
  templateUrl: './regione.component.html',
  styleUrls: ['./regione.component.css']
})
export class RegioneComponent {
  constructor(private route:ActivatedRoute,
    private regioniService: RegioniService) {  }

/*

Per fare l'abbinamento tra 
- il segnaposto (:nome) impostato nell'array delle rotte e 
- il nome della regione che viene passato nel momento in cui faccio click sul dettaglio (<a [routerLink]="['/regione', r.regione]">)
Angular ci dice di utilizzare la risorsa ActivatedRoute, una injectable class. Dobbiamo quindi iniettarla nel costruttore del component (=> route : ActivatedRoute)
Il tutto avviene al caricamento della pagina (ngOnInit)

l'oggetto route fornisce una proprietà params (Un Observable) per estrarre il nome della regione 

*/

  sub:any

  myRegione:string="" //nome della regione
  objProvince:Array<any>=[]
  
    ngOnInit(): void {
      //Al caricamento della pagina facciamo la chiamata al metodo del service

      /*
      Il service ActivatedRoute fornisce una quantità "params" - Un Observable che utilizzeremo per leggere il valore del parametro e finalizzare l'associazione tra nome della regione e segnaposto dichiarato nell'array delle rotte 
      */

      //L'estrazione del nome della regione può essere fatto in alternativa anche così;
      // this.myRegione=this.route.snapshot.params["nome"]
      console.log(this.route.snapshot)

       this.sub=this.route.params.subscribe(
        (params) => {
          console.log(params["nome"]) //uso la notazione array sull'oggetto params per leggere la sua proprietà nome (della regione)
          this.myRegione=params["nome"]
        }) 


        console.log(this.myRegione)

      //successivamente faccio la chiamata al metodo getRegioneDetail
    
      this.regioniService.getRegioneDetail(this.myRegione).subscribe({

        next: (data) => {
          console.log(data)
          this.objProvince= data //array di oggetti
        },

      })



    /*

    Per cambiare rotta da /regioni a /regione/Campania 
    dobbiamo importarci una classe injectable ActivatedRoute

    */
    }
}
