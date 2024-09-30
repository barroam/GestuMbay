import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrupdateComponent } from './add-orupdate.component';

describe('AddOrupdateComponent', () => {
  let component: AddOrupdateComponent;
  let fixture: ComponentFixture<AddOrupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
