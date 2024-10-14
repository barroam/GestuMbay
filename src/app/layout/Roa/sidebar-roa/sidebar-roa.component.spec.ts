import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRoaComponent } from './sidebar-roa.component';

describe('SidebarRoaComponent', () => {
  let component: SidebarRoaComponent;
  let fixture: ComponentFixture<SidebarRoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
