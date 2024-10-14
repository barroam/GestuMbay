import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAProjetsAddUpdateComponent } from './roa-projets-add-update.component';

describe('ROAProjetsAddUpdateComponent', () => {
  let component: ROAProjetsAddUpdateComponent;
  let fixture: ComponentFixture<ROAProjetsAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAProjetsAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAProjetsAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
