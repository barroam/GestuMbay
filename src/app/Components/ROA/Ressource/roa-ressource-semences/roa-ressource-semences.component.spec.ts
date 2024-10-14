import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoaRessourceSemencesComponent } from './roa-ressource-semences.component';

describe('RoaRessourceSemencesComponent', () => {
  let component: RoaRessourceSemencesComponent;
  let fixture: ComponentFixture<RoaRessourceSemencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoaRessourceSemencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoaRessourceSemencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
