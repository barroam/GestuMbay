import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculteursProjetsComponent } from './agriculteurs-projets.component';

describe('AgriculteursProjetsComponent', () => {
  let component: AgriculteursProjetsComponent;
  let fixture: ComponentFixture<AgriculteursProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculteursProjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculteursProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
