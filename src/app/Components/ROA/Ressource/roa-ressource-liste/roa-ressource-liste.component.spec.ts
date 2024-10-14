import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoaRessourceListeComponent } from './roa-ressource-liste.component';

describe('RoaRessourceListeComponent', () => {
  let component: RoaRessourceListeComponent;
  let fixture: ComponentFixture<RoaRessourceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoaRessourceListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoaRessourceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
