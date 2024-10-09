import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratComponent } from './admin-contrat.component';

describe('AdminContratComponent', () => {
  let component: AdminContratComponent;
  let fixture: ComponentFixture<AdminContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
