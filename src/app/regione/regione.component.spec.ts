import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioneComponent } from './regione.component';

describe('RegioneComponent', () => {
  let component: RegioneComponent;
  let fixture: ComponentFixture<RegioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
