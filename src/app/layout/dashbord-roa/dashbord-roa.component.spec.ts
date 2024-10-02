import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordROAComponent } from './dashbord-roa.component';

describe('DashbordROAComponent', () => {
  let component: DashbordROAComponent;
  let fixture: ComponentFixture<DashbordROAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordROAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordROAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
