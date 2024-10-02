import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratListComponent } from './admin-contrat-list.component';

describe('AdminContratListComponent', () => {
  let component: AdminContratListComponent;
  let fixture: ComponentFixture<AdminContratListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContratListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContratListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
