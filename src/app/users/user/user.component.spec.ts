import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [UserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the firstname label is present', () => {
    const queryValue = fixture.debugElement.query(By.css('#firstname-label'));
    expect(queryValue).toBeTruthy();
    expect(queryValue.nativeElement).toBeTruthy();
    expect(queryValue.nativeElement.outerText).toContain("First Name");
  });

  it('should check if the lastname label is present', () => {
    const queryValue = fixture.debugElement.query(By.css('#lastname-label'));
    expect(queryValue).toBeTruthy();
    expect(queryValue.nativeElement).toBeTruthy();
    expect(queryValue.nativeElement.outerText).toContain("Last Name");
  });

  it('should check if the email label is present', () => {
    const queryValue = fixture.debugElement.query(By.css('#email-label'));
    expect(queryValue).toBeTruthy();
    expect(queryValue.nativeElement).toBeTruthy();
    expect(queryValue.nativeElement.outerText).toContain("E-Mail");
  });

  it('should check if the avatar label is present', () => {
    const queryValue = fixture.debugElement.query(By.css('#avatar-label'));
    expect(queryValue).toBeTruthy();
    expect(queryValue.nativeElement).toBeTruthy();
    expect(queryValue.nativeElement.outerText).toContain("Avatar");
  });

  it('should check back button is present and is enable', () => {
    const backButton = fixture.debugElement.nativeElement.querySelector('#back');
    expect((backButton.innerHTML).trim()).toBe("Back");
  });

  it('should check Submit button is present and is enable', () => {
    const submitButton =  fixture.debugElement.query(By.css('#submit'));
    expect((submitButton.nativeElement.innerHTML).trim()).toBe("Submit");
  });


  it('should check first name field is not empty', () => {
    const firstName =  fixture.debugElement.query(By.css('#firstName'));
    expect(firstName).toBeTruthy();
    expect(firstName.nativeElement.disabled).toBeFalsy();
    expect(firstName.nativeElement.innerHTML).toBeDefined();

  });

  it('should check avatar field is not empty', () => {
    const avatar =  fixture.debugElement.query(By.css('#avatar'));
    expect(avatar).toBeTruthy();
    expect(avatar.nativeElement.disabled).toBeFalsy();
    expect(avatar.nativeElement.innerHTML).toBeDefined();
  });
  

});
