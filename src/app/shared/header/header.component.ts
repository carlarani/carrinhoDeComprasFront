import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  IsLogin: boolean = false;


  constructor(private route: Router, private authService: AuthService) {

  }

  ngOnInit() {
    setInterval(() => {
      if (window.location.href.includes('login') || window.location.href.includes('cadastro')) {
        console.log(window.location.href);
        return this.IsLogin = true;
      } else {
        return this.IsLogin = false;
      }
    },
      3000)
  }

  ngOnChanges() {
    if (window.location.href.includes('login') || window.location.href.includes('cadastro')) {
      console.log(window.location.href);
      this.IsLogin = true;
    } else {
      this.IsLogin = false;
    }
  }


  takeHome() {
    this.route.navigate(['/home']);
  }

  deslogar() {
    this.authService.deslogar();
  }

}
