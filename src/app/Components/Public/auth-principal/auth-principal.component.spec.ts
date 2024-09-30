import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPrincipalComponent } from './auth-principal.component';

describe('AuthPrincipalComponent', () => {
  let component: AuthPrincipalComponent;
  let fixture: ComponentFixture<AuthPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
