import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHeaderComponent implements OnInit {
  
  @Input() header = '';
  @Output() newTaskClicked = new EventEmitter<void>();
  @Output() moveList = new EventEmitter<void>();
  @Output() delList = new EventEmitter<void>();
  @Output() onEditList = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTaskClicked.emit();
  }

  onMoveListClick() {
    this.moveList.emit();
  }

  onDelListClick() {
    this.delList.emit();
  }

  onEditListClick() {
    this.onEditList.emit();
  }

}
