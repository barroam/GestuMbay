import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjetHistoriquesComponent } from './admin-projet-historiques.component';

describe('AdminProjetHistoriquesComponent', () => {
  let component: AdminProjetHistoriquesComponent;
  let fixture: ComponentFixture<AdminProjetHistoriquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjetHistoriquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProjetHistoriquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
