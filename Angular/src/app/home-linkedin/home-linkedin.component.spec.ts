import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLinkedinComponent } from './home-linkedin.component';

describe('HomeLinkedinComponent', () => {
  let component: HomeLinkedinComponent;
  let fixture: ComponentFixture<HomeLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLinkedinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
