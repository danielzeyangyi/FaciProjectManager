import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {

  title: any;
  form: FormGroup;
  coverImages = [];

  constructor(
        @Inject(MAT_DIALOG_DATA) private data,
        private dialogRef: MatDialogRef<NewProjectComponent>,
        private fb: FormBuilder) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;   

    if(this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: [this.data.project.desc, Validators.maxLength(40)],
        coverImg: [this.data.project.coverImg, Validators.required]
      })
      this.title = 'Edit this project: ';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
        desc: ['', Validators.maxLength(40)],
        coverImg: [this.data.img, Validators.required]
      })
      this.title = 'Create a new project: ';
    }
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid){
      return
    }
    this.dialogRef.close(value);
  }
}
