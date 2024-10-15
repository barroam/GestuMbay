import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursRessourcesComponent } from './fournisseurs-ressources.component';

describe('FournisseursRessourcesComponent', () => {
  let component: FournisseursRessourcesComponent;
  let fixture: ComponentFixture<FournisseursRessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseursRessourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursRessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
