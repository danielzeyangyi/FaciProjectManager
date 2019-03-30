import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ComfirmDialogComponent } from 'src/app/shared/comfirm-dialog/comfirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from 'src/app/animation/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight,
  ]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;

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
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Create new task: '}});
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchEditTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, 
      {data: {title: 'Edit task: ', task: task}});
  }

  launchDelListDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, 
      {data: 
        {title: 'Delete this list: ',
         content: 'Are you sure you want to delete this list?'}});
    
      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
      })
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, 
      {data: 
        {title: 'Edit this list name: '}});
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, 
      {data: 
        {title: 'Create new list: '}});
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


}
