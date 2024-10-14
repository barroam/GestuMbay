import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoaRessourceEngraisComponent } from './roa-ressource-engrais.component';

describe('RoaRessourceEngraisComponent', () => {
  let component: RoaRessourceEngraisComponent;
  let fixture: ComponentFixture<RoaRessourceEngraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoaRessourceEngraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoaRessourceEngraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
