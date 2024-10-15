import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteursRessourcesComponent } from './agriculteurs-ressources.component';

describe('AgriculteursRessourcesComponent', () => {
  let component: AgriculteursRessourcesComponent;
  let fixture: ComponentFixture<AgriculteursRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculteursRessourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculteursRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
