import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';

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
          completed: true,
          priority: 3,
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
          completed: false,
          priority: 2,
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
          completed: false,
          priority: 1,
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
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(), 
          reminder: new Date(), 
        },
        {
          id: 2,
          desc: 'Task 2 : task two',
          completed: false,
          priority: 1,
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
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: 'Alice',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(), 
          reminder: new Date(), 
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
          completed: true,
          priority: 1,
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
          completed: true,
          priority: 2,
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
          completed: true,
          priority: 3,
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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent);
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }
}
