import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjetShowComponent } from './admin-projet-show.component';

describe('AdminProjetShowComponent', () => {
  let component: AdminProjetShowComponent;
  let fixture: ComponentFixture<AdminProjetShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjetShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjetShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
