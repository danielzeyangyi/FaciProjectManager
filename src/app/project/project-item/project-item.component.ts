import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() projectEditClicked = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onProjectEditClick() {
    this.projectEditClicked.emit();
  }

  onDelClick() {
    this.projectDeleted.emit();
  }
  
}
