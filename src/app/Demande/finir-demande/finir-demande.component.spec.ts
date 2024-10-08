import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinirDemandeComponent } from './finir-demande.component';

describe('FinirDemandeComponent', () => {
  let component: FinirDemandeComponent;
  let fixture: ComponentFixture<FinirDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinirDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinirDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
