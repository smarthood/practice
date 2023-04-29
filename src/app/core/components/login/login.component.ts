import { Dialog } from '@angular/cdk/dialog';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../service/dialog.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router
  ) {}
  Login_detail!: FormGroup;

  ngOnInit(): void {
    this.Login_detail = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  Onsubmit() {
    this.authService
      .postData('login', this.Login_detail.value)
      .subscribe((res: any) => {
        console.log(res);
        if (res && res['user'] && res['token']) {
          // this.user.next(res['user']);
          sessionStorage.setItem(
            'currentUserToken',
            JSON.stringify({
              token: res['token'],
              refreshToken: res['refreshToken'],
            })
          );
          this.router.navigate(['/table']);
        }
      });
  }
}
