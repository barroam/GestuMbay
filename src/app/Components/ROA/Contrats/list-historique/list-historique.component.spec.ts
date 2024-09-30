import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueComponent } from './list-historique.component';

describe('ListHistoriqueComponent', () => {
  let component: ListHistoriqueComponent;
  let fixture: ComponentFixture<ListHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
