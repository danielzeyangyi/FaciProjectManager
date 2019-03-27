import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: 'To Do',
      tasks: [
        {
          id: 1,
          desc: 'Task 1 : task one',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 2,
          desc: 'Task 2 : task two',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 3,
          desc: 'Task 3 : task three',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
      ]
    },
    {
      id: 2,
      name: 'On Going',
      tasks: [
        {
          id: 1,
          desc: 'Task 1 : task one',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 2,
          desc: 'Task 2 : task two',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 3,
          desc: 'Task 3 : task three',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
      ]
    },
    {
      id: 3,
      name: 'Finished',
      tasks: [
        {
          id: 1,
          desc: 'Task 1 : task one',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 2,
          desc: 'Task 2 : task two',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
        {
          id: 3,
          desc: 'Task 3 : task three',
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),  
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
