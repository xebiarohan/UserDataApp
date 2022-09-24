import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../models/user';
import { UserDto } from '../models/userDto';
import { Users } from '../models/users';

import { UsersComponent } from './users.component';

class MockAuthService extends AppService {

  _getRandomDelay() {
    return 0;
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let appService: MockAuthService;
  let router: Router;
  let timerCallback: any = undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [UsersComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    appService = new MockAuthService();
    fixture = TestBed.createComponent(UsersComponent);
    // component = fixture.componentInstance;
    component = new UsersComponent(appService, router);
    fixture.detectChanges();

  });

  // //// In `my.component.spec.ts`
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [RouterTestingModule, FormsModule],
  //     declarations: [UsersComponent]
  //   })
  //     .compileComponents();
  //   fixture = TestBed.createComponent(UsersComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   await fixture.whenStable();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check add user button is present and is enable', () => {
    fixture.whenStable().then(
      () => {
        const addUserButton = fixture.debugElement.nativeElement.querySelector('#add-user');
        expect(addUserButton.innerHTML).toBe("Add Customer");
      });
  });

  it('should check the users details to be defined', () => {
    fixture.whenStable().then(
      () => {
        expect(component.users).toBeDefined();
      }
    );
  });


});
