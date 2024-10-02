import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceListComponent } from './admin-ressource-list.component';

describe('AdminRessourceListComponent', () => {
  let component: AdminRessourceListComponent;
  let fixture: ComponentFixture<AdminRessourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
