import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROADemandesComponent } from './roa-demandes.component';

describe('ROADemandesComponent', () => {
  let component: ROADemandesComponent;
  let fixture: ComponentFixture<ROADemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROADemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROADemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
