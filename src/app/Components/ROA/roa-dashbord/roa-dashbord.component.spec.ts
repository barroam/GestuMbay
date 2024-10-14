import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROADashbordComponent } from './roa-dashbord.component';

describe('ROADashbordComponent', () => {
  let component: ROADashbordComponent;
  let fixture: ComponentFixture<ROADashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROADashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROADashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
