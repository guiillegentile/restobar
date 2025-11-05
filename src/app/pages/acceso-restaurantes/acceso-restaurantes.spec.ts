import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoRestaurantes } from './acceso-restaurantes';

describe('AccesoRestaurantes', () => {
  let component: AccesoRestaurantes;
  let fixture: ComponentFixture<AccesoRestaurantes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoRestaurantes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoRestaurantes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
