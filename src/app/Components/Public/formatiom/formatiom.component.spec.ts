import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatiomComponent } from './formatiom.component';

describe('FormatiomComponent', () => {
  let component: FormatiomComponent;
  let fixture: ComponentFixture<FormatiomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatiomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatiomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
