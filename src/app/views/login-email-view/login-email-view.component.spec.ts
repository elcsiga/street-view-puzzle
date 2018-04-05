import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmailViewComponent } from './login-email-view.component';

describe('LoginEmailViewComponent', () => {
  let component: LoginEmailViewComponent;
  let fixture: ComponentFixture<LoginEmailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
