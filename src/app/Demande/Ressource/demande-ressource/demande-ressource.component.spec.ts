import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRessourceComponent } from './demande-ressource.component';

describe('DemandeRessourceComponent', () => {
  let component: DemandeRessourceComponent;
  let fixture: ComponentFixture<DemandeRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeRessourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
