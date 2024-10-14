import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAgriculteurComponent } from './sidebar-agriculteur.component';

describe('SidebarAgriculteurComponent', () => {
  let component: SidebarAgriculteurComponent;
  let fixture: ComponentFixture<SidebarAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAgriculteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
