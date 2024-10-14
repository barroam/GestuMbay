import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROADemandesListeComponent } from './roa-demandes-liste.component';

describe('ROADemandesListeComponent', () => {
  let component: ROADemandesListeComponent;
  let fixture: ComponentFixture<ROADemandesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROADemandesListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROADemandesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
