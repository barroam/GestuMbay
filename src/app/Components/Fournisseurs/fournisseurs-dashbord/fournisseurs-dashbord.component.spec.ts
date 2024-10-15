import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseursDashbordComponent } from './fournisseurs-dashbord.component';

describe('FournisseursDashbordComponent', () => {
  let component: FournisseursDashbordComponent;
  let fixture: ComponentFixture<FournisseursDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FournisseursDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseursDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
