import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';

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

  openNewProjectDialog() {
    const newProjectDialogRef = this.dialog.open(NewProjectComponent, {data: 'this is my date'});
    newProjectDialogRef.afterClosed().subscribe(result => {
      console.log("return message is:", result);
    })
  }

  launchInviteDialog() {
    const projectInvitedialogRef = this.dialog.open(InviteComponent);
  }

}
