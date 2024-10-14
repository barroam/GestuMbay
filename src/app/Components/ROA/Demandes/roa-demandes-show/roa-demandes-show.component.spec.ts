import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROADemandesShowComponent } from './roa-demandes-show.component';

describe('ROADemandesShowComponent', () => {
  let component: ROADemandesShowComponent;
  let fixture: ComponentFixture<ROADemandesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROADemandesShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROADemandesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
