import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemandesListComponent } from './admin-demandes-list.component';

describe('AdminDemandesListComponent', () => {
  let component: AdminDemandesListComponent;
  let fixture: ComponentFixture<AdminDemandesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDemandesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemandesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
