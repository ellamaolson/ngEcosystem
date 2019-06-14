import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsoleComponent } from './admin-console.component';
import { SubmissionsListComponent } from '../submissions-list/submissions-list.component';

describe('AdminConsoleComponent', () => {
  let component: AdminConsoleComponent;
  let fixture: ComponentFixture<AdminConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminConsoleComponent, SubmissionsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
