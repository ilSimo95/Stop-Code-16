import { Component } from '@angular/core';
import { RegioniService } from '../services/regioni.service';

@Component({
  selector: 'app-regioni',
  templateUrl: './regioni.component.html',
  styleUrls: ['./regioni.component.css']
})
export class RegioniComponent {
  constructor(private regioniService: RegioniService) { }


  /*
Qui dobbiamo accedere al service per eseguire il suo metodo getRegioni

Nella teoria dei data stream - Rxjs 
- Observable 
- Observer o anche detto Subscriber, esegue il tesk e legge i dati
*/
regioni:Array<any> = []

getRegioni(){
  this.regioniService.getRegioni().subscribe(
//argomenti? due modalità 
   // (data) => console.log(data), //data costituisce l'array dei dati letti, fine processo con successp
   // (error) => console.log(error), //error rappresenta la condizione fine processo con errore
   // () => console.log ("Processo terminato")

   {
    next: (data) => {
      console.log(data)
      this.regioni = data
    },
    
    error: (error) => console.log(error),
    complete: () => console.log ("Processo terminato")

   }


  )

  //seconda modalità di esprimere l'argomento dell'Observer

}
}
