import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { LOCAL_KEY_LOGIN_INDEX, LOCAL_KEY_LOGIN_TYPE, LOCAL_KEY_REGION, LOGIN_TYPE } from '../constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  msg;
  loginForm;
  logins;

  form = {
    type: localStorage[LOCAL_KEY_LOGIN_INDEX] || '0',
    username: '',
    password: '',
  };

  patterns = {};

  placeholders = {};

  constructor(private router: Router, private auth: AuthService, private title: Title) {}
  ngOnInit() {
    this.logins = environment.logins;
    console.log("le accesskey",environment.accessKey)
    this.patterns[LOGIN_TYPE.cognito] = ['^.*$', '^^.*$'];
    this.patterns[LOGIN_TYPE.accessKey] = [
      '^(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])$',
      '^(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])$',
    ];
    this.placeholders[LOGIN_TYPE.cognito] = ['Username', 'Password'];
    this.placeholders[LOGIN_TYPE.accessKey] = ['Access Key Id', 'Secret Access Key'];
  }

  onSubmitLogin() {
    const { accessKey, secretKey, username, password } = environment;
    const { username: un, password: pw } = this.form;

    if (!(username === un && password === pw)) {
      this.msg = 'Failed authentication...';
      return;
    }

    const login = environment.logins[LOGIN_TYPE.accessKey];
    const bucketNames = environment.bucketNames;
    const S3_PREFIX = "s3/";

    localStorage[LOCAL_KEY_LOGIN_INDEX] = this.form.type;
    localStorage[LOCAL_KEY_LOGIN_TYPE] = login.type;
    localStorage[LOCAL_KEY_REGION] = login.region;

    this.auth.signIn(accessKey, secretKey, login).subscribe(
      result => {
        console.log('login');
        // As there is only one bucket now we redirect directly to this bucket on successful login and we remove sidebar layout component.
        this.router.navigate(['/' + S3_PREFIX + bucketNames[0]]);
      },
      error => {
        console.log(error);
        this.msg = error.message;
      }
    );
  }
}
