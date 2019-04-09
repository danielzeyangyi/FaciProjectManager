import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';
import { Quote } from 'src/app/domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  quote: Quote = {
    "cn": "我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。",
    "en": "I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.",
    "pic": "/assets/img/quotes/0.jpg"
  };

  constructor(private fb: FormBuilder, private quoteService$: QuoteService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['abc@xxx.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.quoteService$.getQuote().subscribe(q => this.quote = q)
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onValidate() {
    console.log('form error:', this.f.email.errors);
  }

  onloginSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log('loginForm value', value);
    console.log('loginForm valid', valid);
  }
}
