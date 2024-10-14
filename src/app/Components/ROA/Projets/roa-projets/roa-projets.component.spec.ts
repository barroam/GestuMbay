import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAProjetsComponent } from './roa-projets.component';

describe('ROAProjetsComponent', () => {
  let component: ROAProjetsComponent;
  let fixture: ComponentFixture<ROAProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAProjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
