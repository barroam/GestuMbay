import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemencesComponent } from './semences.component';

describe('SemencesComponent', () => {
  let component: SemencesComponent;
  let fixture: ComponentFixture<SemencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
