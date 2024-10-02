import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceAddUpdateComponent } from './admin-ressource-add-update.component';

describe('AdminRessourceAddUpdateComponent', () => {
  let component: AdminRessourceAddUpdateComponent;
  let fixture: ComponentFixture<AdminRessourceAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
