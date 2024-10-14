import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFournisseurComponent } from './sidebar-fournisseur.component';

describe('SidebarFournisseurComponent', () => {
  let component: SidebarFournisseurComponent;
  let fixture: ComponentFixture<SidebarFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFournisseurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
