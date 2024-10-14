import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAContratsShowComponent } from './roa-contrats-show.component';

describe('ROAContratsShowComponent', () => {
  let component: ROAContratsShowComponent;
  let fixture: ComponentFixture<ROAContratsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAContratsShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAContratsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
