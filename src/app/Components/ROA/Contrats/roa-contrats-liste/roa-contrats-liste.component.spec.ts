import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAContratsListeComponent } from './roa-contrats-liste.component';

describe('ROAContratsListeComponent', () => {
  let component: ROAContratsListeComponent;
  let fixture: ComponentFixture<ROAContratsListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAContratsListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAContratsListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
