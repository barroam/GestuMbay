import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjetAddUpdateComponent } from './admin-projet-add-update.component';

describe('AdminProjetAddUpdateComponent', () => {
  let component: AdminProjetAddUpdateComponent;
  let fixture: ComponentFixture<AdminProjetAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjetAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjetAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
