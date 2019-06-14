import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewSubmissionComponent } from './new-submission.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('NewSubmissionComponent', () => {
  let component: NewSubmissionComponent;
  let fixture: ComponentFixture<NewSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NewSubmissionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
