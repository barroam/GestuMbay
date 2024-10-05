import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceEquipementComponent } from './admin-ressource-equipement.component';

describe('AdminRessourceEquipementComponent', () => {
  let component: AdminRessourceEquipementComponent;
  let fixture: ComponentFixture<AdminRessourceEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceEquipementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
