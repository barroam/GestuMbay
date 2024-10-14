import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROADemandesAddUpdateComponent } from './roa-demandes-add-update.component';

describe('ROADemandesAddUpdateComponent', () => {
  let component: ROADemandesAddUpdateComponent;
  let fixture: ComponentFixture<ROADemandesAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROADemandesAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROADemandesAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
