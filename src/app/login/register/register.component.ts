import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // mapping svg icons
    const nums = []
    for(var i = 1; i <= 16; i++){  nums.push(i);}
    this.items = nums.map(el => `avatars:svg-${el}`);
    
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`
    // building form controls
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      avatar: []
    });
  }

  

}
