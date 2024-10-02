import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratShowComponent } from './admin-contrat-show.component';

describe('AdminContratShowComponent', () => {
  let component: AdminContratShowComponent;
  let fixture: ComponentFixture<AdminContratShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContratShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContratShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
