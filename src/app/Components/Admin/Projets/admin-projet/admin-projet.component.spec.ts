import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjetComponent } from './admin-projet.component';

describe('AdminProjetComponent', () => {
  let component: AdminProjetComponent;
  let fixture: ComponentFixture<AdminProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
