import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProfileComponent } from './single-profile.component';

describe('SingleProfileComponent', () => {
  let component: SingleProfileComponent;
  let fixture: ComponentFixture<SingleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
