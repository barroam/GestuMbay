import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemandesAddUpdateComponent } from './admin-demandes-add-update.component';

describe('AdminDemandesAddUpdateComponent', () => {
  let component: AdminDemandesAddUpdateComponent;
  let fixture: ComponentFixture<AdminDemandesAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDemandesAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemandesAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
