import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestaurant } from './menu-restaurant';

describe('MenuRestaurant', () => {
  let component: MenuRestaurant;
  let fixture: ComponentFixture<MenuRestaurant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRestaurant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRestaurant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
