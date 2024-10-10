import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemandesShowComponent } from './admin-demandes-show.component';

describe('AdminDemandesShowComponent', () => {
  let component: AdminDemandesShowComponent;
  let fixture: ComponentFixture<AdminDemandesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDemandesShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemandesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
