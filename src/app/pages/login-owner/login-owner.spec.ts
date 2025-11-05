import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOwner } from './login-owner';

describe('LoginOwner', () => {
  let component: LoginOwner;
  let fixture: ComponentFixture<LoginOwner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOwner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
