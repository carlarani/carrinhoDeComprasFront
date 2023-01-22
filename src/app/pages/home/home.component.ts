import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role?: string;
  blocoComprador: boolean = false;
  blocoVendedor: boolean = false;
  blocoAdmin: boolean = false;

  constructor() {
    this.role = localStorage.getItem("role") ?? "";
  }

  ngOnInit() {
    console.log(this.role);

    if (this.blocoComprador == false && this.blocoVendedor == false && this.blocoAdmin == false) {
      setTimeout(() => {
        this.role = localStorage.getItem("role") ?? "";
        if (this.role == "comprador") {
          this.blocoComprador = true
        } else if (this.role == "vendedor") {
          this.blocoVendedor = true;
        } else if (this.role == "admin") {
          this.blocoVendedor = true;
          this.blocoComprador = true
          this.blocoAdmin = true;
        }
      }, 2000);
    }
  }
}
