import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRessourceShowComponent } from './admin-ressource-show.component';

describe('AdminRessourceShowComponent', () => {
  let component: AdminRessourceShowComponent;
  let fixture: ComponentFixture<AdminRessourceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRessourceShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRessourceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
