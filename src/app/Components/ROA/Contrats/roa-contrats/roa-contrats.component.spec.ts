import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAContratsComponent } from './roa-contrats.component';

describe('ROAContratsComponent', () => {
  let component: ROAContratsComponent;
  let fixture: ComponentFixture<ROAContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAContratsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
