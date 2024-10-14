import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordRoaComponent } from './dashbord-roa.component';

describe('DashbordRoaComponent', () => {
  let component: DashbordRoaComponent;
  let fixture: ComponentFixture<DashbordRoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordRoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordRoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
