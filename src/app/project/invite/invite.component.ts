import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit {

  items = [
    {
      id: 1,
      name: 'Amenda'
    },
    {
      id: 2,
      name: 'Jake'
    },
    {
      id: 3,
      name: 'Charlie'
    },
    {
      id: 4,
      name: 'Daniel'
    },
    {
      id: 5,
      name: 'Aric'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  displayUser(user: {id: string, name: string}){
    return user? user.name : '';
  }

}
