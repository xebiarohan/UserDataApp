import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login button is present and should be enabled',() => {
      component = fixture.componentInstance;
      const loginBtn = fixture.debugElement.query(By.css('.btn'));
      fixture.detectChanges();
      expect(loginBtn).toBeTruthy();
      expect(loginBtn.nativeElement.innerText).toEqual("Log in")
      expect(loginBtn.nativeElement.disabled).toBeFalsy();
  });

  it('should check input field email is present and not disabled', () => {
    const email = fixture.debugElement.query(By.css('.email'));
    expect(email).toBeTruthy();
    expect(email.nativeElement.disabled).toBeFalsy();
  });

  it('should check input field password is present and not disabled', () => {
    const password = fixture.debugElement.query(By.css('.password'));
    expect(password).toBeTruthy();
    expect(password.nativeElement.disabled).toBeFalsy();
  });
});
