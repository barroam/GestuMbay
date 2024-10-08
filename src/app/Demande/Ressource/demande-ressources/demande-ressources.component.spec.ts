import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRessourcesComponent } from './demande-ressources.component';

describe('DemandeRessourcesComponent', () => {
  let component: DemandeRessourcesComponent;
  let fixture: ComponentFixture<DemandeRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeRessourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
