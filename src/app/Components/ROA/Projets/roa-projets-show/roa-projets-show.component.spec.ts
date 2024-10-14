import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAProjetsShowComponent } from './roa-projets-show.component';

describe('ROAProjetsShowComponent', () => {
  let component: ROAProjetsShowComponent;
  let fixture: ComponentFixture<ROAProjetsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAProjetsShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAProjetsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
