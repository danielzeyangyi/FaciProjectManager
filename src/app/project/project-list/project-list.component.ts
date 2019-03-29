import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ComfirmDialogComponent } from 'src/app/shared/comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      "name": "task manager",
      "desc": "this is task mngt",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "name": "task manager",
      "desc": "this is task mngt",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "name": "task manager",
      "desc": "this is task mngt",
      "coverImg": "assets/img/covers/0.jpg"
    }
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'Create a new project'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log("return message is:", result);
    })
  }

  launchProjectEditDialog(project) {
    const dialogRef = this.dialog.open(NewProjectComponent, 
      {data: {title: 'Edit this project',
              project: project}});
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchDelConfirmDialog() {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, 
      {data: 
        {title: 'Delete this project',
         content: 'Are you sure you want to delete this project?'}});
    
    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
    })
  }
}
