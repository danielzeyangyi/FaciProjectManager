import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-comfirm-dialog',
  template: `
    <h2 mat-dialog-title>{{title}}</h2>
    <mat-dialog-content>
      {{content}}
    </mat-dialog-content>
    <div mat-dialog-actions>
        <button mat-raised-button color="primary" type="button" (click)="onClick(true)">Confirm</button>
        <button mat-button mat-dialog-close type="button" (click)="onClick(false)">Cancle</button>
    </div>
  `,
  styles: []
})
export class ComfirmDialogComponent implements OnInit {

  title = '';
  content = '';

  constructor(private dialogRef: MatDialogRef<ComfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(result: boolean) {
    this.dialogRef.close(result);
  }

}
