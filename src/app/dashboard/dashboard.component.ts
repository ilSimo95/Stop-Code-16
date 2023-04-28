import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router:Router,
    private route:ActivatedRoute) { }
  
  myParam:any //IL TOKEN

  //al caricamento della pagina scrivo nel localStorage il token in modo da poter navigare tra le funzionalità della dashboard
  ngOnInit(): void {
    this.myParam = this.route.snapshot.params['token'] //utilizzo la proprietà snapshot del Service ActivatedRoute
    console.log(this.myParam)
    if(this.myParam){localStorage.setItem('token', this.myParam)}
  }

  logout(){
      if(confirm("Sei sicuro?")){
        if(localStorage.getItem('token')){
          localStorage.removeItem("token")
          this.router.navigate(['/login'])}
          else{
            this.router.navigate(['/not-found'])
          }
      }
    }
}
