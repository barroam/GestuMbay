import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratAddOrUpdateComponent } from './admin-contrat-add-or-update.component';

describe('AdminContratAddOrUpdateComponent', () => {
  let component: AdminContratAddOrUpdateComponent;
  let fixture: ComponentFixture<AdminContratAddOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContratAddOrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContratAddOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
