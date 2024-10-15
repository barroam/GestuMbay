import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursContratsComponent } from './fournisseurs-contrats.component';

describe('FournisseursContratsComponent', () => {
  let component: FournisseursContratsComponent;
  let fixture: ComponentFixture<FournisseursContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseursContratsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
