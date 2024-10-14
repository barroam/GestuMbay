import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoaRessourceEquipementComponent } from './roa-ressource-equipement.component';

describe('RoaRessourceEquipementComponent', () => {
  let component: RoaRessourceEquipementComponent;
  let fixture: ComponentFixture<RoaRessourceEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoaRessourceEquipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoaRessourceEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
