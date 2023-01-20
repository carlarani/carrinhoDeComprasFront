import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private route: Router, private authService: AuthService){}

  takeHome(){
    this.route.navigate(['/home']);
  }

  deslogar(){
    this.authService.deslogar();
  }

}
