import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordFournisseurComponent } from './dashbord-fournisseur.component';

describe('DashbordFournisseurComponent', () => {
  let component: DashbordFournisseurComponent;
  let fixture: ComponentFixture<DashbordFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordFournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
