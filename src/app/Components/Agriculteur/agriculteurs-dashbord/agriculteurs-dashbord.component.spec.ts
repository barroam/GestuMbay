import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteursDashbordComponent } from './agriculteurs-dashbord.component';

describe('AgriculteursDashbordComponent', () => {
  let component: AgriculteursDashbordComponent;
  let fixture: ComponentFixture<AgriculteursDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculteursDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculteursDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
