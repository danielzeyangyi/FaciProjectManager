import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  icons: string[];
  constructor() { }

  ngOnInit() {
    const nums = []
    for(var i = 1; i <= 16; i++){
      nums.push(i);
    }

    this.icons = nums.map(el => `avatars:svg-${el}`);
  }

}
