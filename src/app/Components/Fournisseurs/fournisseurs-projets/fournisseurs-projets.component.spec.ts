import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursProjetsComponent } from './fournisseurs-projets.component';

describe('FournisseursProjetsComponent', () => {
  let component: FournisseursProjetsComponent;
  let fixture: ComponentFixture<FournisseursProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseursProjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
