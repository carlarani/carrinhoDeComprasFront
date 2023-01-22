import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role?: string;
  blocoComprador: boolean = false;
  blocoVendedor: boolean = false;
  blocoAdmin: boolean = false;

  constructor() {
    this.role = localStorage.getItem("role") ?? "";
  }

  ngOnInit() {
    setInterval(() => {
      if (this.role == "comprador") {
        this.blocoComprador = true
      } else if (this.role == "vendedor") {
        this.blocoVendedor == true;
      } else if (this.role == "admin") {
        this.blocoAdmin = true;
        this.blocoVendedor = true;
        this.blocoComprador = true
      }
    }, 3000)
  }
}
