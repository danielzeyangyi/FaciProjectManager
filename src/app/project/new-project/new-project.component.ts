import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay'; // for overwriting theme on dialoge

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data,
  private dialogRef: MatDialogRef<NewProjectComponent>,
  private oc: OverlayContainer) { }

  ngOnInit() {
    console.log('data transfered to new project comp is:', JSON.stringify(this.data));
  }

  onClick() {
    this.dialogRef.close('I have received your message');
  }

}
