import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngraisComponent } from './engrais.component';

describe('EngraisComponent', () => {
  let component: EngraisComponent;
  let fixture: ComponentFixture<EngraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
