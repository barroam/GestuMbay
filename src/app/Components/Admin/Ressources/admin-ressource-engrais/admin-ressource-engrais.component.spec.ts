import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceEngraisComponent } from './admin-ressource-engrais.component';

describe('AdminRessourceEngraisComponent', () => {
  let component: AdminRessourceEngraisComponent;
  let fixture: ComponentFixture<AdminRessourceEngraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceEngraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceEngraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
