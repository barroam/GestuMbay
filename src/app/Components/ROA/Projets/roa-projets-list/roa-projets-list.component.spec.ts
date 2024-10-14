import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ROAProjetsListComponent } from './roa-projets-list.component';

describe('ROAProjetsListComponent', () => {
  let component: ROAProjetsListComponent;
  let fixture: ComponentFixture<ROAProjetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ROAProjetsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ROAProjetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
