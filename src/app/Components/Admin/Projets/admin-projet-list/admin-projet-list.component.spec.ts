import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjetListComponent } from './admin-projet-list.component';

describe('AdminProjetListComponent', () => {
  let component: AdminProjetListComponent;
  let fixture: ComponentFixture<AdminProjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
