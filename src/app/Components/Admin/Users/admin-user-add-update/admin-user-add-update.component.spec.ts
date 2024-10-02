import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAddUpdateComponent } from './admin-user-add-update.component';

describe('AdminUserAddUpdateComponent', () => {
  let component: AdminUserAddUpdateComponent;
  let fixture: ComponentFixture<AdminUserAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
