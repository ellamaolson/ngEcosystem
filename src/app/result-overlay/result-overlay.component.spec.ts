import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultOverlayComponent } from './result-overlay.component';

describe('ResultOverlayComponent', () => {
  let component: ResultOverlayComponent;
  let fixture: ComponentFixture<ResultOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
