import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAContratsAddUpdateComponent } from './roa-contrats-add-update.component';

describe('ROAContratsAddUpdateComponent', () => {
  let component: ROAContratsAddUpdateComponent;
  let fixture: ComponentFixture<ROAContratsAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAContratsAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAContratsAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
