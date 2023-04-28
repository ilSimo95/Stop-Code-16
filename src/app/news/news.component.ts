import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { News } from '../interfaces';
import { articoli } from '../data';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  keyword = new FormControl('');
  myForm?:FormGroup;
  formVisible:boolean = false;
  invalidForm:boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.news = articoli;
    this.myForm = new FormGroup({
      titolo: new FormControl('', Validators.required),
      descrizione: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      autore: new FormControl('', Validators.required),
      inHome: new FormControl('', Validators.required),
    })
  }

  showForm():void {
    this.formVisible = true;
  }

  closeForm():void {
    this.formVisible = false;
  }

  creaNews() {
    if (this.myForm != undefined) {
      if(this.myForm.valid) {
        this.invalidForm = false;
        this.formVisible = false;
        let IDs:Array<number> = this.news.map(articolo => articolo.id);
        let maxID:number = Math.max(...IDs);
        let nuovoArticolo: News = {
          'id': maxID+1,
          'titolo': this.myForm.value.titolo,
          'descrizione': this.myForm.value.descrizione,
          'data': this.myForm.value.data,
          'autore': this.myForm.value.autore,
          'inHome': this.myForm.value.inHome,
        }
        this.news.push(nuovoArticolo);
        this.myForm.reset();
	    }
	    else {
		    this.invalidForm = true;
	    }
      
    }
  }

}
