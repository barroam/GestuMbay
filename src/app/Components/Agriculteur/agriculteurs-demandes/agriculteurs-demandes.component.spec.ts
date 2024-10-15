import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteursDemandesComponent } from './agriculteurs-demandes.component';

describe('AgriculteursDemandesComponent', () => {
  let component: AgriculteursDemandesComponent;
  let fixture: ComponentFixture<AgriculteursDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculteursDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculteursDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
