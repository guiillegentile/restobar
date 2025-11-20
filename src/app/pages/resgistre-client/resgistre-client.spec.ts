import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistreClient } from './resgistre-client';

describe('ResgistreClient', () => {
  let component: ResgistreClient;
  let fixture: ComponentFixture<ResgistreClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgistreClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgistreClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
