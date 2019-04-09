import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ComfirmDialogComponent } from 'src/app/shared/comfirm-dialog/comfirm-dialog.component';
import { slideToRight } from 'src/app/animation/router.anim';
import { ProjectService } from 'src/app/services/project.service';
import * as _ from 'lodash';
import { listAnimation } from 'src/app/animation/list.amin';
import { map, take, switchMap, reduce, filter } from 'rxjs/operators';
import { Project } from 'src/app/domain';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectListComponent implements OnInit, OnDestroy {
  
  @HostBinding('@routeAnim') state;

  projects: any[] = [];
  sub: Subscription
  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef, private service$: ProjectService) { }

  ngOnInit() {
    this.sub = this.service$.get('1').subscribe(res => {
      this.projects = res;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  launchNewProjectDialog() {
    const selectedImg =`/assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {
        thumbnails: this.getThumbnails(), 
        img:selectedImg
      }});
    
      dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})),
        switchMap(v => this.service$.add(v))
      ).subscribe(project => {
        this.projects = [...this.projects, project];
        this.cd.markForCheck();
      });

  }

  launchProjectUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {
        thumbnails: this.getThumbnails(), 
        project: project
      }});
    
      dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(n => n),
        map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)})),
        switchMap(v => this.service$.update(v))
      ).subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];

        this.cd.markForCheck();
      });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchDelConfirmDialog(project) {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, 
      {data: 
        {title: 'Delete this project',
         content: 'Are you sure you want to delete this project?'}});
    
    // 使用 take(1) 来自动销毁订阅，因为 take(1) 意味着接收到 1 个数据后就完成了
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap(_ => this.service$.del(project))
        )
      .subscribe(val => {
          this.projects = this.projects.filter(p => p.id !== val.id)
          this.cd.markForCheck();
      });

    this.cd.markForCheck();
  }

  private getThumbnails() {
    return _.range(0, 40)
    .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_', 1)[0] + '.jpg' : img;
  }
}
