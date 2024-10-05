import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceSemencesComponent } from './admin-ressource-semences.component';

describe('AdminRessourceSemencesComponent', () => {
  let component: AdminRessourceSemencesComponent;
  let fixture: ComponentFixture<AdminRessourceSemencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceSemencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceSemencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
