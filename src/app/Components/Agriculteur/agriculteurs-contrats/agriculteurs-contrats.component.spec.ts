import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteursContratsComponent } from './agriculteurs-contrats.component';

describe('AgriculteursContratsComponent', () => {
  let component: AgriculteursContratsComponent;
  let fixture: ComponentFixture<AgriculteursContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculteursContratsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculteursContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
