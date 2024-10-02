import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipemeentsComponent } from './equipemeents.component';

describe('EquipemeentsComponent', () => {
  let component: EquipemeentsComponent;
  let fixture: ComponentFixture<EquipemeentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipemeentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipemeentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
