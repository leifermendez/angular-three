import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenaComponent } from './scena.component';

describe('ScenaComponent', () => {
  let component: ScenaComponent;
  let fixture: ComponentFixture<ScenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
