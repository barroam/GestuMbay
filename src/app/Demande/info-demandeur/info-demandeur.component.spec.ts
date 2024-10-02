import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDemandeurComponent } from './info-demandeur.component';

describe('InfoDemandeurComponent', () => {
  let component: InfoDemandeurComponent;
  let fixture: ComponentFixture<InfoDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoDemandeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
