import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordAgriculteurComponent } from './dashbord-agriculteur.component';

describe('DashbordAgriculteurComponent', () => {
  let component: DashbordAgriculteurComponent;
  let fixture: ComponentFixture<DashbordAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordAgriculteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
